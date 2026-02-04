import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { IconArrowRight } from './Icons'

export function CTA() {
    const animation = useScrollAnimation()

    return (
        <section id="kontak" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
            {/* Center Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(40,40,40,0.3)_0%,transparent_70%)]" />

            <div
                ref={animation.ref}
                className={`max-w-3xl mx-auto px-8 relative z-10 text-center scroll-animate ${animation.isVisible ? 'animate-in' : ''
                    }`}
            >
                <span className="inline-block text-[11px] font-medium tracking-[0.3em] uppercase text-[#6b6b6b] mb-6">
                    Bergabung
                </span>

                <h2 className="font-display text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[0.95] mb-8">
                    Siap Menjadi<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fafafa] to-[#6b6b6b]">Pesilat?</span>
                </h2>

                <p className="max-w-lg mx-auto text-[#6b6b6b] leading-relaxed mb-12">
                    Latihan rutin setiap <span className="text-[#ababab]">Selasa & Kamis</span> pukul 16.00 - 18.00
                    di Gedung Olahraga Kampus UNIKOM
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <button className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#0a0a0a] text-sm font-semibold tracking-[0.1em] uppercase transition-all duration-500 hover:bg-[#e8e8e8] hover:gap-4">
                        <span>Daftar Sekarang</span>
                        <IconArrowRight />
                    </button>

                    <button className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#2d2d2d] text-[#8b8b8b] text-sm font-medium tracking-[0.1em] uppercase transition-all duration-500 hover:border-[#4d4d4d] hover:text-white">
                        <span>Hubungi Kami</span>
                    </button>
                </div>
            </div>
        </section>
    )
}
