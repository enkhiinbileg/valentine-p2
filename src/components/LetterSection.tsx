'use client';
import { motion } from 'framer-motion';

// Cute Shiba/Cat Character holding a heart
function ShibaHoldingHeart() {
    return (
        <svg width="180" height="180" viewBox="0 0 100 100" className="drop-shadow-xl scale-75 md:scale-100">
            {/* Body */}
            <circle cx="50" cy="65" r="30" fill="#E69138" />
            <circle cx="50" cy="65" r="22" fill="#FFFFFF" opacity="0.8" />

            {/* Head */}
            <circle cx="50" cy="35" r="28" fill="#E69138" />
            <ellipse cx="50" cy="42" rx="20" ry="16" fill="#FFFFFF" />

            {/* Ears */}
            <path d="M28 20 L35 10 L45 20 Z" fill="#E69138" />
            <path d="M72 20 L65 10 L55 20 Z" fill="#E69138" />
            <path d="M32 18 L36 14 L40 18 Z" fill="#FFC0CB" />
            <path d="M68 18 L64 14 L60 18 Z" fill="#FFC0CB" />

            {/* Eyes */}
            <circle cx="40" cy="35" r="3" fill="#3D2B1F" />
            <circle cx="60" cy="35" r="3" fill="#3D2B1F" />

            {/* Nose */}
            <ellipse cx="50" cy="42" rx="4" ry="3" fill="#3D2B1F" />

            {/* Blush */}
            <circle cx="32" cy="45" r="5" fill="#FF69B4" opacity="0.3" />
            <circle cx="68" cy="45" r="5" fill="#FF69B4" opacity="0.3" />

            {/* Paws holding the heart */}
            <circle cx="35" cy="70" r="8" fill="#E69138" stroke="#FFFFFF" strokeWidth="1" />
            <circle cx="65" cy="70" r="8" fill="#E69138" stroke="#FFFFFF" strokeWidth="1" />

            {/* The Heart he is holding */}
            <motion.path
                d="M50 60 C40 50, 30 55, 30 65 C30 75, 50 85, 50 85 C50 85, 70 75, 70 65 C70 55, 60 50, 50 60"
                fill="#FF1493"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
            />
        </svg>
    );
}

interface LetterSectionProps {
    content?: string;
}

export default function LetterSection({ content }: LetterSectionProps) {
    const letters = content ? content.split('\n') : [
        "Хайрт чамдаа,",
        "Чи бол миний хамгийн харанхуй өдрүүдийн нар, хором бүрийн минь баяр баясгалан юм.",
        "Чиний хайр намайг илүү дээр хүн болгосон, бидний хамтдаа өнгөрүүлсэн инээд бүрт би үнэхээр талархдаг.",
        "Би үргэлж чиний талд байж, чамайг дэмжиж, өдөр бүр чамайг илүү их хайрлахаа амлаж байна.",
        "Үүрд чинийх! ❤️"
    ];

    return (
        <div className="w-full min-h-screen py-12 md:py-24 px-4 relative bg-[#FFC5D3] flex flex-col items-center justify-center paper-texture landscape:py-6">
            {/* Binder Holes Shadow - to simulate a notebook page */}
            <div className="absolute top-10 left-5 md:top-20 md:left-20 flex flex-col gap-4 md:gap-6 opacity-20">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="w-5 h-5 md:w-8 md:h-8 rounded-full bg-[#5D4037] shadow-inner"></div>
                ))}
            </div>

            <div className="w-full max-w-4xl bg-white shadow-2xl rounded-sm relative overflow-hidden flex flex-col md:flex-row min-h-[500px] md:min-h-[600px] landscape:min-h-[300px] landscape:scale-90">
                {/* Red margin line */}
                <div className="absolute top-0 left-8 md:left-12 h-full w-0.5 bg-red-400 opacity-50"></div>

                {/* Lined paper lines */}
                <div className="absolute inset-0 flex flex-col justify-between py-12 pointer-events-none">
                    {[...Array(25)].map((_, i) => (
                        <div key={i} className="w-full h-[1px] bg-blue-100"></div>
                    ))}
                </div>

                {/* Left Side - Character illustration */}
                <div className="w-full md:w-1/3 flex items-center justify-center p-4 md:p-8 bg-pink-50 relative z-10 border-b md:border-b-0 md:border-r border-pink-100">
                    <div className="flex flex-col items-center">
                        <ShibaHoldingHeart />
                        <motion.div
                            className="mt-4 text-pink-600 font-bold italic"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            p.s. Чамдаа хайртай шүү!
                        </motion.div>
                    </div>
                </div>

                {/* Right Side - Letter content */}
                <div className="w-full md:w-2/3 p-6 md:p-12 relative z-10">
                    <motion.h2
                        className="text-xl md:text-4xl font-bold text-[#5D4037] mb-4 md:mb-12 font-heading landscape:text-lg landscape:mb-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                    >
                        Чамдаа зориулсан захидал 💌
                    </motion.h2>

                    <div className="space-y-8">
                        {letters.map((line, i) => (
                            <motion.p
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + i * 0.2 }}
                                className="text-[#5D4037] text-base md:text-xl font-handwriting leading-relaxed landscape:text-sm landscape:mb-1"
                            >
                                {line}
                            </motion.p>
                        ))}
                    </div>
                </div>
            </div>

            {/* Decorative stamp in the corner */}
            <div className="absolute bottom-10 right-5 md:bottom-24 md:right-32 transform rotate-12 opacity-80 scale-75 md:scale-100">
                <div className="w-24 h-24 border-4 border-dashed border-pink-300 rounded-lg flex items-center justify-center p-2">
                    <span className="text-4xl">💌</span>
                </div>
                <p className="text-pink-400 font-bold text-center mt-1">ШУУДАН</p>
            </div>
        </div>
    );
}
