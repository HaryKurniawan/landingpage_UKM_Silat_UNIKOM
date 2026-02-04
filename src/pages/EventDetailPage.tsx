import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { IconInstagram } from '../components/Icons'
import type { Event } from '../types'

function getMedalEmoji(medal: string) {
    switch (medal) {
        case 'gold': return '🥇'
        case 'silver': return '🥈'
        case 'bronze': return '🥉'
        default: return '🏆'
    }
}

function getMedalLabel(medal: string) {
    switch (medal) {
        case 'gold': return 'Emas'
        case 'silver': return 'Perak'
        case 'bronze': return 'Perunggu'
        default: return ''
    }
}

export function EventDetailPage() {
    const { slug } = useParams<{ slug: string }>()
    const navigate = useNavigate()
    const [event, setEvent] = useState<Event | null>(null)
    const [loading, setLoading] = useState(true)
    const [prevEvent, setPrevEvent] = useState<Partial<Event> | null>(null)
    const [nextEvent, setNextEvent] = useState<Partial<Event> | null>(null)

    useEffect(() => {
        if (slug) fetchEvent(slug)
    }, [slug])

    const fetchEvent = async (currentSlug: string) => {
        setLoading(true)
        try {
            // Fetch current event
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .eq('slug', currentSlug)
                .single()

            if (error) throw error
            if (data) {
                setEvent(data as Event)

                // Fetch adjacent events for navigation (naive approach by ID)
                const { data: allEvents } = await supabase
                    .from('events')
                    .select('slug, title, id')
                    .order('id', { ascending: false })

                if (allEvents) {
                    const currentIndex = allEvents.findIndex(e => e.slug === currentSlug)
                    if (currentIndex > 0) setPrevEvent(allEvents[currentIndex - 1])
                    else setPrevEvent(null)

                    if (currentIndex < allEvents.length - 1) setNextEvent(allEvents[currentIndex + 1])
                    else setNextEvent(null)
                }
            }
        } catch (error) {
            console.error('Error fetching event:', error)
            setEvent(null)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-[#6b6b6b]">Loading...</div>
    }

    if (!event) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
                <div className="text-center px-8">
                    <div className="text-6xl mb-6">🔍</div>
                    <h1 className="font-display text-3xl font-bold mb-4">Event Tidak Ditemukan</h1>
                    <p className="text-[#6b6b6b] mb-8">Event yang kamu cari tidak tersedia.</p>
                    <Link
                        to="/#prestasi"
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
                    <button
                        onClick={() => navigate('/#prestasi')}
                        className="flex items-center gap-2 text-sm text-[#8b8b8b] hover:text-white transition-colors"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                        <span>Kembali</span>
                    </button>

                    <div className="flex items-center gap-1">
                        {prevEvent && (
                            <Link
                                to={`/event/${prevEvent.slug}`}
                                className="w-8 h-8 flex items-center justify-center text-[#6b6b6b] hover:text-white transition-colors"
                                title={prevEvent.title}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </Link>
                        )}
                        <span className="text-xs text-[#4d4d4d] px-2">
                            •
                        </span>
                        {nextEvent && (
                            <Link
                                to={`/event/${nextEvent.slug}`}
                                className="w-8 h-8 flex items-center justify-center text-[#6b6b6b] hover:text-white transition-colors"
                                title={nextEvent.title}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>
            </header>

            {/* Hero Image */}
            <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
                <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-[#0a0a0a]/20" />

                {/* Status Badge */}
                <div className={`absolute top-20 right-6 px-4 py-2 text-xs font-medium tracking-[0.15em] uppercase ${event.status === 'upcoming'
                    ? 'bg-white text-[#0a0a0a]'
                    : 'bg-[#1a1a1a] text-[#ababab] border border-[#2d2d2d]'
                    }`}>
                    {event.status === 'upcoming' ? '📅 Akan Datang' : '✓ Selesai'}
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-wrap items-center gap-3 text-sm text-[#ababab] mb-4">
                            <span className="flex items-center gap-1">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                {event.date}
                            </span>
                            <span className="text-[#3d3d3d]">•</span>
                            <span className="flex items-center gap-1">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                {event.location}
                            </span>
                        </div>
                        <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1]">
                            {event.title}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 md:px-8 py-16 md:py-20">
                {/* Description */}
                <div className="mb-16">
                    <h2 className="flex items-center gap-3 text-xs font-medium tracking-[0.2em] uppercase text-[#6b6b6b] mb-6">
                        <span className="w-8 h-px bg-[#3d3d3d]" />
                        Tentang Event
                    </h2>
                    <p className="text-lg md:text-xl text-[#c0c0c0] leading-relaxed whitespace-pre-line">{event.description}</p>
                </div>

                {/* Winners */}
                {event.winners && event.winners.length > 0 && (
                    <div className="mb-16">
                        <h2 className="flex items-center gap-3 text-xs font-medium tracking-[0.2em] uppercase text-[#6b6b6b] mb-6">
                            <span className="w-8 h-px bg-[#3d3d3d]" />
                            Daftar Juara
                        </h2>
                        <div className="grid gap-3">
                            {event.winners.map((winner, index) => (
                                <div
                                    key={index}
                                    className="group flex items-center gap-5 p-5 bg-[#0f0f0f] border border-[#1a1a1a] transition-all duration-300 hover:border-[#2d2d2d] hover:bg-[#111111]"
                                >
                                    <div className="text-4xl flex-shrink-0">{getMedalEmoji(winner.medal)}</div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-display text-lg font-semibold mb-1 group-hover:text-white transition-colors">{winner.name}</div>
                                        <div className="text-sm text-[#6b6b6b]">{winner.category}</div>
                                    </div>
                                    <div className="hidden sm:block px-3 py-1 text-[10px] font-medium tracking-[0.1em] uppercase text-[#4d4d4d] border border-[#2d2d2d]">
                                        {getMedalLabel(winner.medal)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Photo Gallery */}
                {event.gallery_urls && event.gallery_urls.length > 0 && (
                    <div className="mb-16">
                        <h2 className="flex items-center gap-3 text-xs font-medium tracking-[0.2em] uppercase text-[#6b6b6b] mb-6">
                            <span className="w-8 h-px bg-[#3d3d3d]" />
                            Galeri Foto
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {event.gallery_urls.map((photo, index) => (
                                <div
                                    key={index}
                                    className={`group overflow-hidden bg-[#1a1a1a] cursor-pointer ${index === 0 ? 'col-span-2 row-span-2 aspect-[4/3]' : 'aspect-square'
                                        }`}
                                >
                                    <img
                                        src={photo}
                                        alt={`Foto ${index + 1}`}
                                        className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Video & Links */}
                {(event.video_url || event.instagram_url) && (
                    <div className="mb-16">
                        <h2 className="flex items-center gap-3 text-xs font-medium tracking-[0.2em] uppercase text-[#6b6b6b] mb-6">
                            <span className="w-8 h-px bg-[#3d3d3d]" />
                            Media
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {event.video_url && (
                                <a
                                    href={event.video_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-3 px-6 py-4 bg-[#0f0f0f] border border-[#1a1a1a] transition-all duration-300 hover:border-[#3d3d3d] hover:bg-[#111111]"
                                >
                                    <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <polygon points="5 3 19 12 5 21 5 3" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium group-hover:text-white transition-colors">Video Recap</div>
                                        <div className="text-xs text-[#6b6b6b]">Tonton highlight</div>
                                    </div>
                                </a>
                            )}
                            {event.instagram_url && (
                                <a
                                    href={event.instagram_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-3 px-6 py-4 bg-[#0f0f0f] border border-[#1a1a1a] transition-all duration-300 hover:border-[#3d3d3d] hover:bg-[#111111]"
                                >
                                    <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full">
                                        <IconInstagram />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium group-hover:text-white transition-colors">Instagram</div>
                                        <div className="text-xs text-[#6b6b6b]">Lihat postingan</div>
                                    </div>
                                </a>
                            )}
                        </div>
                    </div>
                )}

                {/* Upcoming Event CTA */}
                {event.status === 'upcoming' && (
                    <div className="relative p-8 md:p-12 bg-gradient-to-br from-[#0f0f0f] to-[#111111] border border-dashed border-[#3d3d3d] text-center overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-white/5 rounded-full blur-3xl" />
                        <div className="relative">
                            <div className="text-4xl mb-4">🎯</div>
                            <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">Tertarik Ikut?</h3>
                            <p className="text-[#8b8b8b] mb-8 max-w-md mx-auto">
                                Persiapan tim sedang berjalan. Daftarkan dirimu untuk mengikuti seleksi tim!
                            </p>
                            <button className="px-8 py-4 bg-white text-[#0a0a0a] text-sm font-semibold tracking-[0.1em] uppercase transition-all duration-300 hover:bg-[#e8e8e8]">
                                Daftar Jadi Peserta
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Navigation */}
            <div className="border-t border-[#1a1a1a]">
                <div className="max-w-4xl mx-auto px-6 md:px-8 py-8">
                    <div className="flex items-center justify-between">
                        {prevEvent ? (
                            <Link
                                to={`/event/${prevEvent.slug}`}
                                className="group flex items-center gap-4 py-2"
                            >
                                <div className="w-10 h-10 flex items-center justify-center border border-[#2d2d2d] rounded-full transition-all duration-300 group-hover:border-white">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="15 18 9 12 15 6" />
                                    </svg>
                                </div>
                                <div className="hidden sm:block">
                                    <div className="text-xs text-[#6b6b6b] mb-1">Sebelumnya</div>
                                    <div className="text-sm font-medium group-hover:text-white transition-colors truncate max-w-[200px]">{prevEvent.title}</div>
                                </div>
                            </Link>
                        ) : (
                            <div />
                        )}

                        <Link
                            to="/#prestasi"
                            className="text-xs font-medium tracking-[0.1em] uppercase text-[#6b6b6b] hover:text-white transition-colors"
                        >
                            Semua Event
                        </Link>

                        {nextEvent ? (
                            <Link
                                to={`/event/${nextEvent.slug}`}
                                className="group flex items-center gap-4 py-2 text-right"
                            >
                                <div className="hidden sm:block">
                                    <div className="text-xs text-[#6b6b6b] mb-1">Selanjutnya</div>
                                    <div className="text-sm font-medium group-hover:text-white transition-colors truncate max-w-[200px]">{nextEvent.title}</div>
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
