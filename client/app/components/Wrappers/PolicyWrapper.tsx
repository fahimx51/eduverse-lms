import React from 'react';
import Header from '../Header';

export default function PolicyWrapper() {
    // Structured Policy Data
    const policies = [
        {
            title: "1. Information We Collect",
            content: "We collect information you provide directly to us when creating an account, updating your profile, purchasing a course, or communicating with us. This includes your name, email address, password, profile picture, and payment details. We also automatically collect technical data such as IP addresses, browser types, and device information to optimize platform performance."
        },
        {
            title: "2. How We Use Your Data",
            content: "The information gathered is strictly utilized to provide, maintain, and protect our educational services. This includes processing payments, delivering personalized course recommendation feeds, sending authentication verifications, and notifying you about critical system or dashboard announcements."
        },
        {
            title: "3. Data Security & Storage",
            content: "EduVerse implements industry-standard technical and organizational security protocols to maintain the absolute safety of your personal data. Your passwords are encrypted via cryptographic hashing algorithms, and all communication transactions are tunneled through secure HTTPS/TLS channels."
        },
        {
            title: "4. Cookie Policy",
            content: "We use performance cookies, functional cookies, and web beacons to enhance your navigation experience. These small text strings help us remember your authentication sessions, preserve your preferred layout theme selections (Light/Dark mode), and track analytical usage trends anonymously."
        },
        {
            title: "5. Third-Party Integrations",
            content: "We safely coordinate with reliable external micro-services to maximize application utility (e.g., payment gateways and authentication nodes like Google/NextAuth). These networks only process the minimum essential metadata required to execute their specific operations on our behalf."
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-[#0f172a] text-black dark:text-white transition-colors duration-200">
            {/* <Header /> */}

            {/* Main Content Wrapper Container - Pushed down by pt-[80px] to sit cleanly below the fixed header */}
            <div className="w-full pt-[80px]">

                {/* Hero Title Header Section */}
                <section className="w-full max-w-4xl mx-auto px-4 pt-16 pb-10 sm:px-6 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                        Privacy Policy & <span className="text-blue-500 dark:text-blue-400">Terms</span>
                    </h1>
                    <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase">
                        Last Updated: May 2026
                    </p>
                </section>

                {/* Policy Articles Body Segment */}
                <section className="w-full max-w-4xl mx-auto px-4 pb-20 sm:px-6">
                    <div className="space-y-8">
                        {policies.map((item, idx) => (
                            <div
                                key={idx}
                                className="p-6 sm:p-8 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#1a2432]/20 shadow-sm"
                            >
                                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                                    {item.title}
                                </h2>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                                    {item.content}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Quick Contact Footer Disclaimer */}
                    <div className="mt-12 text-center border-t border-gray-100 dark:border-gray-800/80 pt-8">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Have questions or concerns regarding our privacy standards? Reach out directly via{" "}
                            <span className="text-blue-500 dark:text-blue-400 font-medium cursor-pointer hover:underline">
                                support@eduverse.com
                            </span>
                        </p>
                    </div>
                </section>

            </div>
        </div>
    );
}