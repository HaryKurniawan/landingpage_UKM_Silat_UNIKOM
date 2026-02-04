import { useScrollAnimation } from '../hooks/useScrollAnimation'

export function About() {
    const animation = useScrollAnimation()

    return (
        <section id="tentang" className="py-32 bg-[#0a0a0a] relative">
            {/* Top Divider */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-[#3d3d3d] to-transparent" />

            <div
                ref={animation.ref}
                className={`max-w-4xl mx-auto px-8 text-center scroll-animate ${animation.isVisible ? 'animate-in' : ''}`}
            >
                {/* Header */}
                <span className="inline-block text-[11px] font-medium tracking-[0.3em] uppercase text-[#6b6b6b] mb-6">
                    Tentang Kami
                </span>

                <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight mb-10">
                    Lebih dari Sekedar<br />
                    <span className="text-[#6b6b6b]">Bela Diri</span>
                </h2>

                {/* Key Points */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="p-6 border-t border-[#1a1a1a]">
                        <div className="font-display text-4xl font-bold text-white mb-3">15+</div>
                        <h3 className="font-display text-lg font-semibold mb-2">Prestasi</h3>
                        <p className="text-sm text-[#6b6b6b] leading-relaxed">
                            Raih prestasi di berbagai kejuaraan regional hingga nasional bersama kami
                        </p>
                    </div>

                    <div className="p-6 border-t border-[#1a1a1a]">
                        <div className="font-display text-4xl font-bold text-white mb-3">50+</div>
                        <h3 className="font-display text-lg font-semibold mb-2">Keluarga</h3>
                        <p className="text-sm text-[#6b6b6b] leading-relaxed">
                            Komunitas solid yang saling mendukung, bukan hanya rekan latihan tapi keluarga
                        </p>
                    </div>

                    <div className="p-6 border-t border-[#1a1a1a]">
                        <div className="font-display text-4xl font-bold text-white mb-3">10</div>
                        <h3 className="font-display text-lg font-semibold mb-2">Tahun</h3>
                        <p className="text-sm text-[#6b6b6b] leading-relaxed">
                            Pengalaman membina pesilat yang berprestasi dan berkarakter kuat
                        </p>
                    </div>
                </div>

                {/* Quote */}
                <div className="max-w-2xl mx-auto">
                    <p className="text-xl text-[#ababab] leading-relaxed font-light italic">
                        "Di sini kamu tidak hanya belajar silat, tapi juga membangun persaudaraan yang solid dan meraih prestasi bersama"
                    </p>
                </div>
            </div>
        </section>
    )
}
