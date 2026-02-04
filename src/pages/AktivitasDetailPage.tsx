import { useParams, Link } from 'react-router-dom'
import { getAktivitasBySlug, aktivitasData } from '../data/aktivitas'

export function AktivitasDetailPage() {
    const { slug } = useParams<{ slug: string }>()
    const activity = slug ? getAktivitasBySlug(slug) : undefined

    // Get current index for navigation
    const currentIndex = aktivitasData.findIndex(a => a.slug === slug)
    const prevActivity = currentIndex > 0 ? aktivitasData[currentIndex - 1] : null
    const nextActivity = currentIndex < aktivitasData.length - 1 ? aktivitasData[currentIndex + 1] : null

    if (!activity) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
                <div className="text-center px-8">
                    <div className="text-6xl mb-6">📷</div>
                    <h1 className="font-display text-3xl font-bold mb-4">Aktivitas Tidak Ditemukan</h1>
                    <p className="text-[#6b6b6b] mb-8">Aktivitas yang kamu cari tidak tersedia.</p>
                    <Link
                        to="/#aktivitas"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0a0a0a] font-semibold transition-all duration-300 hover:bg-[#e8e8e8]"
                    >
                        ← Kembali ke Beranda
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Fixed Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-[#1a1a1a]">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link
                        to="/#aktivitas"
                        className="flex items-center gap-2 text-sm text-[#8b8b8b] hover:text-white transition-colors"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                        <span>Kembali</span>
                    </Link>

                    <div className="flex items-center gap-1">
                        {prevActivity && (
                            <Link
                                to={`/aktivitas/${prevActivity.slug}`}
                                className="w-8 h-8 flex items-center justify-center text-[#6b6b6b] hover:text-white transition-colors"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </Link>
                        )}
                        <span className="text-xs text-[#4d4d4d] px-2">
                            {currentIndex + 1} / {aktivitasData.length}
                        </span>
                        {nextActivity && (
                            <Link
                                to={`/aktivitas/${nextActivity.slug}`}
                                className="w-8 h-8 flex items-center justify-center text-[#6b6b6b] hover:text-white transition-colors"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <div className="pt-20">
                <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left - Info */}
                        <div>
                            <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-[#6b6b6b] mb-4">
                                📸 Memories
                            </span>
                            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                                {activity.title}
                            </h1>
                            <p className="text-lg text-[#8b8b8b] leading-relaxed mb-8">
                                {activity.description}
                            </p>

                            {/* Schedule */}
                            {activity.schedule && (
                                <div className="inline-flex items-center gap-3 px-5 py-3 bg-[#0f0f0f] border border-[#1a1a1a]">
                                    <span className="text-xl">📅</span>
                                    <div>
                                        <div className="text-[10px] text-[#4d4d4d] uppercase tracking-[0.1em]">Jadwal</div>
                                        <div className="text-sm font-medium">{activity.schedule}</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right - Featured Photo */}
                        <div className="relative">
                            <div className="relative aspect-[4/3] overflow-hidden bg-[#1a1a1a]">
                                <img
                                    src={activity.image}
                                    alt={activity.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Decorative tape */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#3d3d3d]/30 rotate-2" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Memories Gallery - Bento Grid */}
            <div className="py-16 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-[#4d4d4d] mb-3">
                            Galeri
                        </span>
                        <h2 className="font-display text-2xl md:text-3xl font-bold">
                            Momen <span className="text-[#6b6b6b]">Berharga</span>
                        </h2>
                    </div>

                    {/* Bento Grid Gallery */}
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-2 auto-rows-[100px] md:auto-rows-[120px]">
                        {activity.photos.map((photo, index) => {
                            // Create varied sizes for bento effect
                            const sizeClasses = [
                                'col-span-2 row-span-2', // Large
                                'col-span-2 row-span-1', // Wide
                                'col-span-1 row-span-2', // Tall
                                'col-span-2 row-span-2', // Large
                                'col-span-1 row-span-1', // Small
                                'col-span-2 row-span-1', // Wide
                                'col-span-1 row-span-1', // Small
                            ]
                            const sizeClass = sizeClasses[index % sizeClasses.length]

                            return (
                                <div
                                    key={index}
                                    className={`group relative overflow-hidden bg-[#1a1a1a] ${sizeClass}`}
                                >
                                    <img
                                        src={photo}
                                        alt={`Memory ${index + 1}`}
                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                    />
                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/30 transition-all duration-500" />

                                    {/* Memory tag */}
                                    {activity.memories && activity.memories[index] && (
                                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <p className="text-xs text-white/80">{activity.memories[index]}</p>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Highlights */}
            {activity.highlights && activity.highlights.length > 0 && (
                <div className="py-16 bg-[#0f0f0f]">
                    <div className="max-w-4xl mx-auto px-6">
                        <div className="text-center mb-10">
                            <h2 className="font-display text-xl md:text-2xl font-bold">
                                ✨ Yang Akan Kamu Dapatkan
                            </h2>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {activity.highlights.map((highlight, index) => (
                                <div key={index} className="flex items-center gap-4 p-5 bg-[#0a0a0a] border border-[#1a1a1a] transition-all duration-300 hover:border-[#2d2d2d]">
                                    <div className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-full text-sm">
                                        ✓
                                    </div>
                                    <span className="text-[#c0c0c0]">{highlight}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* CTA */}
            <div className="py-20 bg-[#0a0a0a]">
                <div className="max-w-2xl mx-auto px-6 text-center">
                    <div className="text-4xl mb-6">🤝</div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">Tertarik Bergabung?</h3>
                    <p className="text-[#6b6b6b] mb-8">
                        Yuk jadi bagian dari keluarga besar UKM Silat UNIKOM dan ciptakan memories bersama!
                    </p>
                    <Link
                        to="/#kontak"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0a0a0a] text-sm font-semibold tracking-[0.1em] uppercase transition-all duration-300 hover:bg-[#e8e8e8]"
                    >
                        Hubungi Kami
                    </Link>
                </div>
            </div>

            {/* Footer Navigation */}
            <div className="border-t border-[#1a1a1a] bg-[#0a0a0a]">
                <div className="max-w-4xl mx-auto px-6 py-8">
                    <div className="flex items-center justify-between">
                        {prevActivity ? (
                            <Link
                                to={`/aktivitas/${prevActivity.slug}`}
                                className="group flex items-center gap-4 py-2"
                            >
                                <div className="w-10 h-10 flex items-center justify-center border border-[#2d2d2d] rounded-full transition-all duration-300 group-hover:border-white">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="15 18 9 12 15 6" />
                                    </svg>
                                </div>
                                <div className="hidden sm:block">
                                    <div className="text-xs text-[#6b6b6b] mb-1">Sebelumnya</div>
                                    <div className="text-sm font-medium group-hover:text-white transition-colors">{prevActivity.title}</div>
                                </div>
                            </Link>
                        ) : (
                            <div />
                        )}

                        <Link
                            to="/#aktivitas"
                            className="text-xs font-medium tracking-[0.1em] uppercase text-[#6b6b6b] hover:text-white transition-colors"
                        >
                            Semua Aktivitas
                        </Link>

                        {nextActivity ? (
                            <Link
                                to={`/aktivitas/${nextActivity.slug}`}
                                className="group flex items-center gap-4 py-2 text-right"
                            >
                                <div className="hidden sm:block">
                                    <div className="text-xs text-[#6b6b6b] mb-1">Selanjutnya</div>
                                    <div className="text-sm font-medium group-hover:text-white transition-colors">{nextActivity.title}</div>
                                </div>
                                <div className="w-10 h-10 flex items-center justify-center border border-[#2d2d2d] rounded-full transition-all duration-300 group-hover:border-white">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </div>
                            </Link>
                        ) : (
                            <div />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
