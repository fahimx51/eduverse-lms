'use client'
import { RootState } from "@/redux/store/store";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

interface ProtectedProps {
    children: React.ReactNode
}

export default function AdminProtected({ children }: ProtectedProps) {

    const { user } = useSelector((state: RootState) => state.auth);

    const isAdmin = user?.role === 'admin';

    return (
        isAdmin ? children : redirect('/')
    );
}