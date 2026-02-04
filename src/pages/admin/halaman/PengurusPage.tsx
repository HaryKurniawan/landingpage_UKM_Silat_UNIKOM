import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { AdminCard } from '../../../components/admin/AdminCard'
import { Plus, Sparkles, X } from 'lucide-react'

import type { Pengurus } from '../../../types'

const INITIAL_FORM: Partial<Pengurus> = {
    name: '',
    position: '',
    initials: '',
    size: 'small',
    order_index: 0,
    instagram_url: '',
    email: ''
}

export function PengurusPage() {
    const [items, setItems] = useState<Pengurus[]>([])
    const [loading, setLoading] = useState(true)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [formData, setFormData] = useState<Partial<Pengurus>>(INITIAL_FORM)
    const [editingId, setEditingId] = useState<number | null>(null)

    useEffect(() => {
        fetchItems()
    }, [])

    const fetchItems = async () => {
        setLoading(true)
        const { data } = await supabase.from('pengurus').select('*').order('order_index', { ascending: true })
        if (data) setItems(data as Pengurus[])
        setLoading(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (editingId) {
                const { error } = await supabase.from('pengurus').update(formData).eq('id', editingId)
                if (error) throw error
            } else {
                const { error } = await supabase.from('pengurus').insert([formData])
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
            await supabase.from('pengurus').delete().eq('id', id)
            fetchItems()
        } catch (error) {
            console.error('Error deleting:', error)
        }
    }

    const handleGenerateTemplate = async () => {
        if (items.length > 0) {
            if (!confirm('List pengurus tidak kosong. Tambahkan template default (kemungkinan duplikat)?')) return
        }

        setLoading(true)
        const DEFAULT_STRUCTURE = [
            { name: 'Nama Ketua', position: 'Ketua Umum', initials: 'KU', size: 'large', order_index: 1 },
            { name: 'Nama Wakil', position: 'Wakil Ketua', initials: 'WK', size: 'medium', order_index: 2 },
            { name: 'Nama Sekretaris', position: 'Sekretaris', initials: 'SK', size: 'small', order_index: 3 },
            { name: 'Nama Bendahara', position: 'Bendahara', initials: 'BN', size: 'small', order_index: 4 },
            { name: 'Nama Humas', position: 'Divisi Humas', initials: 'HU', size: 'small', order_index: 5 },
            { name: 'Nama Logistik', position: 'Divisi Logistik', initials: 'LG', size: 'small', order_index: 6 },
            { name: 'Nama Pelatih', position: 'Divisi Kepelatihan', initials: 'PK', size: 'small', order_index: 7 },
        ]

        try {
            const { error } = await supabase.from('pengurus').insert(DEFAULT_STRUCTURE)
            if (error) throw error
            fetchItems()
        } catch (error) {
            console.error('Error generating template:', error)
            alert('Gagal membuat template')
        } finally {
            setLoading(false)
        }
    }

    const openEdit = (item: Pengurus) => {
        setFormData(item)
        setEditingId(item.id)
        setIsFormOpen(true)
    }


    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="font-display text-3xl font-bold mb-1">Pengurus</h1>
                    <p className="text-[#6b6b6b] text-sm">Kelola data struktur organisasi</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleGenerateTemplate}
                        className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] text-[#8b8b8b] rounded-xl font-medium hover:bg-[#2d2d2d] hover:text-white transition-colors text-sm"
                    >
                        <Sparkles size={16} />
                        <span>Generate Template</span>
                    </button>
                    <button
                        onClick={() => {
                            setFormData(INITIAL_FORM)
                            setEditingId(null)
                            setIsFormOpen(true)
                        }}
                        className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl font-bold hover:bg-[#e6e6e6] transition-colors text-sm"
                    >
                        <Plus size={16} />
                        <span>Tambah</span>
                    </button>
                </div>
            </div>

            {/* List */}
            {loading ? (
                <div className="text-center text-[#6b6b6b] py-12">Loading...</div>
            ) : items.length === 0 ? (
                <div className="text-center text-[#6b6b6b] py-12 border border-dashed border-[#1a1a1a] rounded-xl">
                    Belum ada data pengurus
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <AdminCard
                            key={item.id}
                            title={item.name}
                            subtitle={item.position}
                            onEdit={() => openEdit(item)}
                            onDelete={() => handleDelete(item.id)}
                        >
                            <div className="mt-2 text-xs text-[#4d4d4d] space-y-1">
                                <p>Initials: {item.initials}</p>
                                <p>Size: {item.size}</p>
                                <p>Order: {item.order_index}</p>
                            </div>
                        </AdminCard>
                    ))}
                </div>
            )}

            {/* Modal Form */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">{editingId ? 'Edit Pengurus' : 'Tambah Pengurus'}</h2>
                            <button onClick={() => setIsFormOpen(false)} className="p-2 bg-[#1a1a1a] rounded-full text-[#6b6b6b] hover:text-white hover:bg-[#2d2d2d] transition-colors"><X size={16} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-[#4d4d4d] uppercase tracking-wider mb-2">Nama Lengkap</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-[#4d4d4d] uppercase tracking-wider mb-2">Posisi</label>
                                    <input
                                        type="text"
                                        value={formData.position}
                                        onChange={e => setFormData({ ...formData, position: e.target.value })}
                                        className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-[#4d4d4d] uppercase tracking-wider mb-2">Inisial (2 Huruf)</label>
                                    <input
                                        type="text"
                                        maxLength={2}
                                        value={formData.initials}
                                        onChange={e => setFormData({ ...formData, initials: e.target.value.toUpperCase() })}
                                        className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-[#4d4d4d] uppercase tracking-wider mb-2">Ukuran Grid</label>
                                    <select
                                        value={formData.size}
                                        onChange={e => setFormData({ ...formData, size: e.target.value })}
                                        className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white"
                                    >
                                        <option value="small">Small (Default)</option>
                                        <option value="medium">Medium (Top Rows)</option>
                                        <option value="large">Large (Featured)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-[#4d4d4d] uppercase tracking-wider mb-2">Urutan</label>
                                    <input
                                        type="number"
                                        value={formData.order_index}
                                        onChange={e => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                                        className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-[#4d4d4d] uppercase tracking-wider mb-2">Instagram URL</label>
                                <input
                                    type="url"
                                    value={formData.instagram_url || ''}
                                    onChange={e => setFormData({ ...formData, instagram_url: e.target.value })}
                                    className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[#4d4d4d] uppercase tracking-wider mb-2">Email</label>
                                <input
                                    type="email"
                                    value={formData.email || ''}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white"
                                />
                            </div>

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
