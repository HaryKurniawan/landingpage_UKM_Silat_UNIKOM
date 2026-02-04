import { useScrollAnimation } from '../hooks/useScrollAnimation'

const programKerja = [
    { title: 'Latihan Rutin', desc: 'Setiap Selasa & Kamis' },
    { title: 'Persiapan Kompetisi', desc: 'Program intensif kejuaraan' },
    { title: 'Rekrutmen Anggota', desc: 'Setiap awal semester' },
    { title: 'Workshop & Seminar', desc: 'Dengan pesilat profesional' },
    { title: 'Kegiatan Sosial', desc: 'Bakti sosial bersama' },
    { title: 'Gathering Tahunan', desc: 'Acara kebersamaan' },
]

export function VisiMisi() {
    const animation = useScrollAnimation()

    return (
        <section id="visi-misi" className="py-32 bg-[#0a0a0a] relative">
            {/* Top Line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a1a1a] to-transparent" />

            <div className="max-w-5xl mx-auto px-8">
                {/* Visi Misi - Simple */}
                <div
                    ref={animation.ref}
                    className={`text-center mb-24 scroll-animate ${animation.isVisible ? 'animate-in' : ''}`}
                >
                    <span className="inline-block text-[11px] font-medium tracking-[0.3em] uppercase text-[#6b6b6b] mb-8">
                        Visi & Misi
                    </span>

                    {/* Visi */}
                    <div className="mb-10">
                        <h3 className="text-xs uppercase tracking-[0.2em] text-[#4d4d4d] mb-4">Visi</h3>
                        <p className="font-display text-xl md:text-2xl font-medium text-[#c0c0c0] max-w-2xl mx-auto leading-relaxed">
                            Menjadi UKM Pencak Silat terdepan yang menghasilkan pesilat berprestasi dan berkarakter.
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="w-16 h-px bg-[#2d2d2d] mx-auto mb-10" />

                    {/* Misi */}
                    <div>
                        <h3 className="text-xs uppercase tracking-[0.2em] text-[#4d4d4d] mb-6">Misi</h3>
                        <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
                            <span className="px-4 py-2 bg-[#0f0f0f] border border-[#1a1a1a] text-sm text-[#8b8b8b]">Latihan Berkualitas</span>
                            <span className="px-4 py-2 bg-[#0f0f0f] border border-[#1a1a1a] text-sm text-[#8b8b8b]">Prestasi Nasional</span>
                            <span className="px-4 py-2 bg-[#0f0f0f] border border-[#1a1a1a] text-sm text-[#8b8b8b]">Karakter Pesilat</span>
                            <span className="px-4 py-2 bg-[#0f0f0f] border border-[#1a1a1a] text-sm text-[#8b8b8b]">Komunitas Solid</span>
                        </div>
                    </div>
                </div>

                {/* Program Kerja */}
                <div className={`scroll-animate ${animation.isVisible ? 'animate-in' : ''}`}>
                    <div className="text-center mb-10">
                        <span className="inline-block text-[11px] font-medium tracking-[0.3em] uppercase text-[#6b6b6b] mb-4">
                            Program Kerja
                        </span>
                        <h2 className="font-display text-2xl md:text-3xl font-bold">
                            Kegiatan <span className="text-[#6b6b6b]">Tahunan</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {programKerja.map((program, index) => (
                            <div
                                key={index}
                                className="group p-5 bg-[#0f0f0f] border border-[#1a1a1a] transition-all duration-300 hover:border-[#2d2d2d]"
                            >
                                <div className="text-[10px] text-[#3d3d3d] font-medium mb-2">0{index + 1}</div>
                                <h3 className="text-sm font-medium mb-1 group-hover:text-white transition-colors">
                                    {program.title}
                                </h3>
                                <p className="text-xs text-[#4d4d4d]">{program.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
