import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'

import commonStyles from '../../../styles/common.module.css'
import { Button, Card, Typography } from 'antd'
import {
  ContainerTwoTone,
  InfoCircleTwoTone,
  PlusCircleTwoTone,
} from '@ant-design/icons'
import FoodDetailCard from '../../../../components/FoodDetailCard'

const { Title } = Typography

const AdminUserPage = () => {
  const router = useRouter()
  const { userId } = router.query
  const [userInformation, setUserInformation] = useState({
    fullname: '',
    username: '',
    email: '',
    calorie_limit: '',
    records: [],
  })
  const [averageUserCalories, setAverageUserCalories] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    if (typeof userId === 'undefined') return

    try {
      const response = await axios.get(`/admin/users/${userId}/view`)

      setUserInformation(response.data.user)
      setAverageUserCalories(response.data.averageCalories)
      setLoading(false)
    } catch (err) {
      console.error('Fetch user information failed', {
        err,
      })
    }
  }, [userId])

  return (
    <div className={commonStyles.container}>
      <Card loading={loading} style={{ marginBottom: '16px' }}>
        <Title level={3}>{userInformation.fullname}</Title>
        <p>User Name: {userInformation.username}</p>
        <p>Email: {userInformation.email}</p>
        <p>Calorie Limit: {userInformation.calorie_limit}</p>
        <p>
          <b>Average User Calories This Week: {averageUserCalories}</b>
        </p>
        {userId && (
          <Link href={`/admin/users/${userId}/records/create`}>
            <Button icon={<PlusCircleTwoTone />}>
              Add Food Record for User
            </Button>
          </Link>
        )}
      </Card>
      <div style={{ width: '100%', paddingBottom: '16px' }}>
        <Title level={4}>
          <u>Food Record List</u>
        </Title>

        {userInformation.records.length <= 0 ? (
          <div>
            {loading ? (
              <>
                <InfoCircleTwoTone /> Loading User Records
              </>
            ) : (
              <>
                <ContainerTwoTone /> User has no Records
              </>
            )}
          </div>
        ) : (
          userInformation.records.map((record) => (
            <FoodDetailCard
              name={record.name}
              calorie={record.calories}
              created_date={new Date(record.created_at)}
              id={record.id}
              price={record.price}
              key={record.id}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default AdminUserPage
