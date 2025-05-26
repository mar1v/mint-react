import React from 'react';

import { Button, Input, Form, Modal } from 'antd';
import type { FC } from 'react';
import type { FormModalProps } from '../types/models';



export const FormModal: FC<FormModalProps> = ({ visible, onCancel }) => {
    return (
        <Modal
            title="Sign in"
            open={visible}
            onCancel={onCancel}
            footer={null}
        >
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600, }}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    style={{ padding: '10px' }}
                >
                    <Input placeholder='Username' style={{ height: '45px' }} />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    style={{ padding: '10px' }}
                >
                    <Input.Password placeholder='Password' style={{ height: '45px' }} />
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
                        Sign in
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default FormModal;