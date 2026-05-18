import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

export const initSocketServer = (server: http.Server) => {
    const io = new SocketIOServer(server);

    io.on("connection", (socket) => {
        console.log("A user connected");

        //Listen for notif event
        socket.on("notification", (data) => {
            //broadcast the notif data to all client in admin dashboard

            io.emit("newNotification", data);
        });

        socket.on("disconnect", () => {
            console.log("A user disconnected");
        })
    });
}