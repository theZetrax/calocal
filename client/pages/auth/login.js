import { Form, Input, Button, Checkbox } from 'antd'
import { Typography } from 'antd'
import axios from 'axios'

import { SetCookie } from '../../lib/cookie'

const { Title } = Typography

const LoginPage = () => {
  const onFinish = async (values) => {
    const { username, password } = values

    try {
      const response = await axios.post('/auth/login', {
        username,
        password,
      })

      console.log({
        response,
      })

      SetCookie('')
    } catch (err) {
      console.error('Login failed', {
        err,
      })
    }
  }

  const onFinishError = (err) => {
    console.log('Error Occured', {
      err,
    })
  }

  return (
    <Form
      name="login"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={onFinish}
      onFinishFailed={onFinishError}
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
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginPage
