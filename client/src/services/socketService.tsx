import { io, Socket } from "socket.io-client";


class SocketService {
    private socket: Socket | null = null;

    connect(url: string) {
        this.socket = io(url, { withCredentials: true });
    }

    on(event: string, callback: (data: any) => void) {
        if (!this.socket) throw new Error("Socket is not connected");
        this.socket.on(event, callback);
    }

    emit(event: string, data?: any) {
        if (!this.socket) throw new Error("Socket is not connected");
        this.socket.emit(event, data);
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }
}

export const socketService = new SocketService();
