import React from 'react';
import Header from '../Header';

export default function AboutWrapper() {
    // Sample data for stats
    const stats = [
        { value: "10K+", label: "Active Students" },
        { value: "200+", label: "Expert Mentors" },
        { value: "99%", label: "Satisfaction Rate" },
        { value: "50+", label: "Premium Courses" },
    ];

    // Sample data for core values or features
    const coreValues = [
        {
            title: "Accessible Learning",
            description: "We break down financial and geographical barriers to provide high-quality education to anyone, anywhere."
        },
        {
            title: "Expert-Led Curriculums",
            description: "Our courses are crafted and taught by industry professionals with real-world, practical experience."
        },
        {
            title: "Community First",
            description: "We foster an interactive space where students can collaborate, network, and grow side-by-side."
        }
    ];

    return (
        <div className="min-h-screen mt-[80px] bg-white dark:bg-[#0f172a] text-black dark:text-white transition-colors duration-200">
            <Header />

            {/* Hero Section */}
            <section className="w-full max-w-7xl mx-auto px-4 pt-16 pb-12 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                    Empowering Minds, <span className="text-blue-500 dark:text-blue-400">Shaping Futures</span>
                </h1>
                <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    We are dedicated to building a world-class platform that bridges the gap between ambitious learners and industry-leading expertise.
                </p>
            </section>

            {/* Stats Section */}
            <section className="w-full border-y border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-slate-900/40">
                <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="flex flex-col gap-1">
                                <span className="text-3xl sm:text-4xl font-bold text-blue-500 dark:text-blue-400">
                                    {stat.value}
                                </span>
                                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Values / Mission Section */}
            <section className="w-full max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold">Our Core Values</h2>
                    <div className="w-12 h-1 bg-blue-500 mx-auto mt-3 rounded" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {coreValues.map((value, idx) => (
                        <div
                            key={idx}
                            className="p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1a2432]/40 hover:shadow-md transition-shadow duration-200"
                        >
                            <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
                                {value.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                {value.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Simple Footer/CTA Segment */}
            <section className="w-full text-center pb-20 pt-8 px-4">
                <h3 className="text-xl font-semibold mb-4">Ready to start your journey?</h3>
                <button className="h-11 px-6 rounded-full bg-blue-500 hover:bg-blue-600 font-medium text-white shadow-sm transition-all duration-200">
                    Explore Courses
                </button>
            </section>
        </div>
    );
}