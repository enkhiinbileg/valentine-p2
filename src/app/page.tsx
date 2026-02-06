'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { nanoid } from 'nanoid';
import Image from 'next/image';
import { getPresignedUrl } from '@/app/actions/storage';
import HeartQRCode from '@/components/HeartQRCode';

export default function CreatorPage() {
  // ... existing states ...
  // (I will use multi_replace if needed, but for now I'll just fix the handlers)
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    creator_name: '',
    partner_name: '',
    letter_content: '',
    reasons: ['', '', ''],
    about_us: ['', '', ''],
    photo_url: '',
    song_url: '',
    theme_color: '#FFC5DE'
  });
  const [createdSlug, setCreatedSlug] = useState('');

  const handleCreate = async () => {
    setLoading(true);
    const slug = nanoid(10);

    const { error } = await supabase
      .from('valentine_cards')
      .insert([
        {
          ...formData,
          slug,
          reasons: formData.reasons.filter(r => r !== ''),
          about_us: formData.about_us.filter(r => r !== '')
        }
      ]);

    if (error) {
      alert('Алдаа гарлаа: ' + error.message);
    } else {
      setCreatedSlug(slug);
      setStep(4);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FFC5DE] font-fredoka flex flex-col items-center justify-center p-6 text-[#5D4037]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white/80 backdrop-blur-md rounded-[40px] p-8 md:p-12 shadow-2xl border-4 border-white"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#D32F2F] mb-2 font-heading">Валентин Карт Бүтээх</h1>
          <p className="text-lg opacity-80">Хайртай хүндээ зориулж өөрийн гэсэн вэб хуудас нээгээрэй ❤️</p>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-xl font-bold mb-2">Таны нэр:</label>
                <input
                  type="text"
                  value={formData.creator_name}
                  onChange={(e) => setFormData({ ...formData, creator_name: e.target.value })}
                  className="w-full p-4 rounded-2xl border-2 border-pink-200 focus:border-pink-500 outline-none transition-colors"
                  placeholder="Жишээ: Ану"
                />
              </div>
              <div>
                <label className="block text-xl font-bold mb-2">Хайртай хүний тань нэр:</label>
                <input
                  type="text"
                  value={formData.partner_name}
                  onChange={(e) => setFormData({ ...formData, partner_name: e.target.value })}
                  className="w-full p-4 rounded-2xl border-2 border-pink-200 focus:border-pink-500 outline-none transition-colors"
                  placeholder="Жишээ: Тэмүүжин"
                />
              </div>
              <button
                onClick={() => setStep(2)}
                className="w-full py-4 bg-[#F4978E] text-white rounded-2xl text-2xl font-bold shadow-lg hover:bg-[#eb8a81] transition-colors"
              >
                Дараах 🎀
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-xl font-bold mb-2">Хайрын захидал:</label>
                <textarea
                  value={formData.letter_content}
                  onChange={(e) => setFormData({ ...formData, letter_content: e.target.value })}
                  className="w-full p-4 rounded-2xl border-2 border-pink-200 focus:border-pink-500 outline-none h-40 resize-none transition-colors"
                  placeholder="Чамдаа хэлэхийг хүссэн үгс..."
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 bg-gray-200 rounded-2xl text-xl font-bold"
                >
                  Буцах
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-[2] py-4 bg-[#F4978E] text-white rounded-2xl text-2xl font-bold shadow-lg"
                >
                  Тал бүр... ✨
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <label className="block text-xl font-bold mb-2">Зураг ба Дуу (Заавал биш):</label>

                <div className="space-y-4">
                  <div className="p-4 border-2 border-dashed border-pink-200 rounded-2xl bg-pink-50/50">
                    <label className="block text-sm font-bold text-pink-600 mb-2">📸 Хамтдаа авахуулсан зураг:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        // Max 20MB for images
                        if (file.size > 20 * 1024 * 1024) {
                          alert('Зургийн хэмжээ хэтэрхий том байна (Дээд тал нь 20MB)');
                          return;
                        }

                        setLoading(true);

                        try {
                          // 1. Get presigned URL
                          const result = await getPresignedUrl(file.name, file.type, 'photos');

                          if (!result.success || !result.url) {
                            alert('Хуулах эрх авч чадсангүй: ' + result.error);
                            setLoading(false);
                            return;
                          }

                          // 2. Upload directly to R2
                          const uploadResponse = await fetch(result.url, {
                            method: 'PUT',
                            body: file,
                            headers: {
                              'Content-Type': file.type,
                            },
                          });

                          if (uploadResponse.ok) {
                            setFormData({ ...formData, photo_url: result.publicUrl });
                          } else {
                            const errorText = await uploadResponse.text();
                            console.error('R2 Direct Upload Error:', errorText);
                            alert('Зураг хуулахад алдаа гарлаа (S3 PUT failed)');
                          }
                        } catch (fetchError: any) {
                          console.error('Upload flow error:', fetchError);
                          alert('Сүлжээний алдаа гарлаа. Дахин оролдоно уу.');
                        }
                        setLoading(false);
                      }}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-100 file:text-pink-700 hover:file:bg-pink-200"
                    />
                    {formData.photo_url && <p className="mt-2 text-xs text-green-600 font-bold">✓ Зураг амжилттай хуулагдлаа</p>}
                  </div>

                  <div className="p-4 border-2 border-dashed border-pink-200 rounded-2xl bg-pink-50/50">
                    <label className="block text-sm font-bold text-pink-600 mb-2">🎵 Та хоёрын дуртай дуу (mp3):</label>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        // Max 100MB for songs (R2 limit is higher, but 100MB is safe for most explorers)
                        if (file.size > 100 * 1024 * 1024) {
                          alert('Дууны хэмжээ хэтэрхий том байна (Дээд тал нь 100MB)');
                          return;
                        }

                        setLoading(true);

                        try {
                          // 1. Get presigned URL
                          const result = await getPresignedUrl(file.name, file.type, 'songs');

                          if (!result.success || !result.url) {
                            alert('Хуулах эрх авч чадсангүй: ' + result.error);
                            setLoading(false);
                            return;
                          }

                          // 2. Upload directly to R2
                          const uploadResponse = await fetch(result.url, {
                            method: 'PUT',
                            body: file,
                            headers: {
                              'Content-Type': file.type,
                            },
                          });

                          if (uploadResponse.ok) {
                            setFormData({ ...formData, song_url: result.publicUrl });
                          } else {
                            const errorText = await uploadResponse.text();
                            console.error('R2 Audio Direct Upload Error:', errorText);
                            alert('Дуу хуулахад алдаа гарлаа (S3 PUT failed)');
                          }
                        } catch (fetchError: any) {
                          console.error('Song upload flow error:', fetchError);
                          alert('Сүлжээний алдаа гарлаа. Дахин оролдоно уу.');
                        }
                        setLoading(false);
                      }}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-100 file:text-pink-700 hover:file:bg-pink-200"
                    />
                    {formData.song_url && <p className="mt-2 text-xs text-green-600 font-bold">✓ Дуу амжилттай хуулагдлаа</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="block text-lg font-bold text-pink-600">✨ Хайртай байх 3 шалтгаан:</label>
                    {formData.reasons.map((reason, i) => (
                      <input
                        key={`reason-${i}`}
                        type="text"
                        value={reason}
                        onChange={(e) => {
                          const newReasons = [...formData.reasons];
                          newReasons[i] = e.target.value;
                          setFormData({ ...formData, reasons: newReasons });
                        }}
                        className="w-full p-3 rounded-xl border-2 border-pink-100 focus:border-pink-500 outline-none text-sm"
                        placeholder={`Шалтгаан ${i + 1}`}
                      />
                    ))}
                  </div>

                  <div className="space-y-4">
                    <label className="block text-lg font-bold text-pink-600">📖 Бидний тухай 3 зүйл:</label>
                    {formData.about_us.map((about, i) => (
                      <input
                        key={`about-${i}`}
                        type="text"
                        value={about}
                        onChange={(e) => {
                          const newAbout = [...formData.about_us];
                          newAbout[i] = e.target.value;
                          setFormData({ ...formData, about_us: newAbout });
                        }}
                        className="w-full p-3 rounded-xl border-2 border-pink-100 focus:border-pink-500 outline-none text-sm"
                        placeholder={`Таалагддаг зүйл ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-4 bg-gray-200 rounded-2xl text-xl font-bold"
                >
                  Буцах
                </button>
                <button
                  disabled={loading}
                  onClick={handleCreate}
                  className="flex-[2] py-4 bg-[#D32F2F] text-white rounded-2xl text-2xl font-bold shadow-lg"
                >
                  {loading ? 'Уншиж байна...' : 'Хуудсыг Бүтээх ❤️'}
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 flex flex-col items-center"
            >
              <div className="text-6xl mb-2">🎉</div>
              <h2 className="text-3xl font-bold text-[#D32F2F]">Амжилттай бүтээгдлээ!</h2>

              <div className="my-4">
                <HeartQRCode url={`${typeof window !== 'undefined' ? window.location.origin : ''}/${createdSlug}`} />
              </div>

              <div className="w-full space-y-4">
                <p className="text-lg">Таны валентин хуудас бэлэн боллоо. Энэ линкийг хайртай хүндээ явуулаарай эсвэл QR кодыг уншуулаарай:</p>

                <div className="p-4 bg-pink-50 rounded-2xl border-2 border-dashed border-pink-300 break-all font-mono text-pink-600">
                  {typeof window !== 'undefined' ? window.location.origin : ''}/{createdSlug}
                </div>

                <button
                  onClick={() => window.open(`/${createdSlug}`, '_blank')}
                  className="w-full py-4 bg-[#F4978E] text-white rounded-2xl text-2xl font-bold shadow-lg"
                >
                  Хуудсыг үзэх 👀
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
