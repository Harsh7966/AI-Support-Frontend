import { io, Socket } from "socket.io-client";

/*
  Poore app me ek hi socket connection use hota hai.
  getSocket() jahan bhi call karo, wahi connection milega (naya nahi banega).
  Token localStorage se jata hai -> backend ka io.use() usse verify karta hai.
*/
let socket: Socket | null = null;

export const getSocket = (): Socket => {
    const token = localStorage.getItem("token");

    // Token badal gaya (naya login) to purana connection band karke naya banao
    if (socket && (socket.auth as { token?: string })?.token !== token) {
        socket.disconnect();
        socket = null;
    }

    if (!socket) {
        socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
            auth: { token },
        });
    }
    return socket;
};
