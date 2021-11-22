import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import commonStyles from '../../../../../styles/common.module.css'
import { Button, Card, Space, Typography } from 'antd'
import axios from 'axios'
import {
  DeleteTwoTone,
  EditTwoTone,
  FolderOpenTwoTone,
  InfoCircleTwoTone,
  UserOutlined,
} from '@ant-design/icons'

const { Title } = Typography

const AdminRecordPage = () => {
  const router = useRouter()
  const { recordId } = router.query
  const [loading, setLoading] = useState(true)
  const [recordInfo, setRecordInfo] = useState({
    id: undefined,
    name: '',
    created_at: new Date(),
    calories: 0,
    price: 0,
    user: {
      id: undefined,
      fullname: '',
      username: '',
      email: '',
    },
  })

  useEffect(async () => {
    if (typeof recordId === 'undefined') return

    try {
      const response = await axios.get(`/admin/${recordId}`)
      const { record } = response.data

      setRecordInfo(record)
      setLoading(false)
    } catch (err) {
      console.error('Fetching Record Information Failed', {
        err,
      })
    }
  }, [recordId])

  return (
    <div className={commonStyles.container}>
      <Space direction="vertical" style={{ width: '100%' }}>
        {loading ? (
          <div>
            <InfoCircleTwoTone /> Loading Record Informaiton...
          </div>
        ) : (
          <>
            <Card>
              <Title level={4}>
                <UserOutlined /> Record Owner
              </Title>
              <p>
                Full Name: <b>{recordInfo.user.fullname}</b>
              </p>
              <p>
                User Name: <b>{recordInfo.user.username}</b>
              </p>
              <p>
                Email: <b>{recordInfo.user.email}</b>
              </p>
            </Card>
            <Card>
              <Title level={4}>
                <FolderOpenTwoTone /> Record Information
              </Title>

              <p>
                Food Name: <b>{recordInfo.name}</b>
              </p>
              <p>
                Food Calories: <b>{recordInfo.calories}</b>
              </p>
              <p>
                Price: <b>{recordInfo.price}</b>
              </p>
              <p>
                Recorded At:{' '}
                <b>{new Date(recordInfo.created_at).toUTCString()}</b>
              </p>
            </Card>

            <Space>
              <Link
                href={`/admin/users/${recordInfo.user.id}/records/${recordInfo.id}/edit`}
              >
                <Button icon={<EditTwoTone />}>Edit Record</Button>
              </Link>
              <Link
                href={`/admin/users/${recordInfo.user.id}/records/${recordInfo.id}/delete`}
              >
                <Button icon={<DeleteTwoTone />}>Delete Record</Button>
              </Link>
            </Space>
          </>
        )}
      </Space>
    </div>
  )
}

export default AdminRecordPage
