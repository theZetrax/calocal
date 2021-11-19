import _ from 'lodash'
import axios from 'axios'

import { USER_TOKEN } from '@lib/auth'
import router from 'next/router'

if (typeof window !== 'undefined') {
  axios.defaults.baseURL = 'http://localhost:8090'

  axios.defaults.transformResponse = (data) => {
    const authToken = _.get(data, USER_TOKEN)

    if (typeof authToken !== 'undefined')
      localStorage.setItem(USER_TOKEN, authToken)

    return data
  }

  axios.defaults.validateStatus = (status) => {
    // If unauthorized, send user to login page
    if (status === 401) {
      localStorage.removeItem(USER_TOKEN)
      router.push('/auth/login')
    }

    return status >= 200 && status < 300 // default
  }
}
