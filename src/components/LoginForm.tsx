import { useGetUsersQuery } from '#api/usersApi';
import { signInValidation } from '#constants/validations';
import { useAppDispatch } from '#hooks';
import { login } from '#store/reducers';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal } from 'antd';
import type { FC } from 'react';

interface LoginFormProps {
  visible: boolean;
  onCancel: () => void;
}

export const LoginForm: FC<LoginFormProps> = ({ visible, onCancel }) => {
  const { data: users = [], isLoading } = useGetUsersQuery();
  const dispatch = useAppDispatch();

  const onFinish = async (values: { username: string; password: string }) => {
    const foundUser = users.find((user) => user.username === values.username && user.password === values.password);

    if (foundUser) {
      dispatch(login('mock-token-' + foundUser.username));
      message.success('Login success!');
      localStorage.setItem('token', 'mock-token-' + foundUser.username);
      onCancel();
    } else {
      message.error('Username or password is incorrect!');
    }
  };
  return (
    <Modal title="Sign in" open={visible} onCancel={onCancel} footer={null} width={360}>
      <Form name="login" onFinish={onFinish} className="w-full mb-0">
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
            <Button type="primary" loading={isLoading} htmlType="submit" className="bg-black text-white border-black font-medium">
              Sign in
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoginForm;
