import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { AdminCard } from '../../../components/admin/AdminCard'
import { ImageUpload } from '../../../components/admin/ImageUpload'
import { Plus, X } from 'lucide-react'
import type { Aktivitas } from '../../../types'

const INITIAL_FORM: Partial<Aktivitas> = {
    slug: '',
    title: '',
    subtitle: '',
    description: '',
    image_url: ''
}

export function AktivitasPage() {
    const [items, setItems] = useState<Aktivitas[]>([])
    const [loading, setLoading] = useState(true)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [formData, setFormData] = useState<Partial<Aktivitas>>(INITIAL_FORM)
    const [editingId, setEditingId] = useState<number | null>(null)

    useEffect(() => {
        fetchItems()
    }, [])

    const fetchItems = async () => {
        setLoading(true)
        const { data } = await supabase.from('aktivitas').select('*').order('id', { ascending: true })
        if (data) setItems(data as Aktivitas[])
        setLoading(false)
    }

    const getUniqueSlug = async (baseSlug: string, currentId: number | null) => {
        let slug = baseSlug
        let count = 0
        let isUnique = false

        while (!isUnique) {
            const checkSlug = count === 0 ? slug : `${slug}-${count}`
            let query = supabase.from('aktivitas').select('id').eq('slug', checkSlug)

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
                const { error } = await supabase.from('aktivitas').update(dataToSave).eq('id', editingId)
                if (error) throw error
            } else {
                const { error } = await supabase.from('aktivitas').insert([dataToSave])
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
            await supabase.from('aktivitas').delete().eq('id', id)
            fetchItems()
        } catch (error) {
            console.error('Error deleting:', error)
        }
    }

    const openEdit = (item: Aktivitas) => {
        setFormData(item)
        setEditingId(item.id)
        setIsFormOpen(true)
    }

    // Auto-generate slug from title
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
        setFormData(prev => ({ ...prev, title, slug: editingId ? prev.slug : slug }))
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="font-display text-3xl font-bold mb-1">Aktivitas</h1>
                    <p className="text-[#6b6b6b] text-sm">Kelola kegiatan latihan dan non-latihan</p>
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
                    <span>Tambah Aktivitas</span>
                </button>
            </div>

            {/* List */}
            {loading ? (
                <div className="text-center text-[#6b6b6b] py-12">Loading...</div>
            ) : items.length === 0 ? (
                <div className="text-center text-[#6b6b6b] py-12 border border-dashed border-[#1a1a1a] rounded-xl">
                    Belum ada data aktivitas
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <AdminCard
                            key={item.id}
                            title={item.title}
                            subtitle={item.subtitle || ''}
                            image={item.image_url}
                            onEdit={() => openEdit(item)}
                            onDelete={() => handleDelete(item.id)}
                        />
                    ))}
                </div>
            )}

            {/* Modal Form */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">{editingId ? 'Edit Aktivitas' : 'Tambah Aktivitas'}</h2>
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

                            <div>
                                <label className="block text-xs font-medium text-[#4d4d4d] uppercase tracking-wider mb-2">Subtitle</label>
                                <input
                                    type="text"
                                    value={formData.subtitle || ''}
                                    onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                                    className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-[#4d4d4d] uppercase tracking-wider mb-2">Deskripsi</label>
                                <textarea
                                    value={formData.description || ''}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    rows={4}
                                    className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white"
                                    required
                                />
                            </div>

                            <ImageUpload
                                label="Foto Aktivitas"
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
