export interface AktivitasData {
    id: number
    slug: string
    title: string
    subtitle: string
    description: string
    image: string
    schedule?: string
    photos: string[]
    highlights?: string[]
    memories?: string[]
}

export const aktivitasData: AktivitasData[] = [
    {
        id: 1,
        slug: 'latihan-rutin',
        title: 'Latihan Rutin',
        subtitle: 'Setiap Selasa & Kamis',
        description: 'Latihan rutin mingguan yang mencakup teknik dasar, jurus, dan sparring. Dipimpin langsung oleh pelatih berpengalaman untuk memastikan setiap anggota berkembang dengan baik. Di sinilah kami menempa diri menjadi pesilat yang tangguh.',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=500&fit=crop',
        schedule: 'Selasa & Kamis, 16.00 - 18.00 WIB',
        photos: [
            'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&h=400&fit=crop',
        ],
        highlights: [
            'Teknik dasar pencak silat',
            'Jurus dan kembangan',
            'Latihan tanding (sparring)',
            'Fisik dan ketahanan',
        ],
        memories: [
            'Latihan perdana angkatan 2024',
            'Persiapan Kejurnas bersama',
            'Moment seru saat sparring',
        ],
    },
    {
        id: 2,
        slug: 'gathering-bonding',
        title: 'Gathering & Bonding',
        subtitle: 'Kebersamaan di luar latihan',
        description: 'Acara kumpul-kumpul santai untuk mempererat hubungan antar anggota. Dari makan bersama hingga nonton bareng, kami percaya persaudaraan dibangun di luar lapangan juga. Momen-momen ini yang membuat kita lebih dari sekadar rekan latihan.',
        image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=500&fit=crop',
        photos: [
            'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&h=400&fit=crop',
        ],
        highlights: [
            'Makan bersama',
            'Nonton bareng pertandingan',
            'Game night',
            'Perayaan ulang tahun anggota',
        ],
        memories: [
            'Bukber bareng 2024',
            'Nonton final PON',
            'Birthday surprise untuk ketua',
        ],
    },
    {
        id: 3,
        slug: 'workshop-silat',
        title: 'Workshop Silat',
        subtitle: 'Belajar dari pesilat senior',
        description: 'Workshop dan seminar dengan mengundang pesilat profesional dan alumni berprestasi. Kesempatan langka untuk belajar teknik dan pengalaman dari yang terbaik. Setiap sesi memberikan insight berharga yang tidak bisa didapat dari latihan biasa.',
        image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=500&fit=crop',
        photos: [
            'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=600&h=400&fit=crop',
        ],
        highlights: [
            'Teknik lanjutan dari ahli',
            'Sharing pengalaman kompetisi',
            'Tips mental dan strategi',
            'Sertifikat kehadiran',
        ],
        memories: [
            'Workshop dengan juara nasional',
            'Sesi tanya jawab seru',
            'Foto bersama pelatih',
        ],
    },
    {
        id: 4,
        slug: 'camping-outbound',
        title: 'Camping & Outbound',
        subtitle: 'Membangun kesolidan tim',
        description: 'Kegiatan outdoor untuk membangun teamwork dan kesolidan. Dari camping di alam hingga outbound challenge, semua dirancang untuk menguji dan memperkuat ikatan tim. Pengalaman yang tak terlupakan dan kenangan yang akan selalu diingat.',
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=500&fit=crop',
        photos: [
            'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1533873984035-25970ab07461?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1496545672447-f699b503d270?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?w=600&h=400&fit=crop',
        ],
        highlights: [
            'Camping di alam',
            'Outbound games',
            'Hiking dan trekking',
            'Malam keakraban',
        ],
        memories: [
            'Camping di Tangkuban Perahu',
            'Api unggun bersama',
            'Sunrise moment',
        ],
    },
]

export function getAktivitasBySlug(slug: string): AktivitasData | undefined {
    return aktivitasData.find(item => item.slug === slug)
}
