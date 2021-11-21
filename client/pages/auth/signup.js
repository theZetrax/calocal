import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'

// UI Imports
import { Form, Input, Button } from 'antd'
import { Typography } from 'antd'
import { checkCredentials } from '../../lib/auth'

const { Title } = Typography

const SignupPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(async () => {
    await checkCredentials()
  }, [])

  const onFinish = async (values) => {
    try {
      setLoading(true)
      await axios.post(
        '/auth/signup',
        {
          ...values,
        },
        {
          withCredentials: false,
        },
      )

      router.push('/auth/login')
      setLoading(false)
    } catch (err) {
      setLoading(false)

      console.error('Create account failed', {
        err,
      })
    }
  }

  return (
    <Form
      name="login"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={onFinish}
    >
      <br />
      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <img height={32} loading="lazy" src="/assets/calocal.svg" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Title level={3}>Create Your Healthy Account!</Title>
      </Form.Item>
      <br />

      <Form.Item
        label="Full Name"
        name="fullname"
        rules={[{ required: true, message: 'Please input your fullname' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email' }]}
      >
        <Input type={'email'} />
      </Form.Item>

      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Link href="/auth/login">
          <Typography.Link>
            Already have an account? Login here.
          </Typography.Link>
        </Link>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  )
}

export default SignupPage
