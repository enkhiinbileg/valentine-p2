'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ValentineHeroProps {
    onYes: () => void;
    onNo: () => void;
    partnerName?: string;
    creatorName?: string;
}

// Panda Bear Couple (Bubu & Dudu) sticker
function PandaCouple() {
    return (
        <div className="relative transform hover:scale-105 transition-transform duration-300">
            <Image
                src="/panda-couple.png"
                alt="Панда хос"
                width={400}
                height={350}
                className="drop-shadow-2xl"
                priority
            />
        </div>
    );
}

// Calendar app icon replacement - Enlarged
function Calendar() {
    return (
        <div className="relative rotate-[8deg] drop-shadow-xl">
            <Image
                src="/calendar.png"
                alt="Календарь"
                width={200}
                height={200}
                className="drop-shadow-lg"
            />
        </div>
    );
}

// Paper Airplane with Heart-Shaped Dotted Trail - Enlarged
function PaperAirplaneWithTrail() {
    return (
        <div className="relative">
            <motion.div
                className="absolute z-20"
                initial={{ x: 0, y: 0 }}
                animate={{
                    x: [0, 15, 0],
                    y: [0, -15, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
                <svg width="150" height="120" viewBox="0 0 100 80">
                    <path d="M10 50 L90 20 L50 65 L45 85 L60 70 Z" fill="#F09393" stroke="#333" strokeWidth="2" />
                </svg>
            </motion.div>

            {/* Dotted Heart Trail */}
            <svg width="350" height="200" viewBox="0 0 250 150" className="absolute left-[100px] bottom-[-60px] pointer-events-none opacity-40">
                <path
                    d="M10 120 C40 120, 40 40, 80 40 C120 40, 120 120, 80 120 C40 120, 40 40, 10 40"
                    fill="none"
                    stroke="#333"
                    strokeWidth="3"
                    strokeDasharray="8 8"
                />

                {/* Heart image at the end of trail (Pixel Heart) - Enlarged */}
                <foreignObject x="110" y="70" width="120" height="120">
                    <div className="rotate-[15deg] drop-shadow-md">
                        <Image
                            src="/pixel-heart.png"
                            alt="Пиксель зүрх"
                            width={110}
                            height={110}
                        />
                    </div>
                </foreignObject>
            </svg>
        </div>
    );
}

// Heart Chocolate Box replacement with Pixel Heart image - Enlarged
function ChocolateBox() {
    return (
        <div className="relative drop-shadow-2xl rotate-[-5deg] hover:rotate-[0deg] transition-all duration-300">
            <Image
                src="/pixel-heart.png"
                alt="Пиксель зүрх"
                width={180}
                height={180}
                className="drop-shadow-xl"
            />
        </div>
    );
}

export default function ValentineHero({ onYes, onNo, partnerName, creatorName }: ValentineHeroProps) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 relative overflow-hidden bg-[#FFC5DE] font-fredoka">

            {/* Hanging Heart Strings - 3 total on the left side - Enlarged */}
            <div className="absolute top-0 left-12 flex gap-12 pointer-events-none p-4">
                {[
                    [80, 180, 280, 400],
                    [60, 160, 320],
                    [100, 220, 340]
                ].map((lengths, colIdx) => (
                    <div key={colIdx} className="flex flex-col items-center">
                        <div className="w-1 bg-[#D32F2F] h-6"></div>
                        {lengths.map((len, heartIdx) => (
                            <div key={heartIdx} className="flex flex-col items-center">
                                <span className="text-4xl filter drop-shadow-md">❤️</span>
                                <div className="w-1 bg-[#D32F2F]" style={{ height: `${len / 4}px` }}></div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Calendar - Top Right */}
            <div className="absolute top-10 right-10">
                <Calendar />
            </div>

            {/* Main Character Illustration - Panda Bears */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-8 z-10"
            >
                <PandaCouple />
            </motion.div>

            {/* Headline matching screenshot layout/color */}
            <div className="mb-14 z-10">
                <h1 className="text-4xl md:text-[58px] font-bold text-[#A52A2A] leading-[1.1] tracking-tight drop-shadow-sm">
                    Сайн уу {partnerName ? `, ${partnerName}` : ''},
                    <br />
                    <span className="text-5xl md:text-[68px]">Миний Валентин болох уу?</span>
                </h1>
                {creatorName && (
                    <p className="mt-4 text-2xl text-[#D32F2F] font-bold">хайрт {creatorName}-аас нь ❤️</p>
                )}
            </div>

            {/* Buttons matching pill-shape and black offset shadow */}
            <div className="flex flex-col md:flex-row gap-12 items-center justify-center z-20 w-full max-w-4xl px-4">
                <motion.button
                    whileHover={{ scale: 1.05, translateY: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onYes}
                    className="w-full md:w-[360px] py-5 bg-[#F09393] text-black font-bold text-3xl rounded-full border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] uppercase transition-all"
                >
                    Тийм ээ, мэдээж
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05, translateY: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNo}
                    className="w-full md:w-[360px] py-5 bg-[#F09393] text-black font-bold text-3xl rounded-full border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] uppercase transition-all"
                >
                    Үгүй ээ, баярлалаа
                </motion.button>
            </div>

            {/* Paper Airplane - Bottom Left */}
            <div className="absolute bottom-20 left-16">
                <PaperAirplaneWithTrail />
            </div>

            {/* Chocolate Box - Bottom Right */}
            <div className="absolute bottom-24 right-20">
                <ChocolateBox />
            </div>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&display=swap');
                .font-fredoka { font-family: 'Fredoka', sans-serif; }
            `}</style>
        </div>
    );
}
