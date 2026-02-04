import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { IconInstagram, IconMail } from './Icons'

const teamMembers = [
    {
        id: 1,
        name: 'Nama Pengurus',
        position: 'Ketua Umum',
        initials: 'KU',
        size: 'large', // Featured
    },
    {
        id: 2,
        name: 'Nama Pengurus',
        position: 'Wakil Ketua',
        initials: 'WK',
        size: 'medium',
    },
    {
        id: 3,
        name: 'Nama Pengurus',
        position: 'Sekretaris',
        initials: 'SE',
        size: 'medium',
    },
    {
        id: 4,
        name: 'Nama Pengurus',
        position: 'Bendahara',
        initials: 'BE',
        size: 'small',
    },
    {
        id: 5,
        name: 'Nama Pengurus',
        position: 'Koord. Latihan',
        initials: 'KL',
        size: 'small',
    },
    {
        id: 6,
        name: 'Nama Pengurus',
        position: 'Humas',
        initials: 'HU',
        size: 'small',
    },
]

export function Team() {
    const animation = useScrollAnimation()

    return (
        <section id="pengurus" className="py-32 bg-[#0a0a0a] relative">
            <div className="max-w-5xl mx-auto px-8">
                {/* Header */}
                <div
                    ref={animation.ref}
                    className={`mb-16 scroll-animate ${animation.isVisible ? 'animate-in' : ''}`}
                >
                    <span className="inline-block text-[11px] font-medium tracking-[0.3em] uppercase text-[#6b6b6b] mb-4">
                        Pengurus UKM
                    </span>
                    <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight">
                        Tim <span className="text-[#6b6b6b]">Kami</span>
                    </h2>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                    {/* Featured - Ketua (Large - spans 2 cols and 2 rows on desktop) */}
                    <div
                        className={`group relative col-span-2 row-span-2 aspect-square md:aspect-auto bg-[#0f0f0f] border border-[#1a1a1a] p-6 md:p-8 flex flex-col justify-between transition-all duration-500 hover:border-[#3d3d3d] hover:bg-[#111111] scroll-animate ${animation.isVisible ? 'animate-in' : ''}`}
                    >
                        {/* Position tag */}
                        <div className="flex justify-between items-start">
                            <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#4d4d4d]">
                                {teamMembers[0].position}
                            </span>
                            <span className="text-[10px] font-medium tracking-[0.1em] text-[#2d2d2d]">01</span>
                        </div>

                        {/* Avatar */}
                        <div className="flex-1 flex items-center justify-center py-6">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-[#2d2d2d] flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] transition-all duration-500 group-hover:border-[#4d4d4d] group-hover:scale-105">
                                <span className="font-display text-4xl md:text-5xl font-bold text-[#4d4d4d] group-hover:text-[#6b6b6b] transition-colors duration-300">
                                    {teamMembers[0].initials}
                                </span>
                            </div>
                        </div>

                        {/* Name & Social */}
                        <div>
                            <h3 className="font-display text-xl md:text-2xl font-semibold mb-3 group-hover:text-white transition-colors duration-300">
                                {teamMembers[0].name}
                            </h3>
                            <div className="flex gap-2">
                                <a href="#" className="w-8 h-8 flex items-center justify-center border border-[#2d2d2d] rounded-full text-[#4d4d4d] transition-all duration-300 hover:bg-white hover:text-[#0a0a0a] hover:border-white">
                                    <IconInstagram />
                                </a>
                                <a href="#" className="w-8 h-8 flex items-center justify-center border border-[#2d2d2d] rounded-full text-[#4d4d4d] transition-all duration-300 hover:bg-white hover:text-[#0a0a0a] hover:border-white">
                                    <IconMail />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Medium Cards - Wakil & Sekretaris */}
                    {teamMembers.slice(1, 3).map((member, index) => (
                        <div
                            key={member.id}
                            className={`group relative col-span-1 aspect-square bg-[#0f0f0f] border border-[#1a1a1a] p-4 md:p-5 flex flex-col justify-between transition-all duration-500 hover:border-[#3d3d3d] hover:bg-[#111111] scroll-animate ${animation.isVisible ? 'animate-in' : ''}`}
                            style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
                        >
                            <span className="text-[9px] font-medium tracking-[0.1em] uppercase text-[#3d3d3d]">
                                0{index + 2}
                            </span>

                            <div className="flex-1 flex items-center justify-center">
                                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-[#2d2d2d] flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] transition-all duration-500 group-hover:border-[#4d4d4d]">
                                    <span className="font-display text-xl md:text-2xl font-bold text-[#4d4d4d] group-hover:text-[#6b6b6b] transition-colors duration-300">
                                        {member.initials}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-display text-sm md:text-base font-semibold mb-1 group-hover:text-white transition-colors duration-300 truncate">
                                    {member.name}
                                </h3>
                                <span className="text-[9px] font-medium tracking-[0.1em] uppercase text-[#4d4d4d]">
                                    {member.position}
                                </span>
                            </div>
                        </div>
                    ))}

                    {/* Small Cards - Other members */}
                    {teamMembers.slice(3).map((member, index) => (
                        <div
                            key={member.id}
                            className={`group relative col-span-1 aspect-[4/3] md:aspect-square bg-[#0f0f0f] border border-[#1a1a1a] p-4 flex flex-col justify-between transition-all duration-500 hover:border-[#3d3d3d] hover:bg-[#111111] scroll-animate ${animation.isVisible ? 'animate-in' : ''}`}
                            style={{ transitionDelay: `${(index + 3) * 0.1}s` }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full border border-[#2d2d2d] flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] flex-shrink-0 transition-all duration-500 group-hover:border-[#4d4d4d]">
                                    <span className="font-display text-sm font-bold text-[#4d4d4d] group-hover:text-[#6b6b6b] transition-colors duration-300">
                                        {member.initials}
                                    </span>
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-display text-sm font-semibold group-hover:text-white transition-colors duration-300 truncate">
                                        {member.name}
                                    </h3>
                                    <span className="text-[9px] font-medium tracking-[0.1em] uppercase text-[#4d4d4d]">
                                        {member.position}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Join Card */}
                    <div
                        className={`group relative col-span-1 aspect-[4/3] md:aspect-square bg-[#0f0f0f] border border-dashed border-[#2d2d2d] p-4 flex flex-col items-center justify-center text-center transition-all duration-500 hover:border-white cursor-pointer scroll-animate ${animation.isVisible ? 'animate-in' : ''}`}
                        style={{ transitionDelay: '0.6s' }}
                    >
                        <div className="w-10 h-10 rounded-full border border-[#3d3d3d] flex items-center justify-center mb-3 group-hover:border-white group-hover:bg-white transition-all duration-300">
                            <span className="text-xl text-[#4d4d4d] group-hover:text-[#0a0a0a] transition-colors duration-300">+</span>
                        </div>
                        <span className="text-xs font-medium text-[#4d4d4d] group-hover:text-white transition-colors duration-300">
                            Bergabung?
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}
