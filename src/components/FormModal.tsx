import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd';
import type { FC } from 'react';
import type { FormModalProps } from '../types/models';



export const FormModal: FC<FormModalProps> = ({ visible, onCancel }) => {
    return (
        <Modal
            title="Sign in"
            open={visible}
            onCancel={onCancel}
            footer={null}
            style={{ maxWidth: 360 }}
        >
            <Form
                name="login"
                initialValues={{ remember: true }}
                style={{ maxWidth: 360 }}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                    style={{ padding: '10px' }}
                >
                    <Input prefix={<UserOutlined />} placeholder="Username" style={{ height: '45px' }} />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                    style={{ padding: '10px' }}
                >
                    <Input prefix={<LockOutlined />} type="password" placeholder="Password" style={{ height: '45px' }} />
                </Form.Item>
                <Form.Item style={{ marginBottom: 0 }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        padding: '10px',
                    }}>
                        <Button type="default" htmlType="button" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit" style={{ marginRight: '20px' }}>
                            Sign in
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal >
    );
}

export default FormModal;