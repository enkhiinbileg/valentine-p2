'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Scalloped Frame Component
function ScallopedFrame({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative p-12">
            {/* SVG Scalloped Border background */}
            <div className="absolute inset-0 z-0">
                <svg width="100%" height="100%" viewBox="0 0 400 500" preserveAspectRatio="none">
                    <path
                        d="M20,50 Q20,20 50,20 Q80,20 110,20 Q140,20 170,20 Q200,20 230,20 Q260,20 290,20 Q320,20 350,20 Q380,20 380,50 
                           Q380,80 380,110 Q380,140 380,170 Q380,200 380,230 Q380,260 380,290 Q380,320 380,350 Q380,380 380,410 Q380,440 380,470 
                           Q380,500 350,500 Q320,500 290,500 Q260,500 230,500 Q200,500 170,500 Q140,500 110,500 Q80,500 50,500 Q20,500 20,470 
                           Q20,440 20,410 Q20,380 20,350 Q20,320 20,290 Q20,260 20,230 Q20,200 20,170 Q20,140 20,110 Q20,80 20,50 Z"
                        fill="#FFE4E9"
                        stroke="#F48FB1"
                        strokeWidth="8"
                    />
                </svg>
            </div>
            {/* The white inner box */}
            <div className="relative z-10 bg-white p-4 rounded-lg shadow-sm flex items-center justify-center min-w-[300px] min-h-[380px]">
                {children}
            </div>
        </div>
    );
}

interface BouquetSectionProps {
    onNext?: () => void;
}

export default function BouquetSection({ onNext }: BouquetSectionProps) {
    return (
        <div className="w-full min-h-screen py-16 px-4 relative flex flex-col items-center justify-center overflow-hidden"
            style={{ backgroundColor: '#FF6B6B' }}>

            {/* Hanging Hearts */}
            <div className="absolute top-0 left-0 md:left-12 flex gap-4 pointer-events-none">
                {[
                    [40, 80, 120],
                    [60, 140],
                    [30, 90, 160, 210],
                    [50, 110]
                ].map((lengths, colIdx) => (
                    <div key={colIdx} className="flex flex-col items-center">
                        <div className="w-0.5 bg-black/20 h-6"></div>
                        {lengths.map((len, heartIdx) => (
                            <div key={heartIdx} className="flex flex-col items-center">
                                <motion.span
                                    className="text-2xl drop-shadow-md"
                                    animate={{ y: [0, 5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: colIdx * 0.2 + heartIdx * 0.1 }}
                                >
                                    ❤️
                                </motion.span>
                                <div className="w-0.5 bg-black/20" style={{ height: `${len / 4}px` }}></div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Title */}
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-12 font-heading tracking-tight drop-shadow-lg">
                Чамдаа зориулсан цэцэгс
            </h2>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 max-w-7xl mx-auto w-full relative z-10">
                {/* Left Message Bubbles */}
                <div className="flex flex-col gap-24 w-full lg:w-80">
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-[40px] p-8 shadow-[0_0_25px_rgba(255,105,180,0.6)] border-none"
                        >
                            <p className="text-[#212121] text-2xl font-bold text-center leading-tight">
                                Юу ч болсон би чамайг үргэлж хайрлах болно
                            </p>
                        </motion.div>
                    </div>

                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-[40px] p-8 shadow-[0_0_25px_rgba(255,105,180,0.6)] border-none"
                        >
                            <p className="text-[#212121] text-2xl font-bold text-center leading-tight">
                                Чи бол миний амьдралын хамгийн сайн хэсэг
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Center Scalloped Frame with Real Roses Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="relative"
                >
                    <ScallopedFrame>
                        <div className="relative w-80 h-[340px]">
                            <Image
                                src="/bouquet.png"
                                alt="Сарнайн баглаа"
                                fill
                                style={{ objectFit: 'contain' }}
                                className="drop-shadow-2xl"
                                priority
                            />
                        </div>
                    </ScallopedFrame>
                </motion.div>

                {/* Right Message Bubbles & Airplane */}
                <div className="flex flex-col gap-24 w-full lg:w-80 relative">
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-[40px] p-8 shadow-[0_0_25px_rgba(255,105,180,0.6)] border-none"
                        >
                            <p className="text-[#212121] text-2xl font-bold text-center leading-tight">
                                Чи үүрд миний цор ганц сонголт байх болно.
                            </p>
                        </motion.div>
                    </div>

                    {/* Paper Airplane */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="absolute -right-32 top-1/2 -translate-y-1/2 pointer-events-none"
                    >
                        <motion.div
                            animate={{
                                x: [0, 20, 0],
                                y: [0, -40, 0],
                                rotate: [0, -10, 0]
                            }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="relative">
                                <span className="text-[120px] transform -rotate-[60deg] block opacity-90 drop-shadow-xl" style={{ color: '#FFE4E9' }}>
                                    ✈️
                                </span>
                                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-red-600">❤️</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    <div className="relative mt-12">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-[40px] p-8 shadow-[0_0_25px_rgba(255,105,180,0.6)] border-none"
                        >
                            <p className="text-[#212121] text-2xl font-bold text-center leading-tight">
                                Чамгүйгээр амьдралыг төсөөлж ч чадахгүй нь
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Red Circular Nav Button */}
            <motion.div
                className="absolute bottom-16 right-16 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onNext}
            >
                <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-red-700">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </div>
            </motion.div>
        </div>
    );
}
