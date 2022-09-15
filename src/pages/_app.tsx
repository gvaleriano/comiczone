import { AppProps } from 'next/app'
import { Header } from '../components/Header';
import { SessionProvider as NextAuthProvider } from 'next-auth/react'

import '../styles/global.scss';
import { AuthProvider } from '../contexts/AuthContext';


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <NextAuthProvider session={pageProps.session}>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
      </AuthProvider>
    </NextAuthProvider>
  )
}

export default MyApp
