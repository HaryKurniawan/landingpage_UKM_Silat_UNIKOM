import { useState } from 'react'
import { Loader2, Upload } from 'lucide-react'

interface ImageUploadProps {
    onUpload: (url: string) => void
    currentImage?: string
    label?: string
    maxSize?: number // in MB
}

export function ImageUpload({ onUpload, currentImage, label = "Upload Image", maxSize = 2 }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [preview, setPreview] = useState(currentImage)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate size
        if (file.size > maxSize * 1024 * 1024) {
            alert(`File terlalu besar! Maksimal ${maxSize}MB`)
            return
        }

        setUploading(true)
        const formData = new FormData()
        formData.append('file', file)

        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME

        if (!uploadPreset || !cloudName) {
            console.error('Cloudinary credentials missing')
            alert('Cloudinary config missing in .env')
            setUploading(false)
            return
        }

        formData.append('upload_preset', uploadPreset)

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: formData,
            })
            const data = await response.json()
            if (data.secure_url) {
                onUpload(data.secure_url)
                setPreview(data.secure_url)
            } else {
                throw new Error('Upload failed')
            }
        } catch (error) {
            console.error('Error uploading image:', error)
            alert('Gagal mengupload gambar')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="w-full">
            <label className="block text-xs font-medium text-[#4d4d4d] uppercase tracking-wider mb-2">
                {label} <span className="text-[#2d2d2d] ml-1">(Max {maxSize}MB)</span>
            </label>
            <div className="flex items-center gap-4">
                {preview && (
                    <div className="w-20 h-20 rounded-lg overflow-hidden border border-[#2d2d2d] bg-[#0f0f0f] relative group">
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-[10px] text-white">Change</span>
                        </div>
                    </div>
                )}

                <label className={`relative cursor-pointer flex items-center gap-2 px-4 py-3 rounded-lg border border-dashed border-[#2d2d2d] bg-[#0f0f0f] text-sm text-[#8b8b8b] hover:border-white hover:text-white transition-all ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                    {uploading ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            <span>Uploading...</span>
                        </>
                    ) : (
                        <>
                            <Upload size={16} />
                            <span>{preview ? 'Ganti Foto' : 'Pilih Foto'}</span>
                        </>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={uploading}
                    />
                </label>
            </div>
        </div>
    )
}
