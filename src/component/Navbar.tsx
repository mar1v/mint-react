import { Col, Layout, Menu, Row } from 'antd';
import React from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate();
    const { isAuth } = useTypedSelector(state => state.auth);
    const loginItems = [
        {
            key: 'login',
            label: 'Login',
            onClick: () => navigate('/login'),
        },
    ];

    const logoutItems = [
        {
            key: 'logout',
            label: 'Logout',
            onClick: () => {
            },
        },
    ];
    return (
        <Layout.Header>
            <Row justify="end" align="middle">
                <Col style={{ marginRight: '20px', fontFamily: 'Segoe UI, sans-serif', fontSize: '16px' }}>Mar1v</Col>
                <Col>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectable={false}
                        defaultSelectedKeys={['1']}
                        items={isAuth ? logoutItems : loginItems}
                        disabledOverflow={true}
                        overflowedIndicator={null}
                    />
                </Col>
            </Row>
        </Layout.Header >
    )
}

export default Navbar;
