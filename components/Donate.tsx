'use client'; 

import { useState, useEffect } from 'react';
import type { FC } from 'react';

const Donate: FC = () => {
    const [mounted, setMounted] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const copyVenmoId = () => { 
        navigator.clipboard
        .writeText('@Cogaineum-Art')
        .then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        })
        .catch(err => {
            console.error('Failed to copy Venmo ID:', err);
        });
    };

    if (!mounted) return null; 

    return (
        <div className="py-24 px-6 section-gradient">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-light gradient-text-animated mb-6">
                        Help me make art
                    </h2>
                    <div className="w-24 h-px gradient-bg mx-auto mb-8"></div>
                    <p className="text-slate-400 max-w-2xl mx-auto">I have more ideas than I have the money for creation. I buy all supplies from local establishments.</p>
                </div>
                
                {/* Donation Options */}
                <div className="space-y-8">
                    {/* Venmo Section */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
                        <h3 className="text-2xl font-light gradient-text-animated mb-4">
                            Venmo
                        </h3>
                        <p className="text-slate-400 mb-6">
                            Quick and easy way to support directly
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            {/* Venmo Link */}
                            <a 
                                href="https://venmo.com/Cogaineum-Art" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.5 0h-9L7 1.5V6H2.5L1 7.5V15l1.5 1.5H7v4.5L8.5 21h9L19 19.5V15h4.5L25 13.5V6l-1.5-1.5H19V1.5L17.5 0z"/>
                                </svg>
                                Open Venmo
                            </a>
                            
                            {/* Copy Venmo ID Button */}
                            <button 
                                onClick={copyVenmoId}
                                className="border-2 border-slate-600 text-slate-300 hover:border-slate-500 hover:text-white px-8 py-4 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                {copySuccess ? 'Copied!' : 'Copy @Cogaineum-Art'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Donate;