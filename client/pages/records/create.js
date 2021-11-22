import styles from '../styles/common.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { Form, Input, Button, Typography } from 'antd'
import { ArrowLeftOutlined, FireOutlined } from '@ant-design/icons'
import axios from 'axios'

const { Title } = Typography

const CreateRecordPage = () => {
  const router = useRouter()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values) => {
    const { name, calories, price } = values

    try {
      await axios.post('/records/create', {
        name,
        calories,
        price,
      })

      router.push('/')
    } catch (err) {
      console.log('Failed to created Food Record', {
        err,
      })
    }
  }

  return (
    <Form
      form={form}
      name="createFood"
      onFinish={handleSubmit}
      layout="vertical"
      className={styles.container}
    >
      <Form.Item>
        <Link href="/">
          <Button style={{ marginBottom: '8px' }} icon={<ArrowLeftOutlined />}>
            Go Back
          </Button>
        </Link>
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
          loading={loading}
          htmlType="submit"
          icon={<FireOutlined />}
          type="primary"
        >
          Create Record
        </Button>
      </Form.Item>
    </Form>
  )
}

export default CreateRecordPage
