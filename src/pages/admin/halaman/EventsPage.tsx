import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { AdminCard } from '../../../components/admin/AdminCard'
import { ImageUpload } from '../../../components/admin/ImageUpload'
import { Plus, X, Trophy } from 'lucide-react'
import type { Event } from '../../../types'

const INITIAL_FORM: Partial<Event> = {
    slug: '',
    title: '',
    date: '',
    location: '',
    description: '',
    result: '',
    image_url: '',
    status: 'upcoming'
}

export function EventsPage() {
    const [items, setItems] = useState<Event[]>([])
    const [loading, setLoading] = useState(true)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [formData, setFormData] = useState<Partial<Event>>(INITIAL_FORM)
    const [editingId, setEditingId] = useState<number | null>(null)

    useEffect(() => {
        fetchItems()
    }, [])

    const fetchItems = async () => {
        setLoading(true)
        console.log('Fetching events...')
        const { data, error } = await supabase.from('events').select('*').order('id', { ascending: false })
        if (error) {
            console.error('Error fetching events:', error)
        } else {
            console.log('Events fetched:', data)
        }
        if (data) setItems(data as Event[])
        setLoading(false)
    }

    const getUniqueSlug = async (baseSlug: string, currentId: number | null) => {
        let slug = baseSlug
        let count = 0
        let isUnique = false

        while (!isUnique) {
            const checkSlug = count === 0 ? slug : `${slug}-${count}`
            let query = supabase.from('events').select('id').eq('slug', checkSlug)

            if (currentId) {
                query = query.neq('id', currentId)
            }

            const { data, error } = await query

            if (error) throw error

            if (!data || data.length === 0) {
                isUnique = true
                slug = checkSlug
            } else {
                count++
            }
        }
        return slug
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            // Generate unique slug
            const finalSlug = await getUniqueSlug(formData.slug || '', editingId)
            const dataToSave = { ...formData, slug: finalSlug }

            if (editingId) {
                const { error } = await supabase.from('events').update(dataToSave).eq('id', editingId)
                if (error) throw error
            } else {
                const { error } = await supabase.from('events').insert([dataToSave])
                if (error) throw error
            }
            fetchItems()
            setIsFormOpen(false)
            setFormData(INITIAL_FORM)
            setEditingId(null)
        } catch (error) {
            console.error('Error saving:', error)
            alert('Gagal menyimpan data')
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Yakin ingin menghapus?')) return
        try {
            await supabase.from('events').delete().eq('id', id)
            fetchItems()
        } catch (error) {
            console.error('Error deleting:', error)
        }
    }

    const openEdit = (item: Event) => {
        setFormData(item)
        setEditingId(item.id)
        setIsFormOpen(true)
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
        setFormData(prev => ({ ...prev, title, slug: editingId ? prev.slug : slug }))
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="font-display text-3xl font-bold mb-1">Events & Kompetisi</h1>
                    <p className="text-[#6b6b6b] text-sm">Kelola jadwal dan hasil pertandingan</p>
                </div>
                <button
                    onClick={() => {
                        setFormData(INITIAL_FORM)
                        setEditingId(null)
                        setIsFormOpen(true)
                    }}
                    className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl font-bold hover:bg-[#e6e6e6] transition-colors text-sm"
                >
                    <Plus size={16} />
                    <span>Tambah Event</span>
                </button>
            </div>

            {loading ? (
                <div className="text-center text-[#6b6b6b] py-12">Loading...</div>
            ) : items.length === 0 ? (
                <div className="text-center text-[#6b6b6b] py-12 border border-dashed border-[#1a1a1a] rounded-xl">
                    Belum ada data event
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <AdminCard
                            key={item.id}
                            title={item.title}
                            subtitle={`${item.date} • ${item.location}`}
                            image={item.image_url}
                            onEdit={() => openEdit(item)}
                            onDelete={() => handleDelete(item.id)}
                        >
                            <div className="mt-2 text-xs flex gap-2">
                                <span className={`px-2 py-0.5 rounded ${item.status === 'upcoming' ? 'bg-blue-500/20 text-blue-500' : 'bg-green-500/20 text-green-500'}`}>
                                    {item.status.toUpperCase()}
                                </span>
                                {item.result && <span className="text-[#8b8b8b] truncate max-w-[150px] flex items-center gap-1"><Trophy size={12} /> {item.result}</span>}
                            </div>
                        </AdminCard>
                    ))}
                </div>
            )}

            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">{editingId ? 'Edit Event' : 'Tambah Event'}</h2>
                            <button onClick={() => setIsFormOpen(false)} className="p-2 bg-[#1a1a1a] rounded-full text-[#6b6b6b] hover:text-white hover:bg-[#2d2d2d] transition-colors"><X size={16} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-[#4d4d4d] uppercase tracking-wider mb-2">Judul</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={handleTitleChange}
                                    className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[#4d4d4d] uppercase tracking-wider mb-2">Slug</label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                    className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-[#4d4d4d] uppercase tracking-wider mb-2">Tanggal (Text)</label>
                                    <input
                                        type="text"
                                        value={formData.date}
                                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white"
                                        placeholder="Desember 2024"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-[#4d4d4d] uppercase tracking-wider mb-2">Lokasi</label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-[#4d4d4d] uppercase tracking-wider mb-2">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                                        className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white"
                                    >
                                        <option value="upcoming">Upcoming</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-[#4d4d4d] uppercase tracking-wider mb-2">Hasil (Optional)</label>
                                    <input
                                        type="text"
                                        value={formData.result || ''}
                                        onChange={e => setFormData({ ...formData, result: e.target.value })}
                                        className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white"
                                        placeholder="Juara 1..."
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-[#4d4d4d] uppercase tracking-wider mb-2">Deskripsi</label>
                                <textarea
                                    value={formData.description || ''}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white"
                                />
                            </div>

                            <ImageUpload
                                label="Cover Event"
                                currentImage={formData.image_url}
                                onUpload={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
                            />

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="px-4 py-2 text-[#8b8b8b] hover:text-white"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-[#e6e6e6] transition-colors"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
