import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const faqs = [
    {
        question: 'Apakah pemula bisa ikut?',
        answer: 'Tentu bisa! Kami menerima anggota dari semua tingkatan, baik yang sudah berpengalaman maupun yang baru pertama kali belajar silat. Akan ada program latihan khusus untuk pemula.',
    },
    {
        question: 'Apakah UKM ini berbentuk perguruan tertentu?',
        answer: 'Tidak. UKM Silat UNIKOM bukan perguruan, melainkan wadah bagi pesilat mahasiswa dari berbagai perguruan untuk berlatih dan berkompetisi bersama.',
    },
    {
        question: 'Kapan jadwal latihan rutin?',
        answer: 'Latihan rutin diadakan setiap hari Selasa dan Kamis, pukul 16.00 - 18.00 WIB di lapangan kampus UNIKOM.',
    },
    {
        question: 'Apakah ada biaya pendaftaran?',
        answer: 'Ada biaya pendaftaran yang terjangkau untuk mendukung operasional UKM. Informasi lengkap akan dijelaskan saat open recruitment.',
    },
    {
        question: 'Bagaimana cara bergabung?',
        answer: 'Ikuti open recruitment yang diadakan setiap awal semester, atau hubungi pengurus kami melalui kontak yang tersedia untuk informasi lebih lanjut.',
    },
]

export function FAQ() {
    const animation = useScrollAnimation()
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section id="faq" className="py-32 bg-[#0a0a0a] relative">
            {/* Top Line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a1a1a] to-transparent" />

            <div className="max-w-3xl mx-auto px-8">
                {/* Header */}
                <div
                    ref={animation.ref}
                    className={`text-center mb-12 scroll-animate ${animation.isVisible ? 'animate-in' : ''}`}
                >
                    <span className="inline-block text-[11px] font-medium tracking-[0.3em] uppercase text-[#6b6b6b] mb-4">
                        FAQ
                    </span>
                    <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold">
                        Pertanyaan <span className="text-[#6b6b6b]">Umum</span>
                    </h2>
                </div>

                {/* FAQ List */}
                <div className="space-y-2">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border border-[#1a1a1a] transition-all duration-300 hover:border-[#2d2d2d] scroll-animate ${animation.isVisible ? 'animate-in' : ''}`}
                            style={{ transitionDelay: `${index * 0.05}s` }}
                        >
                            {/* Question */}
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex items-center justify-between p-5 text-left"
                            >
                                <span className="font-medium text-sm md:text-base pr-4">{faq.question}</span>
                                <span className={`text-[#4d4d4d] transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}>
                                    +
                                </span>
                            </button>

                            {/* Answer */}
                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-40 pb-5' : 'max-h-0'
                                    }`}
                            >
                                <p className="px-5 text-sm text-[#6b6b6b] leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
