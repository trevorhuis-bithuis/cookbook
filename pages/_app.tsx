import { SessionProvider as AuthProvider } from 'next-auth/react';
import '../styles/globals.css'
import Layout from '../components/layout'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <AuthProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp

