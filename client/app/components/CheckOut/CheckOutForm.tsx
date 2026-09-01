"use client"
import { styles } from '@/app/styles/style';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { useCreateOrderMutation } from '@/redux/features/orders/orderApi';
import { RootState } from '@/redux/store/store';
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import socketIO from "socket.io-client"

type Props = {
    setOpen: any;
    data: any;
}

export default function CheckOutForm({ setOpen, data }: Props) {
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();

    const [message, setMessage] = useState<any>("");
    const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
    const [loadUser, setLoadUser] = useState(false);
    const { } = useLoadUserQuery({}, { skip: !loadUser });
    const [isLoading, setIsLoading] = useState(false);

    const { user } = useSelector((state: RootState) => state.auth);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements || isLoading) {
            return;
        }

        setIsLoading(true);
        setMessage("");

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        });

        if (error) {
            setMessage(error.message);
            setIsLoading(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            // Keep isLoading true to prevent further clicks while order is created
            createOrder({ courseId: data._id, payment_info: paymentIntent });
        }
    };

    useEffect(() => {
        if (orderData) {
            setLoadUser(true);

            // Connect socket dynamically for notification
            const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI;
            if (ENDPOINT) {
                const socket = socketIO(ENDPOINT, { transports: ["websocket"] });
                socket.emit("notification", {
                    title: "New Order",
                    message: `You have a new order from ${data?.name || data?.course?.name}`,
                    userId: user?._id
                });
            }

            toast.success("Payment successful!");
            setIsLoading(false);
            setOpen(false); // Close payment modal
            router.push(`/course-access/${data._id}`);
        }

        if (error) {
            setIsLoading(false);
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [orderData, error, data, user, setOpen, router]);

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <LinkAuthenticationElement id="link-authentication-element" />
            <PaymentElement id="payment-element" />
            <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                type="submit"
                className="w-full"
            >
                <span id="button-text" className={`${styles.button} mt-4 !h-[35px] ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    {isLoading ? "Processing..." : "Pay now"}
                </span>
            </button>
            {message && (
                <div id="payment-message" className="text-red-500 font-Poppins pt-2 text-sm text-center">
                    {message}
                </div>
            )}
        </form>
    );
}