import { io } from 'socket.io-client';

const SOCKET_URL = 'https://vanijya.onrender.com'; // change if different
export const socket = io(SOCKET_URL, { autoConnect: false });
