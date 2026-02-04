import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Prestasi } from '../types'

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

export function PrestasiPage() {
    const [achievements, setAchievements] = useState<Prestasi[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPrestasi()
    }, [])

    const fetchPrestasi = async () => {
        try {
            const { data, error } = await supabase
                .from('prestasi')
                .select('*')
                .order('id', { ascending: false })

            if (error) {
                console.error('Error fetching prestasi:', error)
            } else if (data) {
                setAchievements(data as Prestasi[])
            }
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    const goldCount = achievements.filter(a => a.medal === 'gold').length
    const silverCount = achievements.filter(a => a.medal === 'silver').length
    const bronzeCount = achievements.filter(a => a.medal === 'bronze').length

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Fixed Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-[#1a1a1a]">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link
                        to="/#daftar-prestasi"
                        className="flex items-center gap-2 text-sm text-[#8b8b8b] hover:text-white transition-colors"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                        <span>Kembali</span>
                    </Link>

                    <div className="text-xs text-[#4d4d4d]">
                        Total {achievements.length} Prestasi
                    </div>
                </div>
            </header>

            {/* Hero */}
            <div className="pt-32 pb-16 px-8 text-center">
                <span className="inline-block text-[11px] font-medium tracking-[0.3em] uppercase text-[#6b6b6b] mb-4">
                    Pencapaian UKM Silat UNIKOM
                </span>
                <h1 className="font-display text-4xl md:text-6xl font-bold mb-8">
                    Daftar <span className="text-[#6b6b6b]">Prestasi</span>
                </h1>

                {/* Stats Summary */}
                <div className="flex justify-center gap-8 md:gap-12">
                    <div className="text-center">
                        <div className="text-3xl mb-1">🥇</div>
                        <div className="font-display text-3xl font-bold">{goldCount}</div>
                        <div className="text-[10px] text-[#4d4d4d] uppercase tracking-[0.1em]">Emas</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl mb-1">🥈</div>
                        <div className="font-display text-3xl font-bold">{silverCount}</div>
                        <div className="text-[10px] text-[#4d4d4d] uppercase tracking-[0.1em]">Perak</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl mb-1">🥉</div>
                        <div className="font-display text-3xl font-bold">{bronzeCount}</div>
                        <div className="text-[10px] text-[#4d4d4d] uppercase tracking-[0.1em]">Perunggu</div>
                    </div>
                </div>
            </div>

            {/* Achievement List */}
            <div className="max-w-4xl mx-auto px-6 pb-20">
                {loading ? (
                    <div className="text-center text-[#4d4d4d] py-12">
                        Memuat data...
                    </div>
                ) : (
                    <div className="space-y-2">
                        {achievements.map((item) => (
                            <div
                                key={item.id}
                                className="group flex items-center gap-4 md:gap-6 p-5 bg-[#0f0f0f] border border-[#1a1a1a] transition-all duration-300 hover:border-[#2d2d2d] hover:bg-[#111111]"
                            >
                                {/* Year Badge */}
                                <div className="hidden sm:flex items-center justify-center w-14 h-14 border border-[#2d2d2d] text-xs font-medium text-[#4d4d4d] flex-shrink-0">
                                    {item.year}
                                </div>

                                {/* Medal */}
                                <div className="text-3xl flex-shrink-0">{getMedalEmoji(item.medal)}</div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="font-display text-base md:text-lg font-semibold mb-1 group-hover:text-white transition-colors">
                                        {item.title}
                                    </div>
                                    <div className="text-sm text-[#6b6b6b] mb-1">
                                        <span className="sm:hidden">{item.year} • </span>{item.event_name}
                                    </div>
                                    {item.athlete && (
                                        <div className="text-xs text-[#4d4d4d]">
                                            {item.athlete}
                                        </div>
                                    )}
                                </div>

                                {/* Medal Label */}
                                <div className="hidden md:block px-3 py-1 text-[10px] font-medium tracking-[0.1em] uppercase text-[#4d4d4d] border border-[#2d2d2d]">
                                    {getMedalLabel(item.medal)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Back to Home */}
            <div className="border-t border-[#1a1a1a] py-8 text-center">
                <Link
                    to="/"
                    className="text-sm text-[#6b6b6b] hover:text-white transition-colors"
                >
                    ← Kembali ke Beranda
                </Link>
            </div>
        </div>
    )
}
