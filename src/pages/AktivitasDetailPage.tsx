import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Aktivitas } from '../types'

export function AktivitasDetailPage() {
    const { slug } = useParams<{ slug: string }>()
    const [aktivitas, setAktivitas] = useState<Aktivitas | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (slug) fetchAktivitas(slug)
    }, [slug])

    const fetchAktivitas = async (currentSlug: string) => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('aktivitas')
                .select('*')
                .eq('slug', currentSlug)
                .single()

            if (error) throw error
            if (data) {
                setAktivitas(data as Aktivitas)
            }
        } catch (error) {
            console.error('Error fetching aktivitas:', error)
            setAktivitas(null)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-[#6b6b6b]">Loading...</div>
    }

    if (!aktivitas) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
                <div className="text-center px-8">
                    <div className="text-6xl mb-6">🔍</div>
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
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-[#1a1a1a]">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <Link
                        to="/#aktivitas"
                        className="flex items-center gap-2 text-sm text-[#8b8b8b] hover:text-white transition-colors"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                        <span>Kembali</span>
                    </Link>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
                {/* Hero */}
                <div className="mb-12">
                    <span className="inline-block text-[11px] font-medium tracking-[0.3em] uppercase text-[#6b6b6b] mb-4">
                        Aktivitas UKM
                    </span>
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        {aktivitas.title}
                    </h1>
                    <p className="text-xl text-[#8b8b8b] leading-relaxed">
                        {aktivitas.subtitle}
                    </p>
                </div>

                {/* Main Image */}
                <div className="aspect-[16/9] mb-16 overflow-hidden bg-[#1a1a1a]">
                    <img
                        src={aktivitas.image_url}
                        alt={aktivitas.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Grid Content */}
                <div className="grid md:grid-cols-3 gap-12">
                    {/* Left: Info */}
                    <div className="md:col-span-1 space-y-8">
                        {aktivitas.schedule && (
                            <div>
                                <h3 className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#4d4d4d] mb-3">Jadwal</h3>
                                <p className="text-white">{aktivitas.schedule}</p>
                            </div>
                        )}
                        {aktivitas.highlights && aktivitas.highlights.length > 0 && (
                            <div>
                                <h3 className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#4d4d4d] mb-3">Highlights</h3>
                                <ul className="space-y-2">
                                    {aktivitas.highlights.map((h, i) => (
                                        <li key={i} className="text-sm text-[#8b8b8b] flex items-center gap-2">
                                            <span className="w-1 h-1 bg-white rounded-full" />
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Right: Description */}
                    <div className="md:col-span-2">
                        <h3 className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#4d4d4d] mb-6">Deskripsi</h3>
                        <div className="prose prose-invert max-w-none">
                            <p className="text-lg text-[#c0c0c0] leading-relaxed whitespace-pre-line">
                                {aktivitas.description}
                            </p>
                        </div>

                        {/* Memories/Quote box if available */}
                        {aktivitas.memories && aktivitas.memories.length > 0 && (
                            <div className="mt-12 p-8 bg-[#0f0f0f] border border-[#1a1a1a] relative group">
                                <div className="absolute top-0 left-0 w-1 h-0 bg-white transition-all duration-500 group-hover:h-full" />
                                <h4 className="text-sm font-semibold mb-4 text-white">Momen Berkesan</h4>
                                <ul className="space-y-4">
                                    {aktivitas.memories.map((m, i) => (
                                        <li key={i} className="text-[#8b8b8b] italic leading-relaxed">
                                            "{m}"
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Gallery */}
                {aktivitas.gallery_urls && aktivitas.gallery_urls.length > 0 && (
                    <div className="mt-20">
                        <h3 className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#4d4d4d] mb-8">Dokumentasi</h3>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                            {aktivitas.gallery_urls.map((url, i) => (
                                <div key={i} className="aspect-square bg-[#1a1a1a] overflow-hidden group">
                                    <img
                                        src={url}
                                        alt={`${aktivitas.title} gallery ${i}`}
                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
