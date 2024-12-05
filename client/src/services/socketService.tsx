import { io, Socket } from "socket.io-client";
import { HeroStats } from "../classes/heroStats";


class SocketService {
    private socket: Socket | null = null;

    connect(url: string) {
        this.socket = io(url, { withCredentials: true, extraHeaders: {
            'ngrok-skip-browser-warning': 'true', // Add this custom header
            } 
        });
    }

    on(event: string, callback: (data: any) => void) {
        if (!this.socket) throw new Error("Socket is not connected");
        this.socket.on(event, callback);
    }

    emit(event: string, data?: any) {
        if (!this.socket) throw new Error("Socket is not connected");
        this.socket.emit(event, data);
    }

    sendHeroInfo(room: string, hero: HeroStats) {
        this.emit('send_hero_info', { room, hero });
    }
    
    onReceiveHeroInfo(callback: (hero: HeroStats) => void) {
        this.on('receive_hero_info', ({ hero }) => callback(hero));
    }

    sendGameAction(room: string, action: any) {
        this.emit('game_action', { room, action });
    }

    onGameUpdate(callback: (data: any) => void) {
        this.on('update_game', callback);
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }
}

export const socketService = new SocketService();
