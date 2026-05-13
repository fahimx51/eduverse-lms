"use client"
import { useEditHeroDataMutation, useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import React, { useEffect, useState } from 'react'
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { HiOutlinePencil, HiOutlineCheck } from 'react-icons/hi';
import toast from 'react-hot-toast';
import Loader from '../../Loader/Loader';

interface IFAQ {
    _id?: string;
    question: string;
    answer: string;
}

export default function EditFAQ() {
    const [faqs, setFaqs] = useState<IFAQ[]>([]);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);

    const { data } = useGetHeroDataQuery("FAQ", {
        refetchOnMountOrArgChange: true
    });

    const [editHeroData, { isSuccess, error, isLoading }] = useEditHeroDataMutation();

    useEffect(() => {
        if (data?.layout?.faq) {
            setFaqs(data.layout.faq);
        }
    }, [data]);

    // Toggle expand/collapse
    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    // Toggle edit mode
    const toggleEdit = (id: string) => {
        setEditingId(editingId === id ? null : id);
    };

    // Update a field
    const handleChange = (id: string, field: 'question' | 'answer', value: string) => {
        setFaqs(prev => prev.map(faq =>
            faq._id === id ? { ...faq, [field]: value } : faq
        ));
    };

    // Add new FAQ
    const handleAdd = () => {
        const newFaq: IFAQ = {
            _id: `temp_${Date.now()}`,
            question: "",
            answer: ""
        };
        setFaqs(prev => [...prev, newFaq]);
        setEditingId(newFaq._id!);
        setExpandedId(newFaq._id!);
    };

    // Delete FAQ
    const handleDelete = (id: string) => {
        setFaqs(prev => prev.filter(faq => faq._id !== id));
        toast.success("FAQ removed");
    };

    // Save all
    const handleSave = async () => {
        const isValid = faqs.every(f => f.question.trim() && f.answer.trim());
        if (!isValid) {
            toast.error("Please fill in all question and answer fields");
            return;
        }

        // Strip all _id — let MongoDB handle IDs completely
        const cleanFaqs = faqs.map(({ _id, ...rest }) => rest)

        await editHeroData({
            type: "FAQ",
            faq: cleanFaqs
        });

        toast.success("FAQs saved successfully!");
    };

    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div className="w-full min-h-screen pt-[80px] px-4 800px:px-8 pb-10">

                        {/* Header */}
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-josefin font-bold text-black dark:text-white">
                                    Edit FAQ
                                </h1>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-poppins">
                                    Manage frequently asked questions
                                </p>
                            </div>
                            <span className="px-4 py-2 rounded-xl text-sm font-poppins font-medium bg-blue-50 dark:bg-[#1F2A40] text-blue-700 dark:text-blue-300">
                                {faqs.length} Questions
                            </span>
                        </div>

                        {/* FAQ List */}
                        <div className="flex flex-col gap-3 max-w-[900px]">
                            {faqs.map((faq, index) => {
                                const id = faq._id!;
                                const isExpanded = expandedId === id;
                                const isEditing = editingId === id;

                                return (
                                    <div
                                        key={id}
                                        className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111C43] overflow-hidden transition-all duration-200"
                                    >
                                        {/* FAQ Header Row */}
                                        <div className="flex items-center gap-3 px-4 py-3">

                                            {/* Index */}
                                            <span className="w-6 h-6 rounded-full bg-blue-50 dark:bg-[#1a2550] text-blue-600 dark:text-blue-300 text-xs font-bold flex items-center justify-center flex-shrink-0 font-poppins">
                                                {index + 1}
                                            </span>

                                            {/* Question — editable or display */}
                                            <div className="flex-1 min-w-0">
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        value={faq.question}
                                                        onChange={(e) => handleChange(id, 'question', e.target.value)}
                                                        placeholder="Enter question..."
                                                        className="w-full bg-slate-50 dark:bg-[#1a2550] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-1.5 text-sm font-poppins text-black dark:text-white outline-none focus:ring-2 focus:ring-[#3b5bdb] placeholder:text-slate-400"
                                                    />
                                                ) : (
                                                    <p className="text-sm font-medium font-poppins text-black dark:text-white truncate">
                                                        {faq.question || <span className="opacity-40 italic">No question entered</span>}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex items-center gap-1 flex-shrink-0">

                                                {/* Edit / Done */}
                                                <button
                                                    onClick={() => toggleEdit(id)}
                                                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isEditing
                                                        ? 'bg-green-500 hover:bg-green-600 text-white'
                                                        : 'bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300'
                                                        }`}
                                                >
                                                    {isEditing
                                                        ? <HiOutlineCheck size={15} />
                                                        : <HiOutlinePencil size={15} />
                                                    }
                                                </button>

                                                {/* Delete */}
                                                <button
                                                    onClick={() => handleDelete(id)}
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-white/5 hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-all"
                                                >
                                                    <AiOutlineDelete size={15} />
                                                </button>

                                                {/* Expand */}
                                                <button
                                                    onClick={() => toggleExpand(id)}
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 transition-all"
                                                >
                                                    {isExpanded
                                                        ? <MdOutlineKeyboardArrowUp size={18} />
                                                        : <MdOutlineKeyboardArrowDown size={18} />
                                                    }
                                                </button>
                                            </div>
                                        </div>

                                        {/* Answer — expanded */}
                                        {isExpanded && (
                                            <div className="px-4 pb-4 pt-1 border-t border-slate-100 dark:border-white/5">
                                                <p className="text-xs font-medium font-poppins text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">
                                                    Answer
                                                </p>
                                                {isEditing ? (
                                                    <textarea
                                                        value={faq.answer}
                                                        onChange={(e) => handleChange(id, 'answer', e.target.value)}
                                                        placeholder="Enter answer..."
                                                        rows={4}
                                                        className="w-full bg-slate-50 dark:bg-[#1a2550] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm font-poppins text-black dark:text-white outline-none focus:ring-2 focus:ring-[#3b5bdb] placeholder:text-slate-400 resize-none transition-all"
                                                    />
                                                ) : (
                                                    <p className="text-sm text-slate-600 dark:text-slate-300 font-poppins leading-relaxed">
                                                        {faq.answer || <span className="opacity-40 italic">No answer entered</span>}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            {/* Empty state */}
                            {faqs.length === 0 && (
                                <div className="text-center py-16 rounded-xl border border-dashed border-slate-200 dark:border-white/10">
                                    <p className="text-slate-400 dark:text-slate-500 font-poppins text-sm">
                                        No FAQs yet. Add your first one below.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Bottom Buttons */}
                        <div className="flex items-center gap-3 mt-6 max-w-[900px]">
                            <button
                                onClick={handleAdd}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-dashed border-slate-300 dark:border-white/20 text-slate-600 dark:text-slate-300 hover:border-[#3b5bdb] hover:text-[#3b5bdb] dark:hover:text-blue-400 transition-all text-sm font-poppins font-medium"
                            >
                                <AiOutlinePlus size={16} />
                                Add Question
                            </button>

                            <button
                                onClick={handleSave}
                                className="px-6 py-2.5 bg-[#3b5bdb] hover:bg-[#2f4bc4] active:scale-[0.98] text-white font-poppins font-medium text-sm rounded-xl transition-all shadow-md shadow-blue-900/20"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div >
                )
            }
        </>
    )
}