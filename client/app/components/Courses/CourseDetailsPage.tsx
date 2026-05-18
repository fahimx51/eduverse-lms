"use client"
import { useGetCourseDetailsQuery } from '@/redux/features/courses/coursesApi';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
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

    useEffect(() => {
        // 1. Only initialize Stripe if config exists AND contains the publishableKey
        if (config && config.publishableKey) {
            const publishableKey = config.publishableKey;
            setStripePromise(loadStripe(publishableKey));
        }

        // 2. Safely check if data and course price exist before calculating amount
        if (data && data.course?.price !== undefined) {
            const amount = Math.round(data.course.price * 100);
            createPaymentIntent(amount);
        }
    }, [config, data]);

    useEffect(() => {
        if (paymentIntentData && paymentIntentData.client_secret) {
            setClientSecret(paymentIntentData.client_secret);
        }
    }, [paymentIntentData]);

    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div>
                        <Header
                            route={route}
                            setRoute={setRoute}
                            setOpen={setOpen}
                            activeItem={1}
                        />

                        {data && data.course && (
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
                )
            }
        </>
    )
}