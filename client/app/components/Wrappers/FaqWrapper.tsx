"use client"
import React, { useState } from 'react';
import Header from '../Header';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import Loader from '../Loader/Loader';

interface IFAQ {
    _id?: string;
    question: string;
    answer: string;
}

export default function FaqWrapper() {
    const [activeId, setActiveId] = useState<string | null>(null);

    // Fetch dynamic FAQ array data from layout query slice
    const { data, isLoading } = useGetHeroDataQuery("FAQ", {
        refetchOnMountOrArgChange: true
    });

    const faqs: IFAQ[] = data?.layout?.faq || [];

    const toggleAccordion = (id: string) => {
        setActiveId(activeId === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0f172a] text-black dark:text-white transition-colors duration-200">
            {/* <Header /> */}

            {/* Content Container - Pushed down to sit safely below your fixed header wrapper */}
            <div className="w-full pt-[80px]">

                {isLoading ? (
                    <div className="h-[60vh] flex items-center justify-center">
                        <Loader />
                    </div>
                ) : (
                    <div className="max-w-[850px] mx-auto px-4 pt-16 pb-20">

                        {/* Intro Header text blocks */}
                        <div className="text-center mb-14">
                            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                                Frequently Asked <span className="text-blue-500 dark:text-blue-400">Questions</span>
                            </h1>
                            <p className="max-w-xl mx-auto text-base text-gray-500 dark:text-gray-400 font-poppins">
                                Have questions? We're here to help. Explore our comprehensive platform answers below.
                            </p>
                        </div>

                        {/* Accordion Interface Wrapper */}
                        <div className="space-y-4">
                            {faqs.map((faq, index) => {
                                // Generate a secure runtime identifier matching your structural data nodes
                                const faqId = faq._id || `faq_item_${index}`;
                                const isOpen = activeId === faqId;

                                return (
                                    <div
                                        key={faqId}
                                        className={`transition-all duration-300 rounded-2xl border ${isOpen
                                            ? 'border-blue-100 dark:border-blue-900/50 bg-blue-50/20 dark:bg-blue-950/10'
                                            : 'border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-[#1a2432]/20'
                                            }`}
                                    >
                                        {/* Clickable Header Trigger Trigger */}
                                        <button
                                            type="button"
                                            onClick={() => toggleAccordion(faqId)}
                                            className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left font-medium select-none"
                                        >
                                            <span className="text-base sm:text-lg font-semibold tracking-wide text-gray-900 dark:text-gray-100 font-poppins">
                                                {faq.question}
                                            </span>
                                            <span className="text-gray-400 dark:text-gray-500 shrink-0 bg-white dark:bg-slate-900 p-1.5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                                                {isOpen ? <MdOutlineKeyboardArrowUp size={22} /> : <MdOutlineKeyboardArrowDown size={22} />}
                                            </span>
                                        </button>

                                        {/* Dropdown Body Block Panel */}
                                        <div
                                            className={`grid transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                                }`}
                                        >
                                            <div className="overflow-hidden">
                                                <div className="px-6 pb-6 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed font-normal font-poppins border-t border-gray-100/60 dark:border-gray-800/60 pt-4 mt-1">
                                                    {faq.answer}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Fallback Empty Template Block */}
                            {faqs.length === 0 && (
                                <div className="text-center py-16 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
                                    <p className="text-sm font-medium text-gray-400 dark:text-gray-500">
                                        No questions are available right now. Please check back later!
                                    </p>
                                </div>
                            )}
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}