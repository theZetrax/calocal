import { useRouter } from 'next/router'
import { LogoutOutlined } from '@ant-design/icons/lib/icons'
import { Button } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import commonStyles from './styles/common.module.css'

const AccountPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [accountInfo, setAccountInfo] = useState({
    fullname: '',
    email: '',
    username: '',
    calorie_limit: '',
  })

  const handleLogout = async () => {
    if (typeof window !== 'object') return

    await axios.post('/users/logout')
    router.push('/auth/login')
  }

  useEffect(async () => {
    try {
      const response = await axios('/users/account')
      const { fullname, username, email, calorie_limit } = response.data.user

      setAccountInfo({
        fullname,
        username,
        email,
        calorie_limit,
      })
      setLoading(false)
    } catch (err) {
      console.error('Failed fetching account information', {
        err,
      })
    }
  }, [])

  return (
    <div className={commonStyles.container}>
      {loading ? (
        <div>Loading Account Information...</div>
      ) : (
        <div>
          <p>
            <b>Full Name: </b> {accountInfo.fullname}
          </p>
          <p>
            <b>Email: </b> {accountInfo.email}
          </p>
          <p>
            <b>Username: </b> {accountInfo.username}
          </p>
          <p>
            <b>Calorie Limit: </b> {accountInfo.calorie_limit}
          </p>
          <div>
            <Button onClick={handleLogout} icon={<LogoutOutlined />}>
              Logout
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AccountPage
