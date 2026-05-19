'use client'

import { useState, useEffect } from "react"
import { ThemeProvider } from "./utils/Theme-Provider"
import { Toaster } from "react-hot-toast"
import { Providers } from "./Provider"
import { SessionProvider } from "next-auth/react"
import { useLoadUserQuery } from "../redux/features/api/apiSlice"
import Loader from "./components/Loader/Loader"
import socketIO from "socket.io-client"

// const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI;
// const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI;

        if (!ENDPOINT) return;

        const socket = socketIO(ENDPOINT, {
            transports: ["websocket"],
        });

        socket.on("connect", () => {
            // console.log("Connected:", socket.id);
        });

        socket.on("disconnect", (reason) => {
            // console.log("Disconnected:", reason);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <Providers>
            <SessionProvider>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <Custom>
                        <AppInitializer />
                        {children}
                    </Custom>
                    <Toaster position="top-center" reverseOrder={false} />
                </ThemeProvider>
            </SessionProvider>
        </Providers>
    )
}


import { useSession } from "next-auth/react";
import AppInitializer from "./components/Auth/AppInitializer";

const Custom = ({ children }: { children: React.ReactNode }) => {
    const { status } = useSession(); // 'loading', 'authenticated', 'unauthenticated'

    const hasToken =
        typeof window !== "undefined"
            ? localStorage.getItem("token")
            : null;

    const { isLoading } = useLoadUserQuery(
        {},
        {
            skip: !hasToken,
            refetchOnMountOrArgChange: true,
        }
    );

    // Wait until NextAuth has determined the session status
    if (status === "loading" || isLoading) {
        return <Loader />;
    }

    return <>{children}</>;
};