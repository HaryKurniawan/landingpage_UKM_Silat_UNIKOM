import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { Plus, Trash2, Save, Loader2, Link as IconLink, Mail, Phone, MapPin, Calendar } from 'lucide-react'
import type { SiteSettings, TrainingSchedule } from '../../../types'

const INITIAL_SCHEDULE: TrainingSchedule = {
    id: '',
    day: 'Senin',
    time: '16:00 - 18:00',
    location: 'Sekretariat UKM',
    activity: 'Latihan Rutin'
}

const INITIAL_SETTINGS: SiteSettings = {
    id: 1,
    email: '',
    phone: '',
    instagram_url: '',
    youtube_url: '',
    address: '',
    visi: '',
    misi: [],
    training_schedule: []
}

export function SettingsPage() {
    const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS)
    const [loading, setLoading] = useState(true)
    const [savingContact, setSavingContact] = useState(false)
    const [savingSchedule, setSavingSchedule] = useState(false)
    const [savingVisiMisi, setSavingVisiMisi] = useState(false)

    useEffect(() => {
        fetchSettings()
    }, [])

    const fetchSettings = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('site_settings')
                .select('*')
                .single()

            if (error && error.code !== 'PGRST116') throw error

            if (data) {
                setSettings({
                    ...data,
                    misi: data.misi || [] // Ensure array
                })
            } else {
                await supabase.from('site_settings').insert([INITIAL_SETTINGS])
            }
        } catch (error) {
            console.error('Error fetching settings:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSaveContact = async () => {
        setSavingContact(true)
        try {
            const { error } = await supabase
                .from('site_settings')
                .upsert({
                    id: 1,
                    email: settings.email,
                    phone: settings.phone,
                    instagram_url: settings.instagram_url,
                    youtube_url: settings.youtube_url,
                    address: settings.address,
                    // Preserve other fields
                    visi: settings.visi,
                    misi: settings.misi,
                    training_schedule: settings.training_schedule
                })

            if (error) throw error
            alert('Contact info saved!')
        } catch (error) {
            console.error('Error saving contact:', error)
            alert('Failed to save contact info')
        } finally {
            setSavingContact(false)
        }
    }

    const handleSaveSchedule = async () => {
        setSavingSchedule(true)
        try {
            const { error } = await supabase
                .from('site_settings')
                .upsert({
                    ...settings,
                    id: 1,
                    training_schedule: settings.training_schedule
                })

            if (error) throw error
            alert('Schedule saved!')
        } catch (error) {
            console.error('Error saving schedule:', error)
            alert('Failed to save schedule')
        } finally {
            setSavingSchedule(false)
        }
    }

    const handleSaveVisiMisi = async () => {
        setSavingVisiMisi(true)
        try {
            const { error } = await supabase
                .from('site_settings')
                .upsert({
                    ...settings,
                    id: 1,
                    visi: settings.visi,
                    misi: settings.misi
                })

            if (error) throw error
            alert('Visi & Misi saved!')
        } catch (error) {
            console.error('Error saving Visi Misi:', error)
            alert('Failed to save Visi & Misi')
        } finally {
            setSavingVisiMisi(false)
        }
    }

    const updateField = (field: keyof SiteSettings, value: any) => {
        setSettings(prev => ({ ...prev, [field]: value }))
    }

    const addSchedule = () => {
        const newSchedule = { ...INITIAL_SCHEDULE, id: crypto.randomUUID() }
        setSettings(prev => ({
            ...prev,
            training_schedule: [...prev.training_schedule, newSchedule]
        }))
    }

    const updateSchedule = (id: string, field: keyof TrainingSchedule, value: string) => {
        setSettings(prev => ({
            ...prev,
            training_schedule: prev.training_schedule.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        }))
    }

    const removeSchedule = (id: string) => {
        setSettings(prev => ({
            ...prev,
            training_schedule: prev.training_schedule.filter(item => item.id !== id)
        }))
    }

    const addMisi = () => {
        setSettings(prev => ({
            ...prev,
            misi: [...(prev.misi || []), '']
        }))
    }

    const updateMisi = (index: number, value: string) => {
        const newMisi = [...(settings.misi || [])]
        newMisi[index] = value
        setSettings(prev => ({ ...prev, misi: newMisi }))
    }

    const removeMisi = (index: number) => {
        const newMisi = [...(settings.misi || [])]
        newMisi.splice(index, 1)
        setSettings(prev => ({ ...prev, misi: newMisi }))
    }

    if (loading) return <div className="text-center py-12 text-[#6b6b6b]">Loading settings...</div>

    return (
        <div className="space-y-8 max-w-4xl">
            <div className="sticky top-0 bg-[#0a0a0a] py-4 z-10 border-b border-[#1a1a1a]">
                <h1 className="font-display text-3xl font-bold mb-1">Pengaturan</h1>
                <p className="text-[#6b6b6b] text-sm">Kelola kontak, visi misi dan jadwal latihan</p>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* Contact Info */}
                <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl p-6 md:p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Phone size={20} className="text-white" />
                            Kontak & Sosmed
                        </h2>
                        <button
                            onClick={handleSaveContact}
                            disabled={savingContact}
                            className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#e6e6e6] transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            {savingContact ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                            <span>Simpan</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-medium text-[#6b6b6b] uppercase tracking-wider mb-2">WhatsApp / Phone</label>
                            <div className="relative">
                                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4d4d4d]" />
                                <input
                                    type="text"
                                    value={settings.phone}
                                    onChange={e => updateField('phone', e.target.value)}
                                    placeholder="+62 8..."
                                    className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-[#6b6b6b] uppercase tracking-wider mb-2">Email</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4d4d4d]" />
                                <input
                                    type="email"
                                    value={settings.email}
                                    onChange={e => updateField('email', e.target.value)}
                                    placeholder="email@example.com"
                                    className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-[#6b6b6b] uppercase tracking-wider mb-2">Instagram URL</label>
                            <div className="relative">
                                <IconLink size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4d4d4d]" />
                                <input
                                    type="url"
                                    value={settings.instagram_url}
                                    onChange={e => updateField('instagram_url', e.target.value)}
                                    placeholder="https://instagram.com/..."
                                    className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-[#6b6b6b] uppercase tracking-wider mb-2">YouTube URL</label>
                            <div className="relative">
                                <IconLink size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4d4d4d]" />
                                <input
                                    type="url"
                                    value={settings.youtube_url}
                                    onChange={e => updateField('youtube_url', e.target.value)}
                                    placeholder="https://youtube.com/..."
                                    className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs font-medium text-[#6b6b6b] uppercase tracking-wider mb-2">Alamat Sekretariat</label>
                            <div className="relative">
                                <MapPin size={16} className="absolute left-3 top-3 text-[#4d4d4d]" />
                                <textarea
                                    value={settings.address}
                                    onChange={e => updateField('address', e.target.value)}
                                    rows={3}
                                    className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-white transition-colors resize-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visi Misi */}
                <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl p-6 md:p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <span className="text-xl">🎯</span> Visi & Misi
                        </h2>
                        <button
                            onClick={handleSaveVisiMisi}
                            disabled={savingVisiMisi}
                            className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#e6e6e6] transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            {savingVisiMisi ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                            <span>Simpan</span>
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-medium text-[#6b6b6b] uppercase tracking-wider mb-2">Visi</label>
                            <textarea
                                value={settings.visi || ''}
                                onChange={e => updateField('visi', e.target.value)}
                                rows={3}
                                placeholder="Masukkan Visi UKM..."
                                className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg p-4 text-white focus:outline-none focus:border-white transition-colors resize-none"
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-xs font-medium text-[#6b6b6b] uppercase tracking-wider">Misi</label>
                                <button onClick={addMisi} className="text-xs text-white hover:underline flex items-center gap-1">
                                    <Plus size={12} /> Tambah Misi
                                </button>
                            </div>
                            <div className="space-y-3">
                                {settings.misi && settings.misi.map((item, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={item}
                                            onChange={e => updateMisi(index, e.target.value)}
                                            placeholder={`Misi ${index + 1}`}
                                            className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white transition-colors"
                                        />
                                        <button
                                            onClick={() => removeMisi(index)}
                                            className="p-2 text-[#4d4d4d] hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                                {(!settings.misi || settings.misi.length === 0) && (
                                    <div className="text-sm text-[#4d4d4d] italic">Belum ada misi.</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Training Schedule */}
                <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl p-6 md:p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Calendar size={20} className="text-white" />
                                Jadwal Latihan
                            </h2>
                            <button
                                onClick={addSchedule}
                                className="text-xs border border-[#2d2d2d] text-[#8b8b8b] hover:text-white hover:border-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                            >
                                <Plus size={14} /> Tambah Jadwal
                            </button>
                        </div>

                        <button
                            onClick={handleSaveSchedule}
                            disabled={savingSchedule}
                            className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#e6e6e6] transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            {savingSchedule ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                            <span>Simpan</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {settings.training_schedule.length === 0 && (
                            <div className="col-span-full text-center py-12 border border-dashed border-[#2d2d2d] rounded-xl text-[#6b6b6b] text-sm">
                                Belum ada jadwal latihan. Klik "Tambah Jadwal" untuk membuat baru.
                            </div>
                        )}

                        {settings.training_schedule.map((item) => (
                            <div key={item.id} className="bg-[#0a0a0a] border border-[#2d2d2d] rounded-xl p-5 group hover:border-[#4d4d4d] transition-colors">
                                <div className="flex justify-between items-start mb-4">
                                    <input
                                        type="text"
                                        value={item.activity}
                                        onChange={e => updateSchedule(item.id, 'activity', e.target.value)}
                                        placeholder="Nama Kegiatan"
                                        className="bg-transparent border-none text-white font-bold text-lg focus:outline-none placeholder:text-[#4d4d4d] w-full"
                                    />
                                    <button
                                        onClick={() => removeSchedule(item.id)}
                                        className="text-[#4d4d4d] hover:text-red-500 transition-colors p-1"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-[#6b6b6b]" />
                                        <input
                                            type="text"
                                            value={item.day}
                                            onChange={e => updateSchedule(item.id, 'day', e.target.value)}
                                            placeholder="Hari (e.g. Senin)"
                                            className="bg-transparent border-b border-[#2d2d2d] focus:border-white text-sm py-1 focus:outline-none transition-colors w-full"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[#6b6b6b] text-xs uppercase font-bold tracking-wider w-4">Jam</span>
                                        <input
                                            type="text"
                                            value={item.time}
                                            onChange={e => updateSchedule(item.id, 'time', e.target.value)}
                                            placeholder="16:00 - 18:00"
                                            className="bg-transparent border-b border-[#2d2d2d] focus:border-white text-sm py-1 focus:outline-none transition-colors w-full"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin size={14} className="text-[#6b6b6b]" />
                                        <input
                                            type="text"
                                            value={item.location}
                                            onChange={e => updateSchedule(item.id, 'location', e.target.value)}
                                            placeholder="Lokasi Latihan"
                                            className="bg-transparent border-b border-[#2d2d2d] focus:border-white text-sm py-1 focus:outline-none transition-colors w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
