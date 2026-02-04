import { useState, useEffect } from 'react'
import logo from '../assets/logo.png'

interface NavbarProps {
    menuOpen: boolean
    setMenuOpen: (open: boolean) => void
}

const navItems = ['Beranda', 'Tentang', 'Prestasi', 'Program', 'Pengurus', 'Kontak']

export function Navbar({ menuOpen, setMenuOpen }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('beranda')

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)

            // Detect active section
            const sections = navItems.map(item => item.toLowerCase())
            for (const section of sections.reverse()) {
                const element = document.getElementById(section)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    if (rect.top <= 150) {
                        setActiveSection(section)
                        break
                    }
                }
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close menu when clicking a link
    const handleNavClick = (item: string) => {
        setActiveSection(item.toLowerCase())
        setMenuOpen(false)
    }

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [menuOpen])

    return (
        <>
            {/* Main Navbar */}
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? 'bg-[#0a0a0a]/95 backdrop-blur-lg py-4'
                    : 'bg-transparent py-6'
                    }`}
            >
                <div className="max-w-5xl mx-auto px-8 flex justify-between items-center">
                    {/* Logo */}
                    <a href="#beranda" className="flex items-center gap-3 group relative z-[60]">
                        <img
                            src={logo}
                            alt="UKM Silat UNIKOM"
                            className="w-10 h-10 object-contain"
                        />
                        <div className="hidden sm:flex flex-col leading-none">
                            <span className="font-display text-lg font-bold tracking-tight">SILAT</span>
                            <span className="text-[9px] tracking-[0.2em] text-[#4d4d4d] uppercase">UNIKOM</span>
                        </div>
                    </a>

                    {/* Desktop Menu */}
                    <ul className="hidden lg:flex gap-10">
                        {navItems.map((item) => (
                            <li key={item}>
                                <a
                                    href={`#${item.toLowerCase()}`}
                                    className={`relative text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-300 hover:text-white ${activeSection === item.toLowerCase() ? 'text-white' : 'text-[#8b8b8b]'
                                        }`}
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Toggle Button - Always visible on mobile */}
                    <button
                        className="relative z-[60] flex flex-col justify-center items-center w-10 h-10 lg:hidden"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span
                            className={`block w-6 h-[2px] bg-white transition-all duration-300 ease-out ${menuOpen ? 'rotate-45 translate-y-[1px]' : '-translate-y-1'
                                }`}
                        />
                        <span
                            className={`block w-6 h-[2px] bg-white transition-all duration-300 ease-out ${menuOpen ? 'opacity-0 scale-0' : 'opacity-100'
                                }`}
                        />
                        <span
                            className={`block w-6 h-[2px] bg-white transition-all duration-300 ease-out ${menuOpen ? '-rotate-45 -translate-y-[1px]' : 'translate-y-1'
                                }`}
                        />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-[55] bg-[#0a0a0a] lg:hidden transition-all duration-500 ease-out ${menuOpen
                    ? 'opacity-100 visible'
                    : 'opacity-0 invisible pointer-events-none'
                    }`}
            >
                {/* Close Button - Fixed in top right */}
                <button
                    className={`absolute top-6 right-8 z-[60] w-12 h-12 flex items-center justify-center border border-[#3d3d3d] rounded-full transition-all duration-500 hover:border-white hover:rotate-90 ${menuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                        }`}
                    style={{ transitionDelay: menuOpen ? '300ms' : '0ms' }}
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close menu"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                {/* Background Pattern */}
                <div
                    className={`absolute inset-0 transition-opacity duration-700 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(30,30,30,0.5) 0%, transparent 50%)'
                    }}
                />

                {/* Menu Content */}
                <div className="relative h-full flex flex-col items-center justify-center px-8">
                    <ul className="flex flex-col items-center gap-6">
                        {navItems.map((item, index) => (
                            <li
                                key={item}
                                className={`overflow-hidden transition-all duration-500 ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                    }`}
                                style={{
                                    transitionDelay: menuOpen ? `${index * 80}ms` : '0ms'
                                }}
                            >
                                <a
                                    href={`#${item.toLowerCase()}`}
                                    className={`block font-display text-3xl sm:text-4xl font-bold transition-colors duration-300 ${activeSection === item.toLowerCase()
                                        ? 'text-white'
                                        : 'text-[#4d4d4d] hover:text-white'
                                        }`}
                                    onClick={() => handleNavClick(item)}
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Bottom Info */}
                    <div
                        className={`absolute bottom-12 left-0 right-0 text-center transition-all duration-500 ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                            }`}
                        style={{ transitionDelay: menuOpen ? '500ms' : '0ms' }}
                    >
                        <p className="text-xs text-[#4d4d4d] tracking-[0.2em] uppercase">
                            UKM Silat UNIKOM
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
