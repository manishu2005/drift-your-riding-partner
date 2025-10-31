import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

export const socket = io(SOCKET_URL, {
    // do not auto connect until we set auth (prevents unauthenticated connects)
    autoConnect: false,
    // initial auth token (may be null if not yet logged-in)
    auth: {
        token: localStorage.getItem("token"),
    },
    withCredentials: true,
    transports: ["websocket"],
});

socket.on("connect", () => {
    console.log("Socket connected", socket.id);
});

socket.on("disconnect", () => {
    console.log("Socket disconnected");
});

socket.on("connect_error", (err) => {
    console.error("Socket connect_error:", err?.message || err);
});

// Helper to ensure the socket has the latest token and is connected.
export function ensureSocketAuth() {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
        socket.auth = { token };
        if (!socket.connected) socket.connect();
    } catch (e) {
        console.error("ensureSocketAuth error:", e);
    }
}