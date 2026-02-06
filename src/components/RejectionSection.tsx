'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface RejectionSectionProps {
    onRetry: () => void;
}

export default function RejectionSection({ onRetry }: RejectionSectionProps) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 relative overflow-hidden bg-[#FFC5DE] font-fredoka">

            {/* Hanging Broken Hearts Decorations */}
            <div className="absolute top-0 left-12 flex gap-12 pointer-events-none p-4">
                {[
                    [120, 240],
                    [80, 200],
                    [160, 280]
                ].map((lengths, colIdx) => (
                    <div key={colIdx} className="flex flex-col items-center">
                        <div className="w-1 bg-[#8B4513]/20 h-8"></div>
                        {lengths.map((len, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                                <span className="text-3xl filter grayscale opacity-30 drop-shadow-md">💔</span>
                                <div className="w-1 bg-[#8B4513]/20" style={{ height: `${len / 4}px` }}></div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Main Character - Using the specified GIF */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12 z-10"
            >
                <Image
                    src="/Tkthao219 Tooji Sticker - Tkthao219 Tooji Peach - Discover & Share GIFs.gif"
                    alt="Sad Heart Character"
                    width={320}
                    height={320}
                    className="drop-shadow-2xl rounded-2xl"
                    priority
                    unoptimized // For GIFs
                />
            </motion.div>

            {/* Title - Mongolian translation in a rounded brown style */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-14 z-10"
            >
                <h2 className="text-4xl md:text-[52px] font-bold text-[#6B0D0D] leading-tight tracking-tight">
                    Дахиад нэг оролдоорой :(
                </h2>
            </motion.div>

            {/* Retry Button - Pill shape with black offset shadow */}
            <motion.button
                whileHover={{ scale: 1.05, translateY: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={onRetry}
                className="z-20 w-full max-w-[340px] py-5 bg-[#F09393] text-black font-bold text-3xl rounded-full border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] uppercase transition-all"
            >
                Дахин оролдох
            </motion.button>

            {/* Floating background broken hearts */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <motion.span
                        key={i}
                        className="absolute text-4xl opacity-5"
                        style={{
                            left: `${(i * 15 + 10) % 100}%`,
                            top: `${(i * 20 + 20) % 100}%`
                        }}
                        animate={{
                            y: [0, -30, 0],
                            rotate: [-15, 15, -15],
                            opacity: [0.05, 0.1, 0.05]
                        }}
                        transition={{
                            duration: 5 + i,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        💔
                    </motion.span>
                ))}
            </div>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&display=swap');
                .font-fredoka { font-family: 'Fredoka', sans-serif; }
            `}</style>
        </div>
    );
}
