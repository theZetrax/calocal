import {
  DeleteTwoTone,
  InfoCircleTwoTone,
  StopTwoTone,
} from '@ant-design/icons'
import { Button, Card, Space } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import commonStyles from '../../../../../styles/common.module.css'
import { Typography } from 'antd'

const { Title } = Typography

const DeleteUserRecordPage = () => {
  const router = useRouter()
  const { userId, recordId } = router.query

  const [loading, setLoading] = useState(true)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [recordInfo, setRecordInfo] = useState({
    id: '',
    name: '',
    user: {
      username: '',
    },
  })

  const handleDelete = async () => {
    if ([userId, recordId].map((value) => typeof value).includes('undefined'))
      return

    try {
      setDeleteLoading(true)
      await axios.delete(`/admin/${recordId}`)

      setDeleteLoading(false)
      router.push(`/admin/users/${userId}`)
    } catch (err) {
      console.error('Failed To Delete User Record', {
        err,
      })
    }
  }

  useEffect(async () => {
    if ([userId, recordId].map((val) => typeof val).includes('undefined'))
      return

    try {
      const response = await axios.get(`/admin/${recordId}`)

      setRecordInfo(response.data.record)
      setLoading(false)
    } catch (err) {
      console.error('Fetching Record Informatino Failed', {
        err,
      })
    }
  }, [userId, recordId])

  if (loading)
    return (
      <div className={commonStyles.container}>
        <InfoCircleTwoTone /> Loading please wait...
      </div>
    )

  return (
    <div className={commonStyles.container}>
      <Card>
        <Title level={4}>Are you sure you want to delete record?</Title>

        <p>
          Are you sure you want to delete record of <b>{recordInfo.name}</b>,
          created by <b>{recordInfo.user.username}</b>?
        </p>

        <Space>
          <Button
            loading={deleteLoading}
            onClick={handleDelete}
            icon={<DeleteTwoTone />}
          >
            Delete
          </Button>
          <Button onClick={() => router.back()} icon={<StopTwoTone />}>
            Cancel
          </Button>
        </Space>
      </Card>
    </div>
  )
}

export default DeleteUserRecordPage
