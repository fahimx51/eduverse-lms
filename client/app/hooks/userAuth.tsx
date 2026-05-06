'use client'
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

export default function useUserAuth() {
    const { user } = useSelector((state: RootState) => state.auth)
    return !!user;
}