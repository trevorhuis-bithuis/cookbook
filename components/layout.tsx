import Header from './header'
import Footer from './footer'
import type { ReactNode } from 'react'
import { useSession } from '@supabase/auth-helpers-react'

export default function Layout({ children }: { children: ReactNode }) {
    const session = useSession()
    // console.log(session)

    // if (!session) {
    //     return <div></div>
    // }

    return (
        <>
            <Header />
            <main> {children} </main>
            <Footer />
        </>
    )
}
