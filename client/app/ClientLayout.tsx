'use client'

import { useState, useEffect } from "react"
import { ThemeProvider } from "./utils/Theme-Provider"
import { Toaster } from "react-hot-toast"
import { Providers } from "./Provider"
import { SessionProvider } from "next-auth/react"
import { useLoadUserQuery } from "../redux/features/api/apiSlice"
import Loader from "./components/Loader/Loader"
import Header from "./components/Header";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <SessionProvider>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <Custom>
                        <Header />
                        {children}
                    </Custom>
                    <Toaster position="top-center" reverseOrder={false} />
                </ThemeProvider>
            </SessionProvider>
        </Providers>
    )
}

const Custom = ({ children }: { children: React.ReactNode }) => {
    const [mounted, setMounted] = useState(false);

    const hasSession = typeof window !== "undefined" ? localStorage.getItem("user") : null;

    // 2. ALWAYS call the hook at the top level, but use 'skip'
    const { isLoading, isError, data, isSuccess } = useLoadUserQuery({}, {
        // If there's no session hint, skip the API call entirely
        skip: !hasSession,
        refetchOnMountOrArgChange: true
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Loading Logic: Only show loader if we have a session and are fetching
    if (hasSession && isLoading && !isSuccess && !isError) {
        return <Loader />;
    }

    return <>{children}</>;
};