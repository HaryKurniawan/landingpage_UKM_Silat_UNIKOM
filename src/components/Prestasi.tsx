import { Link } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const achievements = [
    { year: '2024', title: 'Juara 1 Kategori Tanding', event: 'Kejurnas Pencak Silat Mahasiswa', medal: 'gold' },
    { year: '2024', title: 'Juara 2 Kategori Tunggal', event: 'POMDA Jawa Barat', medal: 'silver' },
    { year: '2024', title: 'Juara 1 Kategori Ganda', event: 'Piala Rektor se-Jabar', medal: 'gold' },
    { year: '2023', title: 'Juara 3 Kategori Tanding', event: 'Kejurnas Antar PT', medal: 'bronze' },
]

function getMedalEmoji(medal: string) {
    switch (medal) {
        case 'gold': return '🥇'
        case 'silver': return '🥈'
        case 'bronze': return '🥉'
        default: return '🏆'
    }
}

export function Prestasi() {
    const animation = useScrollAnimation()

    return (
        <section id="daftar-prestasi" className="py-32 bg-[#0a0a0a] relative">
            {/* Top Line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a1a1a] to-transparent" />

            <div className="max-w-4xl mx-auto px-8">
                {/* Header */}
                <div
                    ref={animation.ref}
                    className={`text-center mb-12 scroll-animate ${animation.isVisible ? 'animate-in' : ''}`}
                >
                    <span className="inline-block text-[11px] font-medium tracking-[0.3em] uppercase text-[#6b6b6b] mb-4">
                        Pencapaian
                    </span>
                    <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight">
                        Daftar <span className="text-[#6b6b6b]">Prestasi</span>
                    </h2>
                </div>

                {/* Stats Summary */}
                <div className={`grid grid-cols-3 gap-3 mb-12 scroll-animate ${animation.isVisible ? 'animate-in' : ''}`}>
                    <div className="p-5 bg-[#0f0f0f] border border-[#1a1a1a] text-center">
                        <div className="text-3xl mb-2">🥇</div>
                        <div className="font-display text-3xl font-bold mb-1">3</div>
                        <div className="text-[10px] text-[#4d4d4d] uppercase tracking-[0.15em]">Emas</div>
                    </div>
                    <div className="p-5 bg-[#0f0f0f] border border-[#1a1a1a] text-center">
                        <div className="text-3xl mb-2">🥈</div>
                        <div className="font-display text-3xl font-bold mb-1">2</div>
                        <div className="text-[10px] text-[#4d4d4d] uppercase tracking-[0.15em]">Perak</div>
                    </div>
                    <div className="p-5 bg-[#0f0f0f] border border-[#1a1a1a] text-center">
                        <div className="text-3xl mb-2">🥉</div>
                        <div className="font-display text-3xl font-bold mb-1">1</div>
                        <div className="text-[10px] text-[#4d4d4d] uppercase tracking-[0.15em]">Perunggu</div>
                    </div>
                </div>

                {/* Achievement List - Medal Aligned Left */}
                <div className="space-y-2 mb-10">
                    {achievements.map((item, index) => (
                        <div
                            key={index}
                            className={`group flex items-center gap-5 p-4 bg-[#0f0f0f] border border-[#1a1a1a] transition-all duration-300 hover:border-[#2d2d2d] scroll-animate ${animation.isVisible ? 'animate-in' : ''}`}
                            style={{ transitionDelay: `${index * 0.05}s` }}
                        >
                            {/* Medal - Fixed Width */}
                            <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                                <span className="text-3xl">{getMedalEmoji(item.medal)}</span>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-base font-medium group-hover:text-white transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-xs text-[#4d4d4d]">
                                    {item.year} • {item.event}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View More */}
                <div className="text-center">
                    <Link
                        to="/prestasi"
                        className="inline-flex items-center gap-2 px-6 py-3 border border-[#2d2d2d] text-sm font-medium text-[#8b8b8b] transition-all duration-300 hover:border-white hover:text-white"
                    >
                        Lihat Semua Prestasi →
                    </Link>
                </div>
            </div>
        </section>
    )
}
