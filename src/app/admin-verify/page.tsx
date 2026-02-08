'use client';
import { useState, useEffect } from 'react';
import { getAllCards, activateCard, checkPassword } from '@/app/actions/admin';

export default function AdminVerifyPage() {
    const [cards, setCards] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState('');
    const [verifying, setVerifying] = useState(false);

    useEffect(() => {
        // Check if password was saved before
        const savedPassword = localStorage.getItem('admin_password');
        if (savedPassword) {
            autoLogin(savedPassword);
        }
    }, []);

    const autoLogin = async (pass: string) => {
        setVerifying(true);
        const result = await checkPassword(pass);
        if (result.success) {
            setIsLoggedIn(true);
            fetchCards();
        } else {
            localStorage.removeItem('admin_password'); // Clear if invalid
        }
        setVerifying(false);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setVerifying(true);
        setError(null);

        const result = await checkPassword(password);
        if (result.success) {
            localStorage.setItem('admin_password', password); // Save for next time
            setIsLoggedIn(true);
            fetchCards();
        } else {
            setError(result.error || 'Нууц үг буруу байна');
        }
        setVerifying(false);
    };

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        setLoading(true);
        const result = await getAllCards();
        if (result.success) {
            setCards(result.data || []);
        } else {
            setError(result.error || 'Failed to fetch cards');
        }
        setLoading(false);
    };

    const handleActivate = async (slug: string) => {
        if (!confirm(`Are you sure you want to activate card: ${slug}?`)) return;

        const result = await activateCard(slug);
        if (result.success) {
            alert('Амжилттай идэвхжлээ! ✅');
            fetchCards(); // Refresh list
        } else {
            alert('Алдаа гарлаа: ' + result.error);
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FFC5DE] p-6">
                <div className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-[40px] shadow-2xl border-4 border-white w-full max-w-md text-center">
                    <div className="text-6xl mb-6">🔒</div>
                    <h1 className="text-3xl font-bold text-[#D32F2F] mb-6">Админ Нэвтрэх</h1>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Нууц үг оруулна уу"
                                className="w-full p-4 rounded-2xl border-2 border-pink-200 focus:border-pink-500 outline-none transition-colors text-center text-lg"
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 font-bold">{error}</p>}
                        <button
                            type="submit"
                            disabled={verifying}
                            className="w-full py-4 bg-[#F4978E] text-white rounded-2xl text-xl font-bold shadow-lg hover:bg-[#eb8a81] transition-colors disabled:opacity-50"
                        >
                            {verifying ? 'Шалгаж байна...' : 'Нэвтрэх 🚀'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-xl font-bold text-gray-400 animate-pulse">Уншиж байна...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100">
                    <div className="bg-[#D32F2F] p-8 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-extrabold text-white">Админ: Төлбөр Баталгаажуулах</h1>
                            <p className="mt-2 text-red-100">Бүх картуудын жагсаалт болон төлбөрийн төлөв.</p>
                        </div>
                        <button
                            onClick={() => {
                                localStorage.removeItem('admin_password');
                                setIsLoggedIn(false);
                            }}
                            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl font-bold transition-colors"
                        >
                            Гарах 🚪
                        </button>
                    </div>

                    <div className="p-8">
                        {error && (
                            <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-4">
                                <p className="text-red-700">{error}</p>
                            </div>
                        )}

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-4 bg-gray-50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Огноо</th>
                                        <th className="px-6 py-4 bg-gray-50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Линк (Slug)</th>
                                        <th className="px-6 py-4 bg-gray-50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Хэнээс</th>
                                        <th className="px-6 py-4 bg-gray-50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Хэнд</th>
                                        <th className="px-6 py-4 bg-gray-50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Төлөв</th>
                                        <th className="px-6 py-4 bg-gray-50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Үйлдэл</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {cards.map((card) => (
                                        <tr key={card.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(card.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <a
                                                    href={`/${card.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-mono text-blue-600 hover:text-blue-800 underline"
                                                >
                                                    {card.slug}
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {card.creator_name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {card.partner_name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {card.is_paid ? (
                                                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-green-100 text-green-800">
                                                        ТӨЛӨГДӨӨД ӨӨ
                                                    </span>
                                                ) : (
                                                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-yellow-100 text-yellow-800">
                                                        ХҮЛЭЭГДЭЖ БУЙ
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                                {!card.is_paid && (
                                                    <button
                                                        onClick={() => handleActivate(card.slug)}
                                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-bold rounded-xl shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all hover:scale-105"
                                                    >
                                                        Идэвхжүүлэх ✅
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {cards.length === 0 && (
                            <div className="py-20 text-center">
                                <div className="text-5xl mb-4">📭</div>
                                <p className="text-gray-400 font-bold">Одоогоор ямар нэгэн карт үүсээгүй байна.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
