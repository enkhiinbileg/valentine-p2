'use client';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';

interface HeartQRCodeProps {
    url: string;
    size?: number;
}

export default function HeartQRCode({ url, size = 200 }: HeartQRCodeProps) {
    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative p-6 bg-white rounded-[40px] shadow-xl inline-block border-4 border-pink-100"
        >
            <QRCodeSVG
                value={url}
                size={size}
                level="H" // High error correction to allow for a larger center logo
                includeMargin={false}
                imageSettings={{
                    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50 88.9L16.7 55.6C7.1 46 7.1 30.4 16.7 20.8 26.3 11.2 41.9 11.2 51.5 20.8L50 22.3l-1.5-1.5c9.6-9.6 25.2-9.6 34.8 0 9.6 9.6 9.6 25.2 0 34.8L50 88.9z' fill='%23D32F2F'/%3E%3C/svg%3E",
                    x: undefined,
                    y: undefined,
                    height: size * 0.25,
                    width: size * 0.25,
                    excavate: true,
                }}
                // The reference has red finders and peach dots. 
                // QRCodeSVG applies fgColor to everything. 
                // We'll use the peach color for fgColor.
                fgColor="#F4978E"
                bgColor="#FFFFFF"
            />

            {/* Decorative Hearts in corners to mimic the red finders look partially */}
            <div className="absolute top-2 left-2 text-red-600 text-xs">❤️</div>
            <div className="absolute top-2 right-2 text-red-600 text-xs">❤️</div>
            <div className="absolute bottom-2 left-2 text-red-600 text-xs">❤️</div>
            <div className="absolute bottom-2 right-2 text-red-600 text-xs">❤️</div>
        </motion.div>
    );
}
