'use client';
import { motion } from 'framer-motion';

interface HeartListSectionProps {
    items?: string[];
}

export default function HeartListSection({ items }: HeartListSectionProps) {
    const listItems = items && items.length > 0 ? items : [
        "Намайг гунигтай үед чи намайг үргэлж инээлгэж чаддаг.",
        "Чиний тэврэлт бол дэлхий дээрх хамгийн аюулгүй газар.",
        "Намайг хараагүй гэж бодохдоо над руу харах харцанд чинь би хайртай.",
        "Чи бол миний хамгийн том дэмжигч бас миний хамгийн сайн найз.",
        "Миний тухай жижиг деталь бүрийг санаж байдагт чинь.",
        "Хайртай зүйлийнхээ төлөөх чиний тэмүүлэлд."
    ];

    return (
        <div className="w-full min-h-screen py-20 px-4 relative bg-[#FFC5D3] flex flex-col items-center justify-center paper-texture">
            {/* Title */}
            <motion.h2
                className="text-5xl md:text-6xl font-bold text-[#5D4037] mb-12 font-heading text-center px-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
            >
                Бидний тухай надад таалагддаг зүйлс
            </motion.h2>

            {/* Notebook Paper with Spiral Binding */}
            <div className="w-full max-w-2xl bg-white shadow-2xl relative rounded-sm group">
                {/* Spiral Binding at the top */}
                <div className="absolute -top-6 left-0 right-0 flex justify-center gap-4 px-10">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <div className="w-2 h-10 bg-slate-300 rounded-full shadow-inner"></div>
                            <div className="w-4 h-4 rounded-full bg-slate-400 -mt-2 shadow-md"></div>
                        </div>
                    ))}
                </div>

                <div className="p-12 md:p-16 relative">
                    {/* Red margin line */}
                    <div className="absolute top-0 left-12 h-full w-0.5 bg-red-200"></div>

                    {/* The List */}
                    <div className="space-y-10 relative z-10">
                        {listItems.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-4"
                            >
                                <span className="text-3xl mt-1">❤️</span>
                                <p className="text-[#5D4037] text-2xl font-handwriting leading-relaxed border-b border-blue-100 w-full pb-2">
                                    {item}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Paper Curl effect at bottom right */}
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-slate-200 to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-0 right-0 w-12 h-12 bg-white shadow-[-5px_-5px_10px_rgba(0,0,0,0.05)] border-t border-l border-slate-100"></div>
                </div>
            </div>

            {/* Floating background hearts */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(12)].map((_, i) => (
                    <motion.span
                        key={i}
                        className="absolute text-pink-300/30"
                        style={{
                            left: `${(i * 17) % 100}%`,
                            top: `${(i * 23) % 100}%`,
                            fontSize: `${20 + (i % 5) * 10}px`
                        }}
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0]
                        }}
                        transition={{ duration: 3 + i, repeat: Infinity }}
                    >
                        ❤️
                    </motion.span>
                ))}
            </div>
        </div>
    );
}
