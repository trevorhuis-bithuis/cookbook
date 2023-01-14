import Header from "./header"
import Footer from "./footer"
import type { ReactNode } from "react"
import { useSession } from "next-auth/react"

export default function Layout({ children }: { children: ReactNode }) {
    const { status } = useSession()

    if (status === 'loading') {
        return <div></div>
    }

    return (
        <>
            <Header />
            <main> {children} </main>
            <Footer />
        </>
    )
}