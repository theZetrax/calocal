import { InfoCircleTwoTone } from '@ant-design/icons'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import commonStyles from '../../../../styles/common.module.css'

import { Form, Input, Button, Typography } from 'antd'
import { ArrowLeftOutlined, FireOutlined } from '@ant-design/icons'
import axios from 'axios'

const { Title } = Typography

const CreateUserRecordPage = () => {
  const router = useRouter()
  const { userId } = router.query
  const [loading, setLoading] = useState(true)
  const [formLoading, setFormLoading] = useState(false)
  const [form] = Form.useForm()

  const handleSubmit = async (values) => {
    if (typeof userId === 'undefined') return

    const { name, calories, price } = values

    try {
      setFormLoading(true)
      await axios.post(`/admin/users/${userId}/records/create`, {
        name,
        calories,
        price,
      })

      router.push(`/admin/users/${userId}`)
    } catch (err) {
      console.error('Failed Creating User Food Record', {
        err,
      })
    }
  }

  useEffect(() => {
    if (typeof userId === 'undefined') return
    setLoading(false)
  }, [userId])

  if (loading)
    return (
      <div className={commonStyles.container}>
        <InfoCircleTwoTone /> Loading Please Wait...
      </div>
    )

  return (
    <div className={commonStyles.container}>
      <Form
        form={form}
        name="createUserFood"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item>
          <Button
            onClick={() => router.back()}
            style={{ marginBottom: '8px' }}
            icon={<ArrowLeftOutlined />}
          >
            Go Back
          </Button>
          <Title level={4}>Create your Food Record</Title>
        </Form.Item>

        <Form.Item
          label="Food Name"
          name="name"
          rules={[
            { required: true, message: 'Food name is required.' },
            {
              pattern: '[a-zA-Z][a-zsA-Z]*',
              message: 'Food name should only be letters.',
            },
          ]}
        >
          <Input placeholder="Enter your food name here." />
        </Form.Item>
        <Form.Item
          name="calories"
          label="Calories"
          rules={[{ required: true, message: 'Food calories is required.' }]}
          initialValue={100}
        >
          <Input type="number" placeholder="Enter the food calories here." />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: 'Food price is required.' }]}
          initialValue={50}
        >
          <Input type="number" placeholder="Enter the food price here." />
        </Form.Item>
        <Form.Item>
          <Button
            loading={formLoading}
            htmlType="submit"
            icon={<FireOutlined />}
            type="primary"
          >
            Create Record
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CreateUserRecordPage
