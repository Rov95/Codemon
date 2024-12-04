import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socketService } from "../../../services/socketService";
import { HeroStats } from "../../../classes/heroStats";

interface WaitingRoomProps {
    hero: HeroStats;
}

const WaitingRoom: React.FC<WaitingRoomProps> = ({ hero }) => {
    const navigate = useNavigate();
    const [roomName, setRoomName] = useState("");
    const [statusMessage, setStatusMessage] = useState("Waiting for an opponent...");

    useEffect(() => {
        socketService.connect("http://localhost:3000");

        socketService.on("match_ready", ({ room }) => {
            setStatusMessage("Match found! Redirecting...");
            navigate("/online-battle", { state: { room, hero } });
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

    const handleReturn = () => {
        socketService.disconnect();
        navigate("/battle-arena");
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
            <button onClick={handleReturn} className="return-btn">Back to Arena</button>
        </div>
    );
};

export default WaitingRoom;
