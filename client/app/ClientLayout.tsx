'use client'

import { useState, useEffect } from "react"
import { ThemeProvider } from "./utils/Theme-Provider"
import { Toaster } from "react-hot-toast"
import { Providers } from "./Provider"
import { SessionProvider } from "next-auth/react"
import { useLoadUserQuery } from "../redux/features/api/apiSlice"
import Loader from "./components/Loader/Loader"
import socketIO from "socket.io-client"

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI;
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // 1. Listen for successful connection
        socketId.on("connect", () => {
            console.log("Connected to server:", socketId.id);
        });

        // 2. Listen for disconnection
        socketId.on("disconnect", (reason) => {
            console.log("Disconnected from server. Reason:", reason);
        });

        // 3. CLEANUP: Remove listeners when component unmounts
        return () => {
            socketId.off("connect");
            socketId.off("disconnect");
        };
    }, [socketId]); // Include socketId in dependency array if it's passed as a prop/state

    return (
        <Providers>
            <SessionProvider>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <Custom>
                        {children}
                    </Custom>
                    <Toaster position="top-center" reverseOrder={false} />
                </ThemeProvider>
            </SessionProvider>
        </Providers>
    )
}


import { useSession } from "next-auth/react";

const Custom = ({ children }: { children: React.ReactNode }) => {
    const { status } = useSession(); // 'loading', 'authenticated', 'unauthenticated'
    const { isLoading } = useLoadUserQuery({}, { refetchOnMountOrArgChange: true });

    // Wait until NextAuth has determined the session status
    if (status === "loading" || isLoading) {
        return <Loader />;
    }

    return <>{children}</>;
};