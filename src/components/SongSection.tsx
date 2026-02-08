'use client';
import { motion } from 'framer-motion';
import { FaSpotify } from 'react-icons/fa';

// Vintage Retro Laptop SVG
function RetroLaptop() {
    return (
        <svg width="240" height="200" viewBox="0 0 120 100" className="drop-shadow-2xl">
            {/* Screen part */}
            <rect x="10" y="5" width="100" height="70" rx="3" fill="#D2B48C" stroke="#8B4513" strokeWidth="2" />
            <rect x="15" y="10" width="90" height="60" rx="1" fill="#FFF0F5" />

            {/* Keyboard part (Base) */}
            <path d="M5 75 L115 75 L120 95 L0 95 Z" fill="#D2B48C" stroke="#8B4513" strokeWidth="2" />

            {/* Details on screen - A heart */}
            <motion.path
                d="M60 40 C55 35, 45 35, 45 42 C45 50, 60 58, 60 58 C60 58, 75 50, 75 42 C75 35, 65 35, 60 40"
                fill="#FF1493"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            />

            {/* Key details */}
            <line x1="20" y1="82" x2="100" y2="82" stroke="#8B4513" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="20" y1="88" x2="100" y2="88" stroke="#8B4513" strokeWidth="1" strokeDasharray="3 2" />
        </svg>
    );
}

interface SongSectionProps {
    songUrl?: string;
}

export default function SongSection({ songUrl }: SongSectionProps) {
    return (
        <div className="w-full min-h-screen py-12 md:py-24 px-4 relative bg-[#FFD180] flex flex-col items-center justify-center overflow-hidden landscape:py-6">
            {/* ... Floating Music Notes ... */}

            <motion.h2
                className="text-3xl md:text-6xl font-bold text-[#5D4037] mb-8 md:mb-16 font-heading text-center landscape:text-2xl landscape:mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
            >
                Бидний дуртай дуу
            </motion.h2>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 max-w-6xl mx-auto w-full landscape:flex-row landscape:gap-4">
                {/* Vinyl Record Spinning */}
                <motion.div
                    className="relative group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                >
                    {/* Vinyl Outer */}
                    <motion.div
                        className="w-48 h-48 md:w-64 md:h-64 bg-[#1a1a1a] rounded-full border-[10px] border-[#333] relative flex items-center justify-center landscape:w-40 landscape:h-40"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                        {/* Vinyl Rings */}
                        <div className="absolute inset-4 border border-white/10 rounded-full"></div>
                        <div className="absolute inset-10 border border-white/10 rounded-full"></div>
                        <div className="absolute inset-16 border border-white/10 rounded-full"></div>

                        {/* Center Label */}
                        <div className="w-24 h-24 bg-pink-400 rounded-full flex items-center justify-center border-4 border-black">
                            <span className="text-white text-4xl">❤️</span>
                        </div>
                    </motion.div>

                    {/* The Needle/Arm */}
                    <div className="absolute -top-10 -right-10 w-4 h-32 md:h-40 bg-[#8B4513] origin-top rounded-full transform rotate-[30deg] z-20 landscape:scale-75">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#333] rounded-sm"></div>
                    </div>
                </motion.div>

                {/* Laptop & Song Info */}
                <div className="flex flex-col items-center gap-4 md:gap-8 landscape:scale-75">
                    <RetroLaptop />

                    <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl flex flex-col items-center gap-4 w-80 border-2 border-pink-100">
                        {songUrl ? (
                            <>
                                <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center text-white text-3xl shadow-lg animate-pulse">
                                    <FaSpotify />
                                </div>
                                <div className="text-center">
                                    <p className="text-[#5D4037] font-bold text-xl">Танд зориулсан дуу</p>
                                    <p className="text-[#5D4037]/60 text-sm">Хөгжим эгшиглэж байна... ✨</p>
                                </div>
                                <div className="w-full flex justify-center mt-2">
                                    <div className="flex gap-1 items-end h-6">
                                        {[...Array(5)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="w-1 bg-pink-500 rounded-full"
                                                animate={{ height: [8, 24, 8] }}
                                                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center gap-6 w-full">
                                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-3xl shadow-lg">
                                        <FaSpotify />
                                    </div>
                                    <div>
                                        <p className="text-[#5D4037] font-bold text-xl">Lover</p>
                                        <p className="text-[#5D4037]/60">Taylor Swift</p>
                                    </div>
                                </div>
                                <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-green-500"
                                        animate={{ width: ['0%', '100%'] }}
                                        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    {!songUrl && (
                        <div className="flex items-center gap-4 group cursor-pointer">
                            <span className="text-[#5D4037] font-bold italic group-hover:underline">Spotify дээр нээх</span>
                            <div className="w-10 h-10 bg-[#E74C3C] rounded-full flex items-center justify-center shadow-md">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>
                    )}
                </div>

                {/* Heart QR Code */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="relative landscape:scale-75"
                >
                    <div className="bg-white p-6 rounded-3xl shadow-2xl relative overflow-hidden">
                        {/* Heart Shape Border for "QR" */}
                        <div className="w-48 h-48 bg-[#FFC5D3] relative flex items-center justify-center p-4">
                            <div className="w-full h-full relative">
                                {/* Simulated QR modules in a heart shape */}
                                <svg width="100%" height="100%" viewBox="0 0 100 100">
                                    <path d="M50 30 C45 20, 30 20, 30 35 C30 50, 50 65, 50 65 C50 65, 70 50, 70 35 C70 20, 55 20, 50 30" fill="#3D2B1F" opacity="0.1" />
                                    {/* Simulated dots - fixed pattern to avoid hydration mismatch */}
                                    {[...Array(60)].map((_, i) => {
                                        const isFilled = (i * 13) % 7 > 2; // Deterministic pattern
                                        return (
                                            <rect
                                                key={i}
                                                x={(i % 8) * 12 + 5}
                                                y={Math.floor(i / 8) * 12 + 5}
                                                width="8"
                                                height="8"
                                                fill={isFilled ? "#3D2B1F" : "transparent"}
                                                rx="2"
                                            />
                                        );
                                    })}
                                    {/* Finder patterns */}
                                    <rect x="5" y="5" width="24" height="24" fill="none" stroke="#E74C3C" strokeWidth="4" rx="4" />
                                    <rect x="5" y="71" width="24" height="24" fill="none" stroke="#E74C3C" strokeWidth="4" rx="4" />
                                    <rect x="71" y="5" width="24" height="24" fill="none" stroke="#E74C3C" strokeWidth="4" rx="4" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-center mt-4 text-[#5D4037] font-bold">Сонсохын тулд уншуулна уу</p>
                    </div>
                    {/* Decorative Note emojis */}
                    <motion.span
                        className="absolute -top-6 -right-6 text-4xl"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        🎶
                    </motion.span>
                </motion.div>
            </div>

            <p className="mt-20 text-[#5D4037] font-bold italic opacity-60">"Миний зүрх зээлэгдсэн, чинийх минь гунигтай байсан..."</p>
        </div >
    );
}
