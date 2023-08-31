import Footer from '@/components/Footer'
import Header from '@/components/Header'
import '@/styles/globals.css'
import Head from 'next/head'
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import store from '../util/store';
import { ToastContainer } from 'react-toastify';



export default function App({ Component, pageProps }) {



  return(
  <>
  <ToastContainer/>
  <Provider store={store}>

    
    <Header/>
    <Component {...pageProps} />
    <Footer/>
  </Provider>
    
  </>
    )
}
