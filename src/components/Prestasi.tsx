import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { supabase } from '../lib/supabase'
import type { Prestasi as PrestasiItem } from '../types'

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
    const [achievements, setAchievements] = useState<PrestasiItem[]>([])
    const [stats, setStats] = useState({ gold: 0, silver: 0, bronze: 0 })
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
                const typedData = data as PrestasiItem[]
                setAchievements(typedData)

                // Calculate stats
                const newStats = typedData.reduce((acc, curr) => {
                    if (curr.medal === 'gold') acc.gold++
                    else if (curr.medal === 'silver') acc.silver++
                    else if (curr.medal === 'bronze') acc.bronze++
                    return acc
                }, { gold: 0, silver: 0, bronze: 0 })
                setStats(newStats)
            }
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return null;

    return (
        <section id="daftar-prestasi" className="py-32 bg-[#0a0a0a] relative">
            {/* Top Line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a1a1a] to-transparent" />

            <div className="max-w-4xl mx-auto px-8">
                {/* Header */}
                <div
                    ref={animation.ref}
                    className="text-center mb-12"
                >
                    <span className="inline-block text-[11px] font-medium tracking-[0.3em] uppercase text-[#6b6b6b] mb-4">
                        Pencapaian
                    </span>
                    <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight">
                        Daftar <span className="text-[#6b6b6b]">Prestasi</span>
                    </h2>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-3 gap-3 mb-12">
                    <div className="p-5 bg-[#0f0f0f] border border-[#1a1a1a] text-center">
                        <div className="text-3xl mb-2">🥇</div>
                        <div className="font-display text-3xl font-bold mb-1">{stats.gold}</div>
                        <div className="text-[10px] text-[#4d4d4d] uppercase tracking-[0.15em]">Emas</div>
                    </div>
                    <div className="p-5 bg-[#0f0f0f] border border-[#1a1a1a] text-center">
                        <div className="text-3xl mb-2">🥈</div>
                        <div className="font-display text-3xl font-bold mb-1">{stats.silver}</div>
                        <div className="text-[10px] text-[#4d4d4d] uppercase tracking-[0.15em]">Perak</div>
                    </div>
                    <div className="p-5 bg-[#0f0f0f] border border-[#1a1a1a] text-center">
                        <div className="text-3xl mb-2">🥉</div>
                        <div className="font-display text-3xl font-bold mb-1">{stats.bronze}</div>
                        <div className="text-[10px] text-[#4d4d4d] uppercase tracking-[0.15em]">Perunggu</div>
                    </div>
                </div>

                {/* Achievement List - Medal Aligned Left */}
                <div className="space-y-2 mb-10">
                    {achievements
                        .filter(item => item.medal === 'gold')
                        .slice(0, 4)
                        .map((item, index) => (
                            <div
                                key={index}
                                className="group flex items-center gap-5 p-4 bg-[#0f0f0f] border border-[#1a1a1a] transition-all duration-300 hover:border-white"
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
                                        {item.year} • {item.event_name}
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
