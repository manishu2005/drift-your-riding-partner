import React, { useState, useEffect, useRef } from "react";
import Transitionwrapper from "../components/Transitionwrapper";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { socket, ensureSocketAuth } from "../socket";

// Fix default marker icons for leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const ACCEPT_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes to accept (matches server expiry)
const LOCATION_SEND_THROTTLE_MS = 2000; // send location at most every 2s

export default function CaptainDashboard() {
  const captain = JSON.parse(localStorage.getItem("user") || "{}");
  const name = captain.fullname ? captain.fullname.firstname : captain.email?.split("@")[0];

  const [connected, setConnected] = useState(false);
  const [rides, setRides] = useState([]); // incoming ride requests
  const [assignedRide, setAssignedRide] = useState(null); // ride accepted by this captain
  const [route, setRoute] = useState([]);
  const [userLocation, setUserLocation] = useState({ lat: 28.6139, lng: 77.209 });
  const lastLocationSentRef = useRef(0);
  const geoWatchIdRef = useRef(null);

  // Ensure socket has auth token and is connected
  useEffect(() => {
    try {
      ensureSocketAuth();
    } catch (e) {
      console.error("ensureSocketAuth failed", e);
    }
  }, []);

  // Setup geolocation watch
  useEffect(() => {
    if (!navigator.geolocation) return;

    const id = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ lat: latitude, lng: longitude });

        // if assigned to a ride, throttle and send updates
        if (assignedRide) {
          const now = Date.now();
          if (now - lastLocationSentRef.current > LOCATION_SEND_THROTTLE_MS) {
            lastLocationSentRef.current = now;
            try {
              socket.emit("captain_location", {
                rideId: assignedRide._id,
                lat: latitude,
                lon: longitude,
              });
            } catch (err) {
              console.error("Error emitting captain_location", err);
            }
          }
        }
      },
      (err) => console.warn("Geolocation denied/failed", err),
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );

    geoWatchIdRef.current = id;
    return () => {
      if (geoWatchIdRef.current !== null) navigator.geolocation.clearWatch(geoWatchIdRef.current);
    };
  }, [assignedRide]);

  // Socket listeners
  useEffect(() => {
    if (!socket) return;

    const onConnect = () => {
      console.log("Captain socket connected", socket.id);
      setConnected(true);
    };
    const onDisconnect = () => {
      console.log("Captain socket disconnected");
      setConnected(false);
    };

    const onRideRequest = (ride) => {
      // Insert into rides list if not present and not already accepted/expired
      if (!ride || !ride._id) return;
      setRides((prev) => {
        if (prev.some((r) => r._id === ride._id)) return prev;
        // ignore if this captain is already assigned
        if (ride.assignedCaptainId && ride.assignedCaptainId.toString() !== captain.id) return prev;
        return [...prev, ride];
      });
    };

    const onRideTaken = ({ rideId }) => {
      setRides((prev) => prev.filter((r) => r._id !== rideId));
    };

    const onRideRemoved = ({ rideId }) => {
      setRides((prev) => prev.filter((r) => r._id !== rideId));
      if (assignedRide && assignedRide._id === rideId) {
        // assigned ride was removed externally
        setAssignedRide(null);
        setRoute([]);
        alert("Assigned ride was removed on server");
      }
    };

    const onRideExpired = ({ rideId }) => {
      setRides((prev) => prev.filter((r) => r._id !== rideId));
      if (assignedRide && assignedRide._id === rideId) {
        setAssignedRide(null);
        setRoute([]);
        alert("Assigned ride expired");
      }
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("ride_request", onRideRequest);
    socket.on("ride_taken", onRideTaken);
    socket.on("ride_removed", onRideRemoved);
    socket.on("ride_expired", onRideExpired);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("ride_request", onRideRequest);
      socket.off("ride_taken", onRideTaken);
      socket.off("ride_removed", onRideRemoved);
      socket.off("ride_expired", onRideExpired);
    };
  }, [assignedRide]);

  // Accept a ride
  const acceptRide = (rideId) => {
    if (!rideId) return;
    socket.emit("accept_ride", { rideId }, (res) => {
      if (res?.success) {
        const ride = res.ride;
        setAssignedRide(ride);
        setRides((prev) => prev.filter((r) => r._id !== ride._id));
        // fetch route to display
        fetchRouteForRide(ride);
      } else {
        alert(res?.error || "Failed to accept ride");
      }
    });
  };

  // Reject a ride (remove for everyone by default)
  const rejectRide = (rideId, userId) => {
    if (!rideId || !userId) return;
    socket.emit("reject_ride", { rideId, userId, removeAll: true }, (res) => {
      if (!res?.success) console.warn("reject_ride ack failed", res);
    });
    setRides((prev) => prev.filter((r) => r._id !== rideId));
  };

  // fetch OSRM route for pickup->destination and show on map
  const fetchRouteForRide = async (ride) => {
    try {
      if (!ride || !ride.pickup || !ride.destination) return;
      const p = ride.pickup;
      const d = ride.destination;
      const plat = p.lat ?? p.latitude ?? p[0];
      const plng = p.lng ?? p.lon ?? p.longitude ?? p[1];
      const dlat = d.lat ?? d.latitude ?? d[0];
      const dlng = d.lng ?? d.lon ?? d.longitude ?? d[1];
      if (!plat || !plng || !dlat || !dlng) return;
      const url = `https://router.project-osrm.org/route/v1/driving/${plng},${plat};${dlng},${dlat}?overview=full&geometries=geojson`;
      const res = await axios.get(url);
      const coords = res.data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
      setRoute(coords);
    } catch (err) {
      console.error("fetchRouteForRide error", err);
    }
  };

  // compute remaining time for a ride request (ms left)
  const getTimeLeft = (ride) => {
    if (!ride?.createdAt) return 0;
    const created = new Date(ride.createdAt).getTime();
    const now = Date.now();
    const left = ACCEPT_TIMEOUT_MS - (now - created);
    return Math.max(0, left);
  };

  return (
    <Transitionwrapper>
      <div className="min-h-screen bg-gradient-to-b from-black via-[#040b11] to-[#001219] text-white p-6 space-y-6">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-cyan-400">Welcome, Captain {name || "Driver"} 🚗</h1>
          <div>{connected ? <span className="text-green-400">Online</span> : <span className="text-red-400">Offline</span>}</div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 bg-[#0a1a23] p-4 rounded-xl shadow">
            <h2 className="text-lg font-bold text-cyan-300 mb-2">Incoming Requests</h2>
            {rides.length === 0 && <p className="text-gray-400">No active ride requests</p>}
            <div className="space-y-3">
              {rides.map((r) => (
                <div key={r._id} className="p-3 bg-[#021016] border border-cyan-800 rounded">
                  <p className="text-sm text-gray-300">Pickup: {r.pickup?.address || "Unknown"}</p>
                  <p className="text-sm text-gray-300">Dest: {r.destination?.address || "Unknown"}</p>
                  <p className="text-xs text-gray-500">Requested: {new Date(r.createdAt).toLocaleString()}</p>
                  <p className="text-xs text-yellow-300">Time left: {Math.ceil(getTimeLeft(r) / 1000)}s</p>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => acceptRide(r._id)} className="bg-green-500 px-3 py-1 rounded text-black">Accept</button>
                    <button onClick={() => rejectRide(r._id, r.userId)} className="bg-red-500 px-3 py-1 rounded text-black">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 bg-[#0a1a23] p-4 rounded-xl shadow">
            <h2 className="text-lg font-bold text-cyan-300 mb-2">Map & Assigned Ride</h2>
            {!assignedRide ? (
              <p className="text-gray-400">No assigned ride. Accept from the list to start.</p>
            ) : (
              <div className="space-y-2">
                <div className="p-2 bg-[#021016] rounded">
                  <p className="text-sm">Assigned to: {assignedRide.userName || assignedRide.userId}</p>
                  <p className="text-sm">Pickup: {assignedRide.pickup?.address}</p>
                  <p className="text-sm">Destination: {assignedRide.destination?.address}</p>
                </div>
              </div>
            )}

            <div className="mt-4 rounded-2xl overflow-hidden" style={{ height: 420 }}>
              <MapContainer center={[userLocation.lat, userLocation.lng]} zoom={13} style={{ height: "100%", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />
                <Marker position={[userLocation.lat, userLocation.lng]} />
                {assignedRide?.pickup && (
                  <Marker position={[assignedRide.pickup.lat ?? assignedRide.pickup[0], assignedRide.pickup.lng ?? assignedRide.pickup[1]]} />
                )}
                {assignedRide?.destination && (
                  <Marker position={[assignedRide.destination.lat ?? assignedRide.destination[0], assignedRide.destination.lng ?? assignedRide.destination[1]]} />
                )}
                {route.length > 0 && <Polyline positions={route} color="lime" />}
              </MapContainer>
            </div>
          </div>
        </section>
      </div>
    </Transitionwrapper>
  );
}
