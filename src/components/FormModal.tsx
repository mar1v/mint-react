import { signInValidation } from '#constants/validations';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd';
import type { FC } from 'react';

interface FormModalProps {
  visible: boolean;
  onCancel: () => void;
}

export const FormModal: FC<FormModalProps> = ({ visible, onCancel }) => {
  return (
    <Modal title="Sign in" open={visible} onCancel={onCancel} footer={null} width={360}>
      <Form name="login" initialValues={{ remember: true }} className="w-full mb-0">
        <Form.Item name="username" rules={signInValidation.username} className="p-2">
          <Input prefix={<UserOutlined />} placeholder="Username" className="h-12" />
        </Form.Item>
        <Form.Item name="password" rules={signInValidation.password} className="p-2">
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" className="h-12" />
        </Form.Item>
        <Form.Item className="w-full mb-0">
          <div className="flex justify-between items-center w-full p-2">
            <Button type="default" htmlType="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" className="bg-black text-white border-black font-medium">
              Sign in
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormModal;
