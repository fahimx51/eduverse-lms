import React from 'react';
import Link from 'next/link';
import { AiOutlineMail, AiOutlinePhone, AiOutlineGithub } from 'react-icons/ai';
import { FaLinkedinIn, FaFacebookF } from 'react-icons/fa';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white dark:bg-slate-900/0 dark:border-none border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <div className="w-[90%] 800px:w-[85%] mx-auto py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                    {/* Brand Section */}
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="text-2xl font-josefin font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                            Eduverse
                        </Link>
                        <p className="text-slate-500 dark:text-slate-400 font-poppins text-sm leading-relaxed">
                            Empowering the next generation of developers through project-based learning and industry-standard technical mastery.
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                            <a href="#" className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                                <FaLinkedinIn size={16} />
                            </a>
                            <a href="https://github.com/fahimx51" className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
                                <AiOutlineGithub size={18} />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-blue-500 hover:text-white transition-all">
                                <FaFacebookF size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-slate-900 dark:text-white font-bold mb-6 font-josefin uppercase tracking-wider text-sm">Programs</h4>
                        <ul className="flex flex-col gap-3">
                            {['MERN Stack', 'Next.js Mastery', 'System Design', 'Cloud Computing'].map((link) => (
                                <li key={link}>
                                    <Link href="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-poppins">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-slate-900 dark:text-white font-bold mb-6 font-josefin uppercase tracking-wider text-sm">Resources</h4>
                        <ul className="flex flex-col gap-3">
                            {['About Us', 'Success Stories', 'Documentation', 'Privacy Policy'].map((link) => (
                                <li key={link}>
                                    <Link href="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-poppins">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-slate-900 dark:text-white font-bold mb-6 font-josefin uppercase tracking-wider text-sm">Contact Us</h4>
                        <div className="flex flex-col gap-4 text-sm font-poppins">
                            <div className="flex items-start gap-3 text-slate-500 dark:text-slate-400">
                                <AiOutlineMail size={18} className="text-blue-500 flex-shrink-0" />
                                <span>support@eduverse.com</span>
                            </div>
                            <div className="flex items-start gap-3 text-slate-500 dark:text-slate-400">
                                <AiOutlinePhone size={18} className="text-blue-500 flex-shrink-0" />
                                <span>+880 1234-567890</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-2">
                                Sylhet, Bangladesh
                            </p>
                        </div>
                    </div>

                </div>

                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-xs font-poppins text-center">
                        © {currentYear} Eduverse. All rights reserved. Built by <span className="text-blue-500 font-medium">Foisal Ahmed Fahim</span>.
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-slate-400 hover:text-blue-500 text-xs transition-colors">Terms of Service</Link>
                        <Link href="#" className="text-slate-400 hover:text-blue-500 text-xs transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}