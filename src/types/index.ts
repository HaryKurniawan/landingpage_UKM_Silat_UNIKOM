export interface Winner {
    name: string
    category: string
    medal: 'gold' | 'silver' | 'bronze'
}

export interface Pengurus {
    id: number
    name: string
    position: string
    initials: string
    size: string
    order_index: number
    instagram_url?: string
    email?: string
    created_at?: string
}

export interface Aktivitas {
    id: number
    slug: string
    title: string
    subtitle?: string
    description?: string
    image_url: string
    schedule?: string
    highlights?: string[]
    memories?: string[]
    gallery_urls?: string[]
    created_at?: string
}

export interface Event {
    id: number
    slug: string
    title: string
    date: string
    location: string
    description?: string
    result?: string | null
    image_url: string
    status: 'upcoming' | 'completed'
    video_url?: string
    instagram_url?: string
    winners?: Winner[]
    gallery_urls?: string[]
    created_at?: string
}

export interface Prestasi {
    id: number
    title: string
    event_name: string
    year: string
    medal: 'gold' | 'silver' | 'bronze' | 'other'
    athlete?: string
    created_at?: string
}

export interface TrainingSchedule {
    id: string
    day: string
    time: string
    location: string
    activity: string
}

export interface SiteSettings {
    id: number
    email: string
    phone: string
    instagram_url: string
    youtube_url: string
    address: string
    visi?: string
    misi?: string[]
    training_schedule: TrainingSchedule[]
}
