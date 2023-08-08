import Footer from '@/components/Footer'
import Header from '@/components/Header'
import '@/styles/globals.css'
import Head from 'next/head'
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {



  return(
  <>
    <Header/>
    <Component {...pageProps} />
    <Footer/>
    
  </>
    )
}
