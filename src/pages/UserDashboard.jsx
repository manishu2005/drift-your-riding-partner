import React, { useState, useEffect } from "react";
import Transitionwrapper from "../components/Transitionwrapper";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { socket, ensureSocketAuth } from "../socket";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const name = user.fullname ? user.fullname.firstname : user.email?.split("@")[0];

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destSuggestions, setDestSuggestions] = useState([]);
  const [userLocation, setUserLocation] = useState({ lat: 28.6139, lng: 77.2090 });
  const [route, setRoute] = useState([]);
  const [distance, setDistance] = useState("");
  const [eta, setEta] = useState("");
  const [price, setPrice] = useState("");
  const [startCoords, setStartCoords] = useState([28.6139, 77.2090]);
  const [endCoords, setEndCoords] = useState(null);
  const [ride, setRide] = useState(null);
  const [rideStatus, setRideStatus] = useState("");
  const [assignedCaptain, setAssignedCaptain] = useState(null);
  const [captainLocation, setCaptainLocation] = useState(null); // [lat, lng]
  const [assignedRideId, setAssignedRideId] = useState(null);
  const [isFetchingRoute, setIsFetchingRoute] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setStartCoords([latitude, longitude]);
        },
        (err) => console.log("Location access denied:", err)
      );

    // ensure socket has auth token and is connected (in case token was set after page load)
    }
  }, []);

  useEffect(() => {
  try {
    ensureSocketAuth();
  } catch (e) {
    console.error("Socket auth failed:", e);
  }
}, []);

  //  Debounced search for pickup/destination
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (pickup.length > 2) fetchSuggestions(pickup, "pickup");
      else setPickupSuggestions([]);
    }, 500);
    return () => clearTimeout(timeout);
  }, [pickup]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (destination.length > 2) fetchSuggestions(destination, "dest");
      else setDestSuggestions([]);
    }, 300);
    return () => clearTimeout(timeout);
  }, [destination]);

  // Listen for ride acceptance/rejection and captain location updates
  useEffect(() => {
    if (!socket) return;

    const onRideAccepted = (payload) => {
      const { ride: acceptedRide, captain } = payload || {};
      if (!acceptedRide) return;
      setRide(acceptedRide);
      setRideStatus("accepted");
      setAssignedRideId(acceptedRide._id);
      setAssignedCaptain(captain || null);
      alert(`Your ride was accepted by ${captain?.name || 'a captain'}`);
      // fetch and show route pickup->destination for the user
      fetchRouteFromRide(acceptedRide).catch((e) => console.error('Route fetch error', e));
    };

    const onRideRejected = (payload) => {
      const { rideId, captainId } = payload || {};
      if (ride && ride._id === rideId) {
        setRideStatus("rejected");
        alert("The captain rejected your ride. Please try again.");
        setRide(null);
        setAssignedRideId(null);
      }
    };

    const onCaptainLocation = (payload) => {
      const { rideId, lat, lon } = payload || {};
      if (!rideId || rideId !== assignedRideId) return;
      setCaptainLocation([lat, lon]);
    };

    socket.on("ride_accepted", onRideAccepted);
    socket.on("ride_rejected", onRideRejected);
    socket.on("captain_location", onCaptainLocation);

    socket.on("ride_removed", (payload) => {
      const { rideId } = payload || {};
      if (ride && ride._id === rideId) {
        alert('Your ride request was removed');
        setRide(null);
        setRideStatus('removed');
        setAssignedRideId(null);
        setAssignedCaptain(null);
        setRoute([]);
        setCaptainLocation(null);
      }
    });

    socket.on("ride_expired", (payload) => {
      const { rideId } = payload || {};
      if (ride && ride._id === rideId) {
        alert('Your ride request expired (no captain responded)');
        setRide(null);
        setRideStatus('expired');
        setAssignedRideId(null);
        setAssignedCaptain(null);
        setRoute([]);
        setCaptainLocation(null);
      }
    });

    return () => {
      socket.off("ride_accepted", onRideAccepted);
      socket.off("ride_rejected", onRideRejected);
      socket.off("captain_location", onCaptainLocation);
    };
  }, [socket, ride, assignedRideId]);

  //  Fetch nearby suggestions (within ~10km radius)
  const fetchSuggestions = async (query, type) => {
    try {
      const { lat, lng } = userLocation;
      const radiusDeg = 0.1; // ~10km
      const viewbox = `${lng - radiusDeg},${lat + radiusDeg},${lng + radiusDeg},${lat - radiusDeg}`;

      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&bounded=1&limit=5&viewbox=${viewbox}`
      );

      const data = res.data.map((s) => ({
        name: s.display_name,
        lat: parseFloat(s.lat),
        lon: parseFloat(s.lon),
      }));

      if (type === "pickup") setPickupSuggestions(data);
      else setDestSuggestions(data);
    } catch (err) {
      console.log("Suggestion error:", err);
    }
  };

  // helper: fetch route between pickup and destination for a ride object
  const fetchRouteFromRide = async (ride) => {
    try {
      if (!ride?.pickup || !ride?.destination) return;
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
      // also set pickup/destination markers
      setStartCoords([plat, plng]);
      setEndCoords([dlat, dlng]);
      // set distance/eta if available
      const dist = res.data.routes[0].distance / 1000;
      const time = res.data.routes[0].duration / 60;
      setDistance(`${dist.toFixed(2)} km`);
      setEta(`${Math.round(time)} min`);
      setPrice(`₹${(30 + dist * 12).toFixed(2)}`);
    } catch (err) {
      console.error('fetchRouteFromRide error', err);
    }
  };

  //  When suggestion clicked
  const handleSelect = (place, type) => {
    if (type === "pickup") {
      setPickup(place.name);
      setPickupSuggestions([]);
      setStartCoords([place.lat, place.lon]);
    } else {
      setDestination(place.name);
      setDestSuggestions([]);
      setEndCoords([place.lat, place.lon]);
    }
  };

  const getRoute = async () => {
    if (!pickup || !destination) {
      alert("Please enter both pickup and destination!");
      return;
    }

    setIsFetchingRoute(true);
    try {
      const geocode = async (address) => {
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
            address
          )}`
        );
        if (!res.data.length) throw new Error("Address not found");
        return [parseFloat(res.data[0].lat), parseFloat(res.data[0].lon)];
      };

      const start = await geocode(pickup);
      const end = await geocode(destination);

      setStartCoords(start);
      setEndCoords(end);

      const routeRes = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`
      );

      const coords = routeRes.data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
      setRoute(coords);

      const dist = routeRes.data.routes[0].distance / 1000;
      const time = routeRes.data.routes[0].duration / 60;
      setDistance(`${dist.toFixed(2)} km`);
      setEta(`${Math.round(time)} min`);
      setPrice(`₹${(30 + dist * 12).toFixed(2)}`);
    } catch (err) {
      console.error("Route error:", err);
      alert("Could not calculate route. Please check addresses or try again.");
    } finally {
      setIsFetchingRoute(false);
    }
  };
const requestRide = async () => {
  // Basic validations
  if (!pickup || !destination) {
    alert("Please enter both pickup and destination!");
    return;
  }

  if (!startCoords || !endCoords) {
    console.log(" Missing coordinates:", { startCoords, endCoords });
    alert("Please click 'Show Routes & Estimates' first to get route details!");
    return;
  }

  const numericFare = parseFloat(price.replace("₹", "").trim());
  if (!numericFare || isNaN(numericFare)) {
    alert("Please calculate fare before requesting ride!");
    return;
  }

  const payload = {
    pickup: {
      address: pickup,
      lat: startCoords?.[0],
      lng: startCoords?.[1],
    },
    destination: {
      address: destination,
      lat: endCoords?.[0],
      lng: endCoords?.[1],
    },
    fare: numericFare,
  };

  console.log(" Sending payload:", payload, "socket connected:", !!socket?.connected);

  // Prefer socket path if available
  if (socket && socket.connected) {
    let ackCalled = false;
    try {
      socket.emit("create_ride", payload, (res) => {
        ackCalled = true;
        console.log(" Server response (socket):", res);
        if (res?.success) {
          setRide(res.ride);
          alert("Ride request sent successfully!");
          setRideStatus("Waiting for captain...");
          setAssignedRideId(res.ride._id);
        } else {
          alert(res?.error || "Failed to create ride via socket");
        }
      });

      // fallback if ack not called in reasonable time
      setTimeout(async () => {
        if (!ackCalled) {
          console.warn("Socket ack not received, falling back to HTTP POST");
          await fallbackHttpCreateRide(payload);
        }
      }, 3000);
    } catch (err) {
      console.error("Socket create_ride error, falling back to HTTP:", err);
      await fallbackHttpCreateRide(payload);
    }
  } else {
    // fallback to HTTP POST
    await fallbackHttpCreateRide(payload);
  }
};

  // Fallback HTTP POST if socket path fails
  const fallbackHttpCreateRide = async (payload) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/user/rides`, payload, { withCredentials: true });
      console.log("HTTP ride create response:", res.data);
      if (res.data?.success || res.data?.ride) {
        const rideObj = res.data.ride || res.data;
        setRide(rideObj);
        setRideStatus("Waiting for captain...");
        setAssignedRideId(rideObj._id);
        alert(" Ride request sent successfully");
      } else {
        alert(res.data?.message || "Failed to create ride via HTTP fallback");
      }
    } catch (err) {
      console.error("HTTP fallback create ride error:", err);
      alert("Could not create ride. Please try again later.");
    }
  };


  return (
    <Transitionwrapper>
      <div className="min-h-screen bg-gradient-to-b from-black via-[#040b11] to-[#001219] text-white p-6 space-y-6">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-cyan-400">
            Welcome, {name || "User"}!
          </h1>
        </header>

        <section className="bg-[#0a1a23] p-6 rounded-2xl shadow-lg space-y-4">
          <h2 className="text-xl font-bold text-cyan-300">Book Your Drift</h2>

          {/* Pickup Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Pickup location"
              className="w-full bg-[#0a1a23] border border-cyan-700 rounded-xl p-3 focus:ring-2 focus:ring-cyan-400 outline-none"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
            {pickupSuggestions.length > 0 && (
              <ul className="absolute bg-[#001219] border border-cyan-800 rounded-lg mt-1 w-full z-10 max-h-48 overflow-auto">
                {pickupSuggestions.map((s, i) => (
                  <li
                    key={i}
                    className="p-2 hover:bg-cyan-800 cursor-pointer text-sm"
                    onClick={() => handleSelect(s, "pickup")}
                  >
                    {s.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Destination Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Destination"
              className="w-full bg-[#0a1a23] border border-cyan-700 rounded-xl p-3 focus:ring-2 focus:ring-cyan-400 outline-none"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            {destSuggestions.length > 0 && (
              <ul className="absolute bg-[#001219] border border-cyan-800 rounded-lg mt-1 w-full z-10 max-h-48 overflow-auto">
                {destSuggestions.map((s, i) => (
                  <li
                    key={i}
                    className="p-2 hover:bg-cyan-800 cursor-pointer text-sm"
                    onClick={() => handleSelect(s, "dest")}
                  >
                    {s.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={getRoute}
              className="bg-cyan-500 text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all"
            >
              Show Routes & Estimates
            </button>

            <button
              onClick={requestRide}
              className="bg-[#FF6B00] text-black px-6 py-3 rounded-xl font-bold hover:bg-[#ff7a1a] hover:scale-105 transition-all"
            >
              Request Ride
            </button>
          </div>

          {distance && (
            <div className="mt-4 text-gray-300 space-y-1">
              <p>🛣 Distance: {distance}</p>
              <p>⏱ ETA: {eta}</p>
              <p>💰 Estimated Price: {price}</p>
            </div>
          )}
        </section>

        <section className="rounded-2xl overflow-hidden shadow-lg">
          <MapContainer
            center={startCoords}
            zoom={12}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />
            {startCoords && <Marker position={startCoords} />}
            {endCoords && <Marker position={endCoords} />}
            {captainLocation && (
              <Marker position={captainLocation}>
              </Marker>
            )}
            {route.length > 0 && <Polyline positions={route} color="cyan" />}
          </MapContainer>
        </section>
      </div>
    </Transitionwrapper>
  );
};

export default UserDashboard;
