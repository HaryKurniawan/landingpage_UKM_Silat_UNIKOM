import { IconArrowRight } from './Icons'

export function Hero() {
    return (
        <section id="beranda" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#0a0a0a]" />

            {/* Subtle Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_70%)]" />

            {/* Animated Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-[#3d3d3d] to-transparent opacity-0 animate-fade-in-up delay-1000" />

            {/* Content */}
            <div className="relative z-10 text-center px-8 max-w-4xl mx-auto">
                <span className="inline-block px-6 py-2 border border-[#2d2d2d] rounded-full text-[11px] font-medium tracking-[0.25em] uppercase text-[#6b6b6b] mb-10 opacity-0 animate-fade-in-up">
                    Unit Kegiatan Mahasiswa
                </span>

                <h1 className="font-display font-bold leading-[0.9] tracking-tight mb-6">
                    <span className="block text-[clamp(4rem,12vw,10rem)] opacity-0 animate-fade-in-up delay-200">
                        Pencak
                    </span>
                    <span className="block text-[clamp(4rem,12vw,10rem)] text-transparent bg-clip-text bg-gradient-to-r from-[#fafafa] via-[#8b8b8b] to-[#4d4d4d] opacity-0 animate-fade-in-up delay-300">
                        Silat
                    </span>
                </h1>

                <div className="flex items-center justify-center gap-4 mb-8 opacity-0 animate-fade-in-up delay-400">
                    <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#3d3d3d]" />
                    <span className="font-display text-2xl tracking-[0.3em] text-[#4d4d4d] uppercase">UNIKOM</span>
                    <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#3d3d3d]" />
                </div>

                <p className="max-w-md mx-auto text-[#6b6b6b] text-lg leading-relaxed mb-12 opacity-0 animate-fade-in-up delay-500">
                    Membangun karakter, meraih prestasi, dan melestarikan budaya bangsa.
                </p>

                <div className="flex items-center justify-center opacity-0 animate-fade-in-up delay-600">
                    <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0a0a0a] text-sm font-semibold tracking-[0.1em] uppercase transition-all duration-500 hover:bg-[#e8e8e8] hover:gap-4">
                        <span>Bergabung</span>
                        <IconArrowRight />
                    </button>
                </div>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0 animate-fade-in-up delay-800">
                <div className="w-5 h-8 border border-[#3d3d3d] rounded-full flex justify-center pt-2">
                    <div className="w-1 h-2 bg-[#6b6b6b] rounded-full animate-bounce" />
                </div>
            </div>
        </section>
    )
}
