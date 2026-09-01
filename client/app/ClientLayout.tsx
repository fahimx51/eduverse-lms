'use client'

import { useState, useEffect } from "react"
import { ThemeProvider } from "./utils/Theme-Provider"
import { Toaster } from "react-hot-toast"
import { Providers } from "./Provider"
import { SessionProvider, useSession } from "next-auth/react"
import { useLoadUserQuery } from "../redux/features/api/apiSlice"
import Loader from "./components/Loader/Loader"
import AppInitializer from "./components/Auth/AppInitializer"
import Header from "./components/Header" // Import Header here
import { usePathname } from "next/navigation"
import socketIO from "socket.io-client"

const Custom = ({ children }: { children: React.ReactNode }) => {
    const { status } = useSession();
    const [isMounted, setIsMounted] = useState(false);
    const pathname = usePathname();

    // Check if current route is an admin route
    const isAdminRoute = pathname?.startsWith('/admin');

    const hasToken =
        typeof window !== "undefined"
            ? localStorage.getItem("token")
            : null;

    const { isLoading } = useLoadUserQuery(
        {},
        {
            skip: !hasToken,
        }
    );

    useEffect(() => {
        if (status !== "loading" && !isLoading) {
            setIsMounted(true);
        }
    }, [status, isLoading]);

    if (!isMounted && (status === "loading" || isLoading)) {
        return <Loader />;
    }

    return (
        <>
            {/* Render header continuously for public pages, skip for admin */}
            {!isAdminRoute && <Header />}
            <div className={!isAdminRoute ? "pt-[80px]" : ""}>
                {children}
            </div>
        </>
    );
};

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