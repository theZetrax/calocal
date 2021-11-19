import 'antd/dist/antd.css'
import Head from 'next/head'

// UI
import NavBar from '../components/NavBar'

import '../config/axios'
import { wrapper } from '../redux/store'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Calocal - Understand Your Eating Habit</title>
        <link rel="icon" type="image/png" href="/favicon.svg" />
      </Head>

      <NavBar />
      <Component {...pageProps} />
    </div>
  )
}

export default wrapper.withRedux(MyApp)
