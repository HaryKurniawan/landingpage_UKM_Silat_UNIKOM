export interface Winner {
    name: string
    category: string
    medal: 'gold' | 'silver' | 'bronze'
}

export interface EventData {
    id: number
    title: string
    slug: string
    date: string
    location: string
    description: string
    result: string | null
    image: string
    status: 'completed' | 'upcoming'
    winners?: Winner[]
    photos?: string[]
    videoUrl?: string
    instagramUrl?: string
}

export const eventsData: EventData[] = [
    {
        id: 1,
        title: 'Kejuaraan Nasional Pencak Silat Mahasiswa',
        slug: 'kejurnas-2024',
        date: 'Desember 2024',
        location: 'Jakarta',
        description: 'Kejuaraan tahunan yang diikuti oleh seluruh perguruan tinggi di Indonesia. Kompetisi ini menampilkan kategori tanding, tunggal, ganda, dan beregu. Tim UKM Silat UNIKOM berhasil menorehkan prestasi membanggakan dengan membawa pulang medali emas di kategori tanding putra.',
        result: 'Juara 1 Kategori Tanding',
        image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=1200&h=600&fit=crop',
        status: 'completed',
        winners: [
            { name: 'Ahmad Rizky Pratama', category: 'Tanding Putra Kelas A', medal: 'gold' },
            { name: 'Siti Nurhaliza', category: 'Tunggal Putri', medal: 'silver' },
            { name: 'Muhammad Faisal', category: 'Tanding Putra Kelas B', medal: 'bronze' },
        ],
        photos: [
            'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&h=400&fit=crop',
        ],
        videoUrl: 'https://www.instagram.com/reel/example1',
        instagramUrl: 'https://www.instagram.com/ukmsilat_unikom',
    },
    {
        id: 2,
        title: 'POMDA Jawa Barat',
        slug: 'pomda-jabar-2024',
        date: 'Oktober 2024',
        location: 'Bandung',
        description: 'Pekan Olahraga Mahasiswa Daerah tingkat Jawa Barat. Tim UNIKOM berhasil menorehkan prestasi membanggakan dengan meraih medali perak di kategori tunggal putri dan perunggu di kategori tanding putra.',
        result: 'Juara 2 Kategori Tunggal',
        image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=1200&h=600&fit=crop',
        status: 'completed',
        winners: [
            { name: 'Dewi Kartika', category: 'Tunggal Putri', medal: 'silver' },
            { name: 'Budi Santoso', category: 'Tanding Putra', medal: 'bronze' },
        ],
        photos: [
            'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop',
        ],
        videoUrl: 'https://www.instagram.com/reel/example2',
    },
    {
        id: 3,
        title: 'Festival Silat Nusantara',
        slug: 'festival-silat-2025',
        date: 'Maret 2025',
        location: 'Yogyakarta',
        description: 'Festival silat terbesar di Indonesia yang menampilkan berbagai perguruan dan aliran silat dari seluruh nusantara. Acara ini juga menampilkan pertunjukan seni silat, workshop, dan kompetisi tingkat nasional.',
        result: null,
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=600&fit=crop',
        status: 'upcoming',
    },
    {
        id: 4,
        title: 'Piala Rektor se-Jawa Barat',
        slug: 'piala-rektor-2024',
        date: 'Agustus 2024',
        location: 'Bandung',
        description: 'Kompetisi antar universitas se-Jawa Barat yang diselenggarakan untuk mempererat silaturahmi antar pesilat mahasiswa. Tim ganda campuran UNIKOM berhasil meraih juara pertama.',
        result: 'Juara 1 Kategori Ganda',
        image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1200&h=600&fit=crop',
        status: 'completed',
        winners: [
            { name: 'Ahmad Rizky & Siti Nurhaliza', category: 'Ganda Campuran', medal: 'gold' },
        ],
        photos: [
            'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&h=400&fit=crop',
        ],
    },
]

export function getEventBySlug(slug: string): EventData | undefined {
    return eventsData.find(event => event.slug === slug)
}
