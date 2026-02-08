'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Cute Cat SVG
function CuteCat() {
    return (
        <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-lg">
            {/* Body */}
            <ellipse cx="50" cy="70" rx="35" ry="25" fill="#FFFFFF" />
            {/* Head */}
            <circle cx="50" cy="40" r="30" fill="#FFFFFF" />
            {/* Ears */}
            <path d="M25 25 L40 30 L35 15 Z" fill="#FFFFFF" />
            <path d="M75 25 L60 30 L65 15 Z" fill="#FFFFFF" />
            <path d="M28 24 L35 27 L33 18 Z" fill="#FFC0CB" />
            <path d="M72 24 L65 27 L67 18 Z" fill="#FFC0CB" />
            {/* Face */}
            <circle cx="40" cy="40" r="3" fill="#3D2B1F" />
            <circle cx="60" cy="40" r="3" fill="#3D2B1F" />
            <path d="M45 50 Q50 55, 55 50" fill="none" stroke="#FFC0CB" strokeWidth="2" strokeLinecap="round" />
            {/* Paws */}
            <circle cx="35" cy="85" r="8" fill="#FFFFFF" stroke="#F0F0F0" strokeWidth="1" />
            <circle cx="65" cy="85" r="8" fill="#FFFFFF" stroke="#F0F0F0" strokeWidth="1" />
            {/* Tail */}
            <path d="M85 70 Q95 60, 90 50" fill="none" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
        </svg>
    );
}

interface PhotoFrameSectionProps {
    photoUrl?: string;
    reasons?: string[];
}

export default function PhotoFrameSection({ photoUrl, reasons }: PhotoFrameSectionProps) {
    const defaultReasons = [
        "Чиний үзэсгэлэнтэй инээмсэглэл",
        "Надад санаа тавьдаг чинь",
        "Чиний сайхан сэтгэл",
        "Чиний бүх зүйл надад таалагддаг",
        "Миний хамгийн сайн найз гэдэгт чинь"
    ];

    const displayReasons = reasons && reasons.length > 0 ? reasons : defaultReasons;

    return (
        <div className="w-full min-h-screen py-12 md:py-20 px-4 relative bg-[#FFC5D3] flex flex-col items-center justify-center paper-texture landscape:py-6">
            {/* Heart Garland at top */}
            <div className="absolute top-0 left-0 right-0 flex justify-center gap-1 md:gap-2 mt-4 overflow-hidden px-2">
                {[...Array(12)].map((_, i) => (
                    <motion.span
                        key={i}
                        className="text-xl md:text-2xl"
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                    >
                        ❤️
                    </motion.span>
                ))}
            </div>

            <motion.h2
                className="text-3xl md:text-6xl font-bold text-[#5D4037] mb-8 md:mb-12 font-heading text-center px-4 landscape:text-2xl landscape:mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
            >
                Бидний тухай надад таалагддаг зүйлс
            </motion.h2>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl mx-auto w-full px-4">
                {/* Photo Frame */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="relative group cursor-pointer shrink-0 z-10"
                    whileHover={{ rotate: [-1, 1, -1] }}
                >
                    {/* Diagonal Stripe Border */}
                    <div className="p-3 md:p-4 bg-white shadow-2xl rounded-sm overflow-hidden landscape:scale-[0.8] landscape:origin-center" style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, #FFB6C1, #FFB6C1 20px, #FFFFFF 20px, #FFFFFF 40px)',
                        padding: '10px md:12px'
                    }}>
                        <div className="bg-sky-400 w-[240px] h-[300px] md:w-80 md:h-[400px] relative flex items-center justify-center overflow-hidden">
                            {photoUrl ? (
                                <Image src={photoUrl} alt="Valentine Photo" fill className="object-cover group-hover:scale-110 transition-transform duration-700" unoptimized />
                            ) : (
                                <>
                                    {/* Inner Nature Scene (Background of the photo) */}
                                    <div className="absolute bottom-0 w-full h-1/2 bg-green-400 rounded-t-[100%]"></div>
                                    <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-200 rounded-full opacity-60"></div>

                                    {/* The Character in the photo */}
                                    <div className="relative z-10 flex flex-col items-center">
                                        <CuteCat />
                                        <div className="mt-2 bg-white/20 px-4 py-1 rounded-full backdrop-blur-sm">
                                            <span className="text-white font-bold">Мияав!</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    {/* Decorative Hearts around the frame */}
                    <motion.div
                        className="absolute -top-4 -right-4 md:-top-6 md:-right-6 text-4xl md:text-5xl"
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        💖
                    </motion.div>
                </motion.div>

                {/* Checklist Section - Reasons why I love you */}
                <div className="flex flex-col gap-4 md:gap-6 w-full lg:w-[450px] px-2 md:px-0">
                    <motion.h3
                        className="text-xl md:text-3xl font-bold text-[#5D4037] font-heading mb-2 md:mb-4 text-center lg:text-left landscape:text-lg landscape:mb-1"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                    >
                        Чамд хайртай байх шалтгаанууд:
                    </motion.h3>
                    {displayReasons.map((reason, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3 md:gap-4 bg-white/80 p-2 md:p-4 rounded-2xl shadow-sm border border-pink-100 landscape:p-1.5"
                        >
                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-pink-400 flex items-center justify-center text-white font-bold shrink-0 text-sm md:text-base">
                                ✓
                            </div>
                            <span className="text-[#5D4037] font-bold text-sm md:text-lg landscape:text-xs">{reason}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Floating Cat outside the frame */}
            <motion.div
                className="absolute bottom-10 right-10 opacity-30 pointer-events-none"
                animate={{ x: [0, 30, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
            >
                <CuteCat />
            </motion.div>
        </div>
    );
}
