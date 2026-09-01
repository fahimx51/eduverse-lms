'use client'
import { redirect, usePathname } from "next/navigation";
import useUserAuth from "./userAuth";

interface ProtectedProps {
    children: React.ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
    const isAuthenticated = useUserAuth();
    const pathname = usePathname();

    if (!isAuthenticated) {
        // Encode the target path so special characters don't break the URL
        redirect(`/?login=true&redirectUrl=${encodeURIComponent(pathname)}`);
    }

    return <>{children}</>;
}