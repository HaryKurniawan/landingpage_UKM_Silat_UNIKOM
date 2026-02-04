import { Edit2, Trash2, Image as ImageIcon } from 'lucide-react'

interface AdminCardProps {
    title: string
    subtitle?: string
    image?: string
    onEdit: () => void
    onDelete: () => void
    children?: React.ReactNode
}

export function AdminCard({ title, subtitle, image, onEdit, onDelete, children }: AdminCardProps) {
    return (
        <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl overflow-hidden hover:border-[#333] transition-all duration-300 group flex flex-col h-full">
            <div className="p-4 flex gap-4 items-start flex-1">
                {image ? (
                    <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-[#0a0a0a] border border-[#1a1a1a] shadow-inner">
                        <img src={image} alt={title} className="w-full h-full object-cover" />
                    </div>
                ) : (
                    <div className="w-14 h-14 rounded-lg flex-shrink-0 bg-[#0a0a0a] border border-[#1a1a1a] flex items-center justify-center text-[#2d2d2d] group-hover:text-[#4d4d4d] transition-colors">
                        <ImageIcon size={20} />
                    </div>
                )}

                <div className="flex-1 min-w-0 pt-0.5">
                    <h3 className="font-medium text-white truncate group-hover:text-gray-300 transition-colors text-sm md:text-base">
                        {title}
                    </h3>
                    {subtitle && (
                        <p className="text-xs text-[#6b6b6b] truncate mt-0.5">
                            {subtitle}
                        </p>
                    )}
                    {children && <div className="mt-2">{children}</div>}
                </div>
            </div>

            <div className="bg-[#0a0a0a]/50 border-t border-[#1a1a1a] p-2 flex justify-end gap-1">
                <button
                    onClick={onEdit}
                    className="p-2 text-[#8b8b8b] hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-all"
                    title="Edit"
                >
                    <Edit2 size={16} />
                </button>
                <div className="w-px h-6 bg-[#1a1a1a] my-auto mx-1" />
                <button
                    onClick={onDelete}
                    className="p-2 text-[#8b8b8b] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                    title="Hapus"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    )
}
