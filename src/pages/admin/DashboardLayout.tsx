import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import {
    Users,
    Activity,
    Award,
    LogOut,
    Ticket,
    Settings
} from 'lucide-react'
import logo from '../../assets/logo.png'

export function AdminLayout() {
    const location = useLocation()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate('/admin/login')
    }

    const isActive = (path: string) => location.pathname === path

    const navItems = [
        { path: '/admin/pengurus', label: 'Pengurus', icon: Users },
        { path: '/admin/aktivitas', label: 'Aktivitas', icon: Activity },
        { path: '/admin/events', label: 'Events', icon: Ticket },
        { path: '/admin/prestasi', label: 'Prestasi', icon: Award },
        { path: '/admin/settings', label: 'Pengaturan', icon: Settings },
    ]

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col md:flex-row pb-20 md:pb-0">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 border-r border-[#1a1a1a] bg-[#0f0f0f] p-6 sticky top-0 h-screen">
                <div className="mb-10 flex items-center gap-3 px-2">
                    <img src={logo} alt="UKM Silat" className="w-10 h-10 object-contain" />
                    <span className="font-display text-lg font-bold tracking-wider text-[#8b8b8b]">ADMIN</span>
                </div>

                <nav className="flex-1 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive(item.path)
                                    ? 'bg-white text-black font-medium shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                                    : 'text-[#6b6b6b] hover:bg-[#1a1a1a] hover:text-white'
                                    }`}
                            >
                                <Icon size={20} className={isActive(item.path) ? "text-black" : "group-hover:text-white transition-colors"} />
                                <span>{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-[#6b6b6b] hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-colors mt-auto"
                >
                    <LogOut size={20} />
                    <span>Keluar</span>
                </button>
            </aside>

            {/* Mobile Header (Simplified) */}
            <header className="md:hidden flex items-center justify-between p-4 border-b border-[#1a1a1a] bg-[#0f0f0f] sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="UKM Silat" className="w-8 h-8 object-contain" />
                    <span className="font-display font-medium text-[#8b8b8b]">Admin Panel</span>
                </div>
                {/* Logout button directly in header for mobile since menu is gone */}
                <button
                    onClick={handleLogout}
                    className="p-2 text-[#8b8b8b] hover:text-red-500 active:scale-95 transition-transform"
                    title="Keluar"
                >
                    <LogOut size={20} />
                </button>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 w-full max-w-7xl mx-auto">
                <Outlet />
            </main>

            {/* Mobile Bottom Nav (App-like) */}
            <div className="md:hidden fixed bottom-4 left-4 right-4 bg-[#0f0f0f]/90 backdrop-blur-md border border-[#1a1a1a] rounded-2xl shadow-2xl flex justify-around items-center h-16 z-40 px-2">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.path)
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all duration-300 ${active ? 'text-white' : 'text-[#4d4d4d]'}`}
                        >
                            <div className={`p-1.5 rounded-xl transition-all duration-300 ${active ? 'bg-[#1a1a1a]' : ''}`}>
                                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                            </div>
                            {active && <span className="text-[9px] font-medium tracking-wide animate-scale-in">{item.label}</span>}
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
