import React from 'react';
import Loader from './components/Loader/Loader'; // Adjust path if needed

export default function Loading() {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-white dark:bg-slate-900">
            <Loader />
        </div>
    );
}