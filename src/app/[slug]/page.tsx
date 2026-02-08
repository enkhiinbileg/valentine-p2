'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import ValentineHero from '@/components/ValentineHero';
import RejectionSection from '@/components/RejectionSection';
import SuccessSection from '@/components/SuccessSection';

type PageState = 'hero' | 'rejection' | 'success';

export default function DynamicValentinePage() {
    const { slug } = useParams();
    const [state, setState] = useState<PageState>('hero');
    const [cardData, setCardData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCard() {
            if (!slug) return;

            const { data, error } = await supabase
                .from('valentine_cards')
                .select('*')
                .eq('slug', slug)
                .single();

            if (error) {
                console.error('Error fetching card:', error);
            } else {
                setCardData(data);
            }
            setLoading(false);
        }

        fetchCard();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FFC5DE] flex items-center justify-center font-fredoka">
                <div className="text-2xl text-[#D32F2F] font-bold animate-pulse">Түр хүлээнэ үү... ❤️</div>
            </div>
        );
    }

    if (!cardData) {
        return (
            <div className="min-h-screen bg-[#FFC5DE] flex flex-col items-center justify-center font-fredoka p-6">
                <h1 className="text-4xl font-bold text-[#D32F2F] mb-4">Уучлаарай! 💔</h1>
                <p className="text-xl text-[#6D4C41]">Энэ карт олдсонгүй эсвэл устгагдсан байна.</p>
            </div>
        );
    }

    if (!cardData.is_paid) {
        return (
            <div className="min-h-screen bg-[#FFC5DE] flex flex-col items-center justify-center font-fredoka p-6 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center"
                >
                    <div className="text-7xl mb-6 animate-pulse">💝</div>
                    <h1 className="text-3xl md:text-4xl font-bold text-[#D32F2F] mb-4">Түр хүлээнэ үү...</h1>
                    <p className="text-lg text-[#6D4C41] max-w-md leading-relaxed">
                        Энэхүү валентины карт баталгаажуулалтын шатанд байна. Төлбөр төлөгдсөний дараа идэвхжих болно. ✨
                    </p>
                    <div className="mt-10 p-6 bg-white/40 rounded-[30px] backdrop-blur-md border-2 border-white/60 shadow-xl">
                        <p className="text-pink-600 font-bold">Хэрэв та төлбөрөө төлсөн бол 5-10 минутын дараа дахин шалгаарай.</p>
                    </div>
                </motion.div>
            </div>
        );
    }

    const handleYes = () => {
        setState('success');
    };

    const handleNo = () => {
        setState('rejection');
    };

    const handleRetry = () => {
        setState('hero');
    };

    return (
        <main className="min-h-screen">
            {cardData.song_url && (
                <audio
                    src={cardData.song_url}
                    autoPlay
                    loop
                    className="hidden"
                    id="bg-music"
                />
            )}
            {state === 'hero' && (
                <ValentineHero
                    onYes={() => {
                        const audio = document.getElementById('bg-music') as HTMLAudioElement;
                        if (audio) audio.play().catch(() => { });
                        handleYes();
                    }}
                    onNo={() => {
                        const audio = document.getElementById('bg-music') as HTMLAudioElement;
                        if (audio) audio.play().catch(() => { });
                        handleNo();
                    }}
                    creatorName={cardData.creator_name}
                    partnerName={cardData.partner_name}
                />
            )}
            {state === 'rejection' && (
                <RejectionSection onRetry={handleRetry} />
            )}
            {state === 'success' && (
                <SuccessSection data={cardData} />
            )}
        </main>
    );
}
