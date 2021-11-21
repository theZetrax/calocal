import axios from 'axios'
import router from 'next/router'

export const USER_TOKEN = 'user-token'

/** If user login credentials is correct, redirect login page and signup page requests to home */
export const checkCredentials = async () => {
  try {
    const response = await axios('/auth/checkcredentials')
    if (response.status === 200) router.push('/')
  } catch (err) {
    console.error('Checking credentials failed', {
      err,
    })
  }
}
