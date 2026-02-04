import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const categories = {
    seni: {
        title: 'Kategori Seni',
        subtitle: 'Keindahan Gerakan',
        description: 'Fokus pada keindahan, keserasian, dan keluwesan gerakan pencak silat.',
        items: [
            'Tunggal — Peragaan jurus sendirian',
            'Ganda — Peragaan jurus berdua',
            'Beregu — Peragaan jurus bertiga',
            'Kembangan — Gerakan estetik dan artistik',
            'Irama — Harmoni gerakan dengan musik',
            'Ekspresi — Penghayatan makna gerakan',
        ],
    },
    tanding: {
        title: 'Kategori Tanding',
        subtitle: 'Ketangkasan Bertarung',
        description: 'Fokus pada teknik bertarung, kecepatan, dan strategi dalam pertandingan.',
        items: [
            'Serangan — Pukulan, tendangan, jatuhan',
            'Belaan — Tangkisan dan hindaran',
            'Kuncian — Teknik mengunci lawan',
            'Bantingan — Teknik menjatuhkan lawan',
            'Strategi — Taktik dalam pertandingan',
            'Fisik — Kekuatan dan ketahanan',
        ],
    },
}

export function Features() {
    const animation = useScrollAnimation()
    const [activeCategory, setActiveCategory] = useState<'seni' | 'tanding'>('seni')

    const category = categories[activeCategory]

    return (
        <section id="program" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
            {/* Top Line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a1a1a] to-transparent" />

            <div className="max-w-4xl mx-auto px-8">
                {/* Header */}
                <div
                    ref={animation.ref}
                    className={`text-center mb-12 scroll-animate ${animation.isVisible ? 'animate-in' : ''}`}
                >
                    <span className="inline-block text-[11px] font-medium tracking-[0.3em] uppercase text-[#6b6b6b] mb-4">
                        Kategori Pertandingan
                    </span>
                    <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold">
                        Yang Akan Kamu <span className="text-[#6b6b6b]">Pelajari</span>
                    </h2>
                </div>

                {/* Category Tabs */}
                <div className={`flex justify-center gap-2 mb-12 scroll-animate ${animation.isVisible ? 'animate-in' : ''}`}>
                    <button
                        onClick={() => setActiveCategory('seni')}
                        className={`px-6 py-3 text-sm font-medium transition-all duration-300 ${activeCategory === 'seni'
                            ? 'bg-white text-[#0a0a0a]'
                            : 'bg-[#0f0f0f] border border-[#2d2d2d] text-[#6b6b6b] hover:border-white hover:text-white'
                            }`}
                    >
                        Seni
                    </button>
                    <button
                        onClick={() => setActiveCategory('tanding')}
                        className={`px-6 py-3 text-sm font-medium transition-all duration-300 ${activeCategory === 'tanding'
                            ? 'bg-white text-[#0a0a0a]'
                            : 'bg-[#0f0f0f] border border-[#2d2d2d] text-[#6b6b6b] hover:border-white hover:text-white'
                            }`}
                    >
                        Tanding
                    </button>
                </div>

                {/* Category Content */}
                <div className={`scroll-animate ${animation.isVisible ? 'animate-in' : ''}`}>
                    {/* Title & Description */}
                    <div className="text-center mb-10">
                        <h3 className="font-display text-2xl font-bold mb-2">{category.title}</h3>
                        <p className="text-[#6b6b6b]">{category.description}</p>
                    </div>

                    {/* Items Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {category.items.map((item, index) => {
                            const [title, desc] = item.split(' — ')
                            return (
                                <div
                                    key={index}
                                    className="group p-5 bg-[#0f0f0f] border border-[#1a1a1a] transition-all duration-300 hover:border-[#2d2d2d]"
                                >
                                    <h4 className="text-sm font-medium mb-1 group-hover:text-white transition-colors">
                                        {title}
                                    </h4>
                                    <p className="text-xs text-[#4d4d4d]">{desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
