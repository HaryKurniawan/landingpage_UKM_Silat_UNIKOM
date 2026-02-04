import { IconInstagram, IconMail, IconPhone } from './Icons'

export function Footer() {
    return (
        <footer className="bg-[#0a0a0a] pt-20 pb-8 border-t border-[#1a1a1a]">
            <div className="max-w-5xl mx-auto px-8">
                {/* Main Footer */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="font-display text-3xl font-bold mb-2 tracking-tight">
                            SILAT
                        </div>
                        <div className="text-sm text-[#4d4d4d] tracking-[0.15em] uppercase mb-6">
                            UNIKOM
                        </div>
                        <p className="text-[#6b6b6b] leading-relaxed mb-6 max-w-sm">
                            Unit Kegiatan Mahasiswa Pencak Silat Universitas Komputer Indonesia
                        </p>
                        <div className="flex gap-2">
                            {[
                                { icon: <IconInstagram />, label: 'Instagram' },
                                { icon: <IconMail />, label: 'Email' },
                                { icon: <IconPhone />, label: 'Phone' },
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="w-10 h-10 flex items-center justify-center border border-[#1a1a1a] text-[#4d4d4d] transition-all duration-300 hover:bg-white hover:text-[#0a0a0a] hover:border-white"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#6b6b6b] mb-6">Menu</h4>
                        <ul className="flex flex-col gap-3">
                            {['Beranda', 'Tentang', 'Program', 'Pengurus'].map((item) => (
                                <li key={item}>
                                    <a
                                        href={`#${item.toLowerCase()}`}
                                        className="text-[#4d4d4d] text-sm transition-colors duration-300 hover:text-white"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#6b6b6b] mb-6">Kontak</h4>
                        <ul className="flex flex-col gap-3">
                            <li className="text-[#4d4d4d] text-sm">ukmsilat@unikom.ac.id</li>
                            <li className="text-[#4d4d4d] text-sm">+62 812 3456 7890</li>
                            <li className="text-[#4d4d4d] text-sm">Gedung Olahraga UNIKOM</li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#1a1a1a] mb-8" />

                {/* Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-[#3d3d3d]">
                        © 2024 UKM Silat UNIKOM
                    </p>
                    <p className="text-xs text-[#3d3d3d]">
                        Designed with ♥ for Indonesian Culture
                    </p>
                </div>
            </div>
        </footer>
    )
}
