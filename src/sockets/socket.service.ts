import { io, Socket } from 'socket.io-client';

export let socket: Socket;

const VITE_BASE_ENDPOINT = "http://localhost:4000";
class SocketService {
  setupSocketConnection() {
    socket = io(VITE_BASE_ENDPOINT, {
      // we chose to use websocket for this project, if websocket is not available, socket io will choose to use polling
      transports: ['websocket'],
      secure: true
    });
    this.socketConnectionEvents();
  }

  // connection to api gateway service
  // successful connection
  socketConnectionEvents() {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    // failed connection / try to connect again
      socket.on('disconnect', (reason: Socket.DisconnectReason) => {
      console.log(`Reason: ${reason}`);
      socket.connect();
    });

    // error connection / try to connect again
    socket.on('connect_error', (error: Error) => {
      console.log(`${error}`);
      socket.connect();
    });
  }
}

export const socketService = new SocketService();
