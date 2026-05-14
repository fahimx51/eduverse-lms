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

    const toggleExpand = (id: string) => setExpandedId(expandedId === id ? null : id);
    const toggleEdit = (id: string) => setEditingId(editingId === id ? null : id);

    const handleChange = (id: string, field: 'question' | 'answer', value: string) => {
        setFaqs(prev => prev.map(faq =>
            faq._id === id ? { ...faq, [field]: value } : faq
        ));
    };

    const handleAdd = () => {
        const newFaq: IFAQ = { _id: `temp_${Date.now()}`, question: "", answer: "" };
        setFaqs(prev => [...prev, newFaq]);
        setEditingId(newFaq._id!);
        setExpandedId(newFaq._id!);
    };

    const handleDelete = (id: string) => {
        setFaqs(prev => prev.filter(faq => faq._id !== id));
        toast.success("FAQ removed");
    };

    const handleSave = async () => {
        const isValid = faqs.every(f => f.question.trim() && f.answer.trim());
        if (!isValid) {
            toast.error("Please fill in all question and answer fields");
            return;
        }
        const cleanFaqs = faqs.map(({ _id, ...rest }) => rest);
        await editHeroData({ type: "FAQ", faq: cleanFaqs });
        toast.success("FAQs saved successfully!");
    };

    return (
        <div className="w-full min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] pt-[80px] pb-20">
            {isLoading ? <Loader /> : (
                <div className="max-w-[1000px] mx-auto px-4">

                    {/* Modern Header Section */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                FAQ Management
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1 font-poppins">
                                Shape the knowledge base of your Eduverse platform.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleAdd}
                                className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all text-sm font-semibold text-slate-700 dark:text-slate-200"
                            >
                                <AiOutlinePlus className="text-blue-500" /> Add Question
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-500/20 transition-all active:scale-95 text-sm"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>

                    {/* FAQ Grid/List */}
                    <div className="space-y-4">
                        {faqs.map((faq, index) => {
                            const id = faq._id!;
                            const isExpanded = expandedId === id;
                            const isEditing = editingId === id;

                            return (
                                <div
                                    key={id}
                                    className={`group transition-all duration-300 rounded-2xl border ${isExpanded
                                        ? 'border-blue-200 dark:border-blue-900/50 bg-blue-50/30 dark:bg-blue-900/10'
                                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                                        }`}
                                >
                                    <div className="p-4 flex items-center gap-4">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold text-sm">
                                            {String(index + 1).padStart(2, '0')}
                                        </div>

                                        <div className="flex-1">
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={faq.question}
                                                    onChange={(e) => handleChange(id, 'question', e.target.value)}
                                                    className="w-full bg-transparent border-b border-blue-500/50 py-1 text-lg font-medium outline-none text-black dark:text-white"
                                                    placeholder="Enter the question..."
                                                />
                                            ) : (
                                                <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 cursor-pointer" onClick={() => toggleExpand(id)}>
                                                    {faq.question || "New empty question"}
                                                </h3>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => toggleEdit(id)} className={`p-2 rounded-lg transition-colors ${isEditing ? 'bg-green-500 text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500'}`}>
                                                {isEditing ? <HiOutlineCheck size={18} /> : <HiOutlinePencil size={18} />}
                                            </button>
                                            <button onClick={() => handleDelete(id)} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition-colors">
                                                <AiOutlineDelete size={18} />
                                            </button>
                                            <button onClick={() => toggleExpand(id)} className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500">
                                                {isExpanded ? <MdOutlineKeyboardArrowUp size={20} /> : <MdOutlineKeyboardArrowDown size={20} />}
                                            </button>
                                        </div>
                                    </div>

                                    {isExpanded && (
                                        <div className="px-4 pb-6 ml-14">
                                            <div className="h-px bg-slate-200 dark:bg-slate-800 mb-4" />
                                            <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-2">Detailed Answer</p>
                                            {isEditing ? (
                                                <textarea
                                                    value={faq.answer}
                                                    onChange={(e) => handleChange(id, 'answer', e.target.value)}
                                                    className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 text-sm outline-none border border-slate-200 dark:border-slate-700 focus:border-blue-500 text-black dark:text-white"
                                                    rows={4}
                                                    placeholder="Write the answer here..."
                                                />
                                            ) : (
                                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-poppins">
                                                    {faq.answer || "Please add an answer for this question."}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {faqs.length === 0 && (
                            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                                <div className="bg-blue-50 dark:bg-blue-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <AiOutlinePlus size={24} className="text-blue-500" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800 dark:text-white">No FAQs Created</h2>
                                <p className="text-slate-500 mt-2">Click the button above to create your first question.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}