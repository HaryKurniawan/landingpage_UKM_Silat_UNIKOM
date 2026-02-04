import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { Plus, X, Edit2, Trash2, Medal } from 'lucide-react'
import type { Prestasi } from '../../../types'

const INITIAL_FORM: Partial<Prestasi> = {
    title: '',
    event_name: '',
    year: '2024',
    medal: 'gold'
}

export function PrestasiPage() {
    const [items, setItems] = useState<Prestasi[]>([])
    const [loading, setLoading] = useState(true)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [formData, setFormData] = useState<Partial<Prestasi>>(INITIAL_FORM)
    const [editingId, setEditingId] = useState<number | null>(null)

    useEffect(() => {
        fetchItems()
    }, [])

    const fetchItems = async () => {
        setLoading(true)
        const { data } = await supabase.from('prestasi').select('*').order('id', { ascending: false })
        if (data) setItems(data as Prestasi[])
        setLoading(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (editingId) {
                const { error } = await supabase.from('prestasi').update(formData).eq('id', editingId)
                if (error) throw error
            } else {
                const { error } = await supabase.from('prestasi').insert([formData])
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
            await supabase.from('prestasi').delete().eq('id', id)
            fetchItems()
        } catch (error) {
            console.error('Error deleting:', error)
        }
    }

    const openEdit = (item: Prestasi) => {
        setFormData(item)
        setEditingId(item.id)
        setIsFormOpen(true)
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="font-display text-3xl font-bold mb-1">Daftar Prestasi</h1>
                    <p className="text-[#6b6b6b] text-sm">Catatan medali dan penghargaan</p>
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
                    <span>Tambah Prestasi</span>
                </button>
            </div>

            {loading ? (
                <div className="text-center text-[#6b6b6b] py-12">Loading...</div>
            ) : items.length === 0 ? (
                <div className="text-center text-[#6b6b6b] py-12 border border-dashed border-[#1a1a1a] rounded-xl">
                    Belum ada data prestasi
                </div>
            ) : (
                <div className="space-y-3">
                    {items.map((item) => (
                        <div key={item.id} className="bg-[#0f0f0f] border border-[#1a1a1a] p-4 flex items-center justify-between rounded-xl hover:border-[#333] transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.medal === 'gold' ? 'bg-yellow-500/10 text-yellow-500' : item.medal === 'silver' ? 'bg-gray-400/10 text-gray-400' : item.medal === 'bronze' ? 'bg-orange-500/10 text-orange-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                    <Medal size={20} />
                                </div>
                                <div>
                                    <h3 className="font-medium text-white text-sm md:text-base">{item.title}</h3>
                                    <p className="text-xs text-[#6b6b6b]">{item.event_name} • {item.year}</p>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                <button onClick={() => openEdit(item)} className="p-2 text-[#8b8b8b] hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-all" title="Edit"><Edit2 size={16} /></button>
                                <button onClick={() => handleDelete(item.id)} className="p-2 text-[#8b8b8b] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all" title="Hapus"><Trash2 size={16} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">{editingId ? 'Edit Prestasi' : 'Tambah Prestasi'}</h2>
                            <button onClick={() => setIsFormOpen(false)} className="p-2 bg-[#1a1a1a] rounded-full text-[#6b6b6b] hover:text-white hover:bg-[#2d2d2d] transition-colors"><X size={16} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-[#4d4d4d] uppercase tracking-wider mb-2">Judul Prestasi</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white"
                                    placeholder="Juara 1 Kategori Tanding"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-[#4d4d4d] uppercase tracking-wider mb-2">Nama Event</label>
                                <input
                                    type="text"
                                    value={formData.event_name}
                                    onChange={e => setFormData({ ...formData, event_name: e.target.value })}
                                    className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white"
                                    placeholder="Kejurnas 2024"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-[#4d4d4d] uppercase tracking-wider mb-2">Tahun</label>
                                    <input
                                        type="text"
                                        value={formData.year}
                                        onChange={e => setFormData({ ...formData, year: e.target.value })}
                                        className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-[#4d4d4d] uppercase tracking-wider mb-2">Medali</label>
                                    <select
                                        value={formData.medal}
                                        onChange={e => setFormData({ ...formData, medal: e.target.value as any })}
                                        className="w-full bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white"
                                    >
                                        <option value="gold">Emas</option>
                                        <option value="silver">Perak</option>
                                        <option value="bronze">Perunggu</option>
                                        <option value="other">Lainnya</option>
                                    </select>
                                </div>
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
