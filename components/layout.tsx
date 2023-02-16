import Header from './header'
import Footer from './footer'
import { ReactNode, useState } from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Layout({ children }: { children: ReactNode }) {
    const supabase = useSupabaseClient()
    const session = useSession()

    const [isOwner, setIsOwner] = useState(false)

    const user = session?.user

    if (user) {
        supabase
            .from('profiles')
            .select('is_owner')
            .eq('id', user.id)
            .single()
            .then((res) => {
                setIsOwner(res.data!.is_owner)
            })
    }


    return (
        <>
            <Header isOwner={isOwner} />
            <main> {children} </main>
            <Footer />
        </>
    )
}
