import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export function ProtectedRoute() {
    const [session, setSession] = useState<{ user: any } | null | undefined>(undefined) // undefined = loading

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    if (session === undefined) {
        return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">Loading...</div>
    }

    if (session === null) {
        return <Navigate to="/admin/login" replace />
    }

    return <Outlet />
}
