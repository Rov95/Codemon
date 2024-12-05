import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { socketService } from "../../../services/socketService";
import { HeroStats } from "../../../classes/heroStats";

interface WaitingRoomProps {}

const WaitingRoom: React.FC<WaitingRoomProps> = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { hero }: { hero: HeroStats } = location.state || {};

    const [roomName, setRoomName] = useState("");
    const [statusMessage, setStatusMessage] = useState("Waiting for an opponent...");

    useEffect(() => {
        if (!hero) {
            console.error("No hero selected for the waiting room.");
            navigate("/battle-arena");
            return;
        }

        socketService.connect("https://bd76-181-32-12-10.ngrok-free.app");

        socketService.on("match_ready", ({ room }) => {
            setStatusMessage("Match found! Redirecting...");
            setTimeout(() => navigate("/online-battle", { state: { room, hero } }), 1500);
        });

        socketService.on("player_disconnected", () => {
            setStatusMessage("Opponent disconnected. Waiting for a new player...");
        });

        return () => {
            socketService.disconnect();
        };
    }, [hero, navigate]);

    const handleJoinRoom = () => {
        const payload = roomName ? { room: roomName } : {};
        socketService.emit("join_match", payload);
        setStatusMessage(
            roomName
                ? `Joined room: ${roomName}. Waiting for an opponent...`
                : "Joined matchmaking queue. Waiting for an opponent..."
        );
    };

    return (
        <div className="waiting-room-container">
            <h1>Waiting Room</h1>
            <p>{statusMessage}</p>
            <div className="room-input-container">
                <input
                    type="text"
                    placeholder="Enter room name (optional)"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    className="room-input"
                />
                <button onClick={handleJoinRoom} className="join-btn">Join Room</button>
            </div>
            <button onClick={() => navigate("/battle-arena")} className="return-btn">
                Back to Arena
            </button>
        </div>
    );
};

export default WaitingRoom;
