import React, { FC } from 'react'
import { Button, Form, Input } from 'antd';

const LoginForm: FC = () => {
    return (
        <Form
            className='login-form'>
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input type="password" />
            </Form.Item>
            <Form.Item label={null}>
                <Button type="primary" htmlType="submit" >
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginForm;
