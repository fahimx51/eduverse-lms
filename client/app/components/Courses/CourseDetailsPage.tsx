"use client"

import { useGetCourseDetailsQuery } from '@/redux/features/courses/coursesApi';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import Header from '../Header';
import CourseDetails from './CourseDetails';
import Footer from '../Footer/Footer';
import { useCreatePaymentIntentMutation, useGetStripePublishableKeyQuery } from '@/redux/features/orders/orderApi';
import { loadStripe } from '@stripe/stripe-js';

export default function CourseDetailsPage() {
    const { id } = useParams();

    const { data, isLoading } = useGetCourseDetailsQuery({ id });
    const { data: config } = useGetStripePublishableKeyQuery({});
    const [createPaymentIntent, { data: paymentIntentData }] = useCreatePaymentIntentMutation();

    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);

    const [stripePromise, setStripePromise] = useState<any>(null);
    const [clientSecret, setClientSecret] = useState('');
    const [intentCreated, setIntentCreated] = useState(false);

    // Initialize Stripe Promise when config arrives
    useEffect(() => {
        if (config?.publishableKey) {
            setStripePromise(loadStripe(config.publishableKey));
        }
    }, [config]);

    // Create Payment Intent ONLY ONCE per course load
    useEffect(() => {
        if (data?.course?.price !== undefined && !intentCreated) {
            const amount = Math.round(data.course.price * 100);
            createPaymentIntent(amount);
            setIntentCreated(true);
        }
    }, [data, intentCreated, createPaymentIntent]);

    // Update clientSecret state when RTK Query mutation returns data
    useEffect(() => {
        if (paymentIntentData?.client_secret) {
            setClientSecret(paymentIntentData.client_secret);
        }
    }, [paymentIntentData]);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="mt-[80px]">
                    <Header
                        route={route}
                        setRoute={setRoute}
                        setOpen={setOpen}
                        activeItem={1}
                    />

                    {data?.course && (
                        <CourseDetails
                            data={data.course}
                            stripePromise={stripePromise}
                            clientSecret={clientSecret}
                            setRoute={setRoute}
                            setOpen={setOpen}
                        />
                    )}

                    <Footer />
                </div>
            )}
        </>
    );
}