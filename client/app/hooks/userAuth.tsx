'use client'
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";

export default function useUserAuth() {
    const { user } = useSelector((state: RootState) => state.auth);
    return !!user;
}