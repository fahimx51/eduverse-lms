import React from 'react'

export default function Loader() {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-[#050505] z- transition-colors duration-300">
            <div className="flex space-x-2">
                {/* Three dots with staggered bounce animations */}
                <div className="w-4 h-4 bg-blue-600 dark:bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-4 h-4 bg-blue-600 dark:bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-4 h-4 bg-blue-600 dark:bg-blue-500 rounded-full animate-bounce"></div>
            </div>

            {/* Dynamic Text using your Josefin Sans font */}
            <div className="mt-8 flex flex-col items-center">
                <p className="text-sm font-josefin font-semibold uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 animate-pulse">
                    Eduverse
                </p>
                <div className="mt-2 w-24 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            </div>
        </div>
    )
}
