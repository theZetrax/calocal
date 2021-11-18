// import "../styles/globals.css";
import 'antd/dist/antd.css'

import { wrapper } from '../redux/store'

import Head from 'next/head'
import '../config/axios'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Calocal - Understand Your Eating Habit</title>
        <link rel="icon" type="image/png" href="/favicon.svg" />
      </Head>

      <Component {...pageProps} />
    </div>
  )
}

export default wrapper.withRedux(MyApp)
