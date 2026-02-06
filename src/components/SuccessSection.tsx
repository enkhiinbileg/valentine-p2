'use client';
import { useState, useCallback, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import BouquetSection from '@/components/BouquetSection';
import LetterSection from '@/components/LetterSection';
import SongSection from '@/components/SongSection';
import PhotoFrameSection from '@/components/PhotoFrameSection';
import HeartListSection from '@/components/HeartListSection';
import Image from 'next/image';

// Happy character from the top left of the screenshot (Tonton Friends GIF)


function HappyHeart() {
    return (
        <div className="relative">
            <Image
                src="/download (1).gif"
                alt="Gift Bunny"
                width={250}
                height={250}
                className="drop-shadow-2xl rounded-2xl mix-blend-multiply"
                unoptimized
            />
        </div>
    );
}

// Heart Firework replacement (Lovely Sticker GIF)
function HeartFirework() {
    return (
        <div className="relative">
            <Image
                src="/Post by @lovelysticker · 8 images.gif"
                alt="Heart Decoration"
                width={350}
                height={350}
                className="drop-shadow-xl mix-blend-multiply"
                unoptimized
            />
        </div>
    );
}

// Mailbox Decoration replacement (Bubududu Panda GIF)
function Mailbox() {
    return (
        <div className="relative">
            <Image
                src="/download (3).gif"
                alt="Right Decoration"
                width={350}
                height={350}
                className="drop-shadow-xl mix-blend-multiply"
                unoptimized
            />
        </div>
    );
}

interface SuccessSectionProps {
    data?: any;
}

export default function SuccessSection({ data }: SuccessSectionProps) {
    const [showBackBtn, setShowBackBtn] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackBtn(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const fireConfetti = useCallback(() => {
        const duration = 5000;
        const animationEnd = Date.now() + duration;
        const colors = ['#E74C3C', '#FF69B4', '#FFB6C1', '#FF1493'];

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                particleCount,
                startVelocity: 30,
                spread: 100,
                origin: { x: randomInRange(0.1, 0.3), y: 0.6 },
                colors,
            });
            confetti({
                particleCount,
                startVelocity: 30,
                spread: 100,
                origin: { x: randomInRange(0.7, 0.9), y: 0.6 },
                colors,
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        fireConfetti();
    }, [fireConfetti]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-[#FFC5DE] font-fredoka">
            {/* Floating Back Button */}
            <AnimatePresence>
                {showBackBtn && (
                    <motion.button
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="fixed bottom-8 right-8 z-50 px-6 py-3 bg-[#D32F2F] text-white rounded-full font-bold shadow-2xl border-2 border-white flex items-center gap-2"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Буцах 🔙
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Header Section */}
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 relative">
                {/* ... existing header logic ... */}

                {/* Main Text Content */}
                <div className="mb-16 z-10 max-w-4xl px-4">
                    <motion.h1
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-4xl md:text-6xl font-bold text-[#D32F2F] mb-6 leading-tight"
                    >
                        Тийм гэж хэлсэнд чинь баярлалаа{data?.partner_name ? `, ${data.partner_name}` : ''}!
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg md:text-2xl text-[#6D4C41] font-bold leading-relaxed"
                    >
                        {data?.creator_name ? `${data.creator_name}-аас нь` : 'Чамдаа'} зориулж бэлдсэн энэ бүхэн миний хайрын өчүүхэн хэсэг нь шүү ✨
                    </motion.p>
                </div>

                {/* 3 Gift Card Buttons ... existing logic ... */}
                <div className="flex flex-wrap gap-8 justify-center items-center z-10">
                    {[
                        { id: 'gift1', label: 'Бэлэг 1' },
                        { id: 'gift2', label: 'Бэлэг 2' },
                        { id: 'gift3', label: 'Бэлэг 3' }
                    ].map((gift, i) => (
                        <motion.button
                            key={gift.id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 + i * 0.15 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => scrollToSection(gift.id)}
                            className="w-[200px] h-[140px] bg-[#F4978E] border-[4px] border-[#8D0000] rounded-[30px] flex items-center justify-center text-white text-3xl font-bold underline decoration-white/40"
                        >
                            {gift.label}
                        </motion.button>
                    ))}
                </div>

                {/* ... existing decorations ... */}
                {/* Bottom Left Decoration */}
                <div className="absolute bottom-10 left-10 opacity-80 pointer-events-none">
                    <HeartFirework />
                </div>

                {/* Bottom Right Decoration */}
                <div className="absolute bottom-10 right-10 opacity-90 pointer-events-none">
                    <Mailbox />
                </div>
            </div>

            {/* Content Sections */}
            <div id="gift1" className="relative">
                <BouquetSection onNext={() => scrollToSection('letter')} />
                <div id="letter">
                    <LetterSection content={data?.letter_content} />
                </div>
                <div className="flex justify-center pb-12">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="px-8 py-3 bg-white/50 backdrop-blur-sm border-2 border-[#D32F2F] text-[#D32F2F] rounded-full font-bold shadow-lg"
                    >
                        Буцах 🔙
                    </motion.button>
                </div>
            </div>

            <div id="gift2" className="relative">
                <PhotoFrameSection photoUrl={data?.photo_url} reasons={data?.reasons} />
                <HeartListSection items={data?.about_us} />
                <div className="flex justify-center pb-12 bg-[#FFC5D3]">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="px-8 py-3 bg-white/50 backdrop-blur-sm border-2 border-[#D32F2F] text-[#D32F2F] rounded-full font-bold shadow-lg"
                    >
                        Буцах 🔙
                    </motion.button>
                </div>
            </div>

            <div id="gift3" className="relative">
                <SongSection songUrl={data?.song_url} />
                <div className="flex justify-center pb-20">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="px-12 py-4 bg-white/50 backdrop-blur-sm border-2 border-[#D32F2F] text-[#D32F2F] rounded-full font-bold shadow-lg text-xl"
                    >
                        Буцах 🔙
                    </motion.button>
                </div>
            </div>

            {/* ... styles ... */}


            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&display=swap');
                .font-fredoka { font-family: 'Fredoka', sans-serif; }
            `}</style>
        </div>
    );
}
