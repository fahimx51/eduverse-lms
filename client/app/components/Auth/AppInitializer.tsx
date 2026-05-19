'use client'

import { useEffect } from "react"
import { apiSlice } from "@/redux/features/api/apiSlice"
import { store } from "@/redux/store/store"
import { userLoggedOut } from "@/redux/features/auth/authSlice"

export default function AppInitializer() {
    useEffect(() => {
        const init = async () => {
            const token =
                typeof window !== "undefined"
                    ? localStorage.getItem("token")
                    : null

            if (!token) return

            try {
                await store
                    .dispatch(
                        apiSlice.endpoints.loadUser.initiate(
                            {},
                            { forceRefetch: true }
                        )
                    )
                    .unwrap()
            } catch (err) {
                console.log(err)
                localStorage.removeItem("token")
                store.dispatch(userLoggedOut())
            }
        }

        init()
    }, [])

    return null
}