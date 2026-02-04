import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { aktivitasData } from '../data/aktivitas'

export function Aktivitas() {
    const animation = useScrollAnimation()
    const scrollRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 340
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    return (
        <section id="aktivitas" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
            {/* Top Line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a1a1a] to-transparent" />

            <div className="max-w-5xl mx-auto px-8">
                {/* Header */}
                <div
                    ref={animation.ref}
                    className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 scroll-animate ${animation.isVisible ? 'animate-in' : ''}`}
                >
                    <div>
                        <span className="inline-block text-[11px] font-medium tracking-[0.3em] uppercase text-[#6b6b6b] mb-4">
                            Aktivitas Kami
                        </span>
                        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight mb-4">
                            Lebih dari <span className="text-[#6b6b6b]">Latihan</span>
                        </h2>
                        <p className="max-w-lg text-[#6b6b6b] text-sm leading-relaxed">
                            Selain fokus pada prestasi, kami juga mengadakan berbagai kegiatan seru.
                            <span className="text-[#8b8b8b]"> Karena silat bukan hanya tentang bertanding, tapi juga tentang persaudaraan.</span>
                        </p>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="w-12 h-12 flex items-center justify-center border border-[#2d2d2d] text-[#6b6b6b] transition-all duration-300 hover:border-white hover:text-white hover:bg-white/5"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-12 h-12 flex items-center justify-center border border-[#2d2d2d] text-[#6b6b6b] transition-all duration-300 hover:border-white hover:text-white hover:bg-white/5"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Horizontal Scroll Cards */}
            <div className="relative">
                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto pb-8 px-8 md:px-[calc((100vw-1024px)/2+32px)] scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {aktivitasData.map((activity, index) => (
                        <Link
                            key={activity.id}
                            to={`/aktivitas/${activity.slug}`}
                            className={`group flex-shrink-0 w-[300px] md:w-[320px] bg-[#0f0f0f] border border-[#1a1a1a] transition-all duration-500 hover:border-[#2d2d2d] overflow-hidden scroll-animate ${animation.isVisible ? 'animate-in' : ''}`}
                            style={{ transitionDelay: `${index * 0.1}s` }}
                        >
                            {/* Image with polaroid style */}
                            <div className="p-3 pb-0">
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img
                                        src={activity.image}
                                        alt={activity.title}
                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* View indicator */}
                                    <div className="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-1.5 bg-[#0a0a0a]/80 backdrop-blur-sm text-xs text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <span>Lihat</span>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="9 18 15 12 9 6" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-white transition-colors">
                                    {activity.title}
                                </h3>
                                <p className="text-sm text-[#6b6b6b] leading-relaxed">
                                    {activity.subtitle}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Fade edges */}
                <div className="absolute top-0 left-0 bottom-8 w-8 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 bottom-8 w-8 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />
            </div>
        </section>
    )
}
