import _ from 'lodash'
import axios from 'axios'
import router from 'next/router'

if (typeof window !== 'undefined') {
  axios.defaults.baseURL = 'http://localhost:8090'
  axios.defaults.withCredentials = true

  // REGION - testing purpose only
  // Inspect request and response of axios
  axios.interceptors.request.use((config) => {
    console.log('request', {
      config,
    })

    return config
  })

  axios.interceptors.response.use((config) => {
    console.log('response', {
      config,
    })

    return config
  })
  // END REGION - testing purpose only

  axios.defaults.validateStatus = (status) => {
    // If unauthorized, send user to login page
    if (status === 401) {
      if (!router.pathname.includes('auth')) router.push('/auth/login')
    }
    // For access denied paths, redirect to user home
    if (status === 403) router.push('/')

    return status >= 200 && status < 300 // default
  }
}
