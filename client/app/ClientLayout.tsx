'use client'

import { useState, useEffect } from "react"
import { ThemeProvider } from "./utils/Theme-Provider"
import { Toaster } from "react-hot-toast"
import { Providers } from "./Provider"
import { SessionProvider } from "next-auth/react"
import { useLoadUserQuery } from "../redux/features/api/apiSlice"
import Loader from "./components/Loader/Loader"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
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

const Custom = ({ children }: { children: React.ReactNode }) => {
    const { isLoading, isError, data } = useLoadUserQuery({}, {
        refetchOnMountOrArgChange: true
    })

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        queueMicrotask(() => setMounted(true))
    }, [])

    if (!mounted) return null
    if (isLoading && !data && !isError) return <Loader />

    return <>{children}</>
}