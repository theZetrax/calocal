import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'

// UI Imports
import { Form, Input, Button, Checkbox } from 'antd'
import { Typography } from 'antd'
import { checkCredentials } from '../../lib/auth'

const { Title } = Typography

const LoginPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(async () => {
    await checkCredentials()
  }, [])

  const onFinish = async (values) => {
    const { username, password } = values

    try {
      setLoading(true)
      await axios.post('/auth/login', {
        username,
        password,
      })
      // Stop button loading
      setLoading(false)

      // On success
      router.push('/')
    } catch (err) {
      setLoading(false)
      console.error('[Login Route] Login failed', {
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
        <Title level={3}>Login to Your Account</Title>
      </Form.Item>
      <br />

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

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 4, span: 16 }}
      >
        <Checkbox>Remember Me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Link href="/auth/signup">
          <Typography.Link>
            Don't have an account? Create one here.
          </Typography.Link>
        </Link>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Login
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginPage
