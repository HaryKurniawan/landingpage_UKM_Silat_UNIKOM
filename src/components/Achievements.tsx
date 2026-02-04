import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { eventsData } from '../data/events'

export function Achievements() {
    const animation = useScrollAnimation()
    const scrollRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 420 // Card width + gap
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    return (
        <section id="prestasi" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
            {/* Top Line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a1a1a] to-transparent" />

            {/* Header */}
            <div className="max-w-5xl mx-auto px-8 mb-12">
                <div
                    ref={animation.ref}
                    className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 scroll-animate ${animation.isVisible ? 'animate-in' : ''}`}
                >
                    <div>
                        <span className="inline-block text-[11px] font-medium tracking-[0.3em] uppercase text-[#6b6b6b] mb-4">
                            Kejuaraan
                        </span>
                        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight">
                            Event & <span className="text-[#6b6b6b]">Kompetisi</span>
                        </h2>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="w-12 h-12 flex items-center justify-center border border-[#2d2d2d] text-[#6b6b6b] transition-all duration-300 hover:border-white hover:text-white hover:bg-white/5"
                            aria-label="Scroll left"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-12 h-12 flex items-center justify-center border border-[#2d2d2d] text-[#6b6b6b] transition-all duration-300 hover:border-white hover:text-white hover:bg-white/5"
                            aria-label="Scroll right"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                    {eventsData.map((event, index) => (
                        <Link
                            key={event.id}
                            to={`/event/${event.slug}`}
                            className={`group flex-shrink-0 w-[320px] md:w-[400px] bg-[#0f0f0f] border border-[#1a1a1a] transition-all duration-500 hover:border-[#2d2d2d] overflow-hidden scroll-animate ${animation.isVisible ? 'animate-in' : ''}`}
                            style={{ transitionDelay: `${index * 0.1}s` }}
                        >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />

                                {/* Status Badge */}
                                <div className={`absolute top-4 left-4 px-3 py-1 text-[10px] font-medium tracking-[0.1em] uppercase ${event.status === 'upcoming'
                                        ? 'bg-white text-[#0a0a0a]'
                                        : 'bg-[#0a0a0a]/80 text-[#ababab]'
                                    }`}>
                                    {event.status === 'upcoming' ? 'Akan Datang' : 'Selesai'}
                                </div>

                                {/* Click indicator */}
                                <div className="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center border border-[#3d3d3d] rounded-full bg-[#0a0a0a]/60 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {/* Date & Location */}
                                <div className="flex items-center gap-2 text-xs text-[#4d4d4d] mb-3">
                                    <span>{event.date}</span>
                                    <span>•</span>
                                    <span>{event.location}</span>
                                </div>

                                {/* Title */}
                                <h3 className="font-display text-lg font-semibold mb-4 leading-tight transition-colors duration-300 group-hover:text-white">
                                    {event.title}
                                </h3>

                                {/* Result */}
                                {event.result ? (
                                    <div className="flex items-center gap-2">
                                        <span className="text-base">🏆</span>
                                        <span className="text-sm text-[#ababab]">{event.result}</span>
                                    </div>
                                ) : (
                                    <div className="text-sm text-[#4d4d4d]">
                                        Klik untuk info lebih lanjut →
                                    </div>
                                )}
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
