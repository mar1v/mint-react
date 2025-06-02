import { Badge, Button, Input, Layout, Menu, Space, theme } from 'antd';
import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    MenuOutlined,
    SearchOutlined
} from '@ant-design/icons';
import FormModal from './FormModal';
import CartModal from './CartModal';
import ContentList from './ContentList';
import { useAppDispatch, useTypedSelector } from '../hooks/useTypedSelector';
import { setSearchValue } from '../store/reducers/Search/SearchSlice';
const { Header, Sider, Content } = Layout;

const Navbar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [isModalFormVisible, setIsModalFormVisible] = useState(false);
    const [isModalCartVisible, setIsModalCartVisible] = useState(false);
    const dispatch = useAppDispatch();
    const searchValue = useTypedSelector(state => state.search.searchValue);
    const cartItemsCount = useTypedSelector(state => { return state.cart.totalQuantity });
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <FormModal
                    visible={isModalFormVisible}
                    onCancel={() => setIsModalFormVisible(false)}
                />
                <CartModal
                    isModalVisible={isModalCartVisible}
                    onCancel={() => setIsModalCartVisible(false)}
                />
                <Menu
                    theme="dark"
                    mode="inline"
                    selectable={false}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'Sign in',
                            onClick: () => {
                                setIsModalFormVisible(true);
                            },
                        },
                        {
                            key: '2',
                            icon: <MenuOutlined />,
                            label: 'Catalogue',
                            children: [
                                {
                                    key: '2-1',
                                    label: 'Category 1',
                                },
                                {
                                    key: '2-2',
                                    label: 'Category 2',
                                },
                            ]
                        },
                        {
                            key: '3',
                            icon: (
                                collapsed
                                    ?
                                    <Badge
                                        count={cartItemsCount}
                                        size="small"
                                        offset={[-22, 7]}
                                        style={{
                                            backgroundColor: '#ff4d4f',
                                            color: '#fff',
                                        }}
                                    >
                                        <ShoppingCartOutlined />
                                    </Badge>
                                    :
                                    <Badge
                                        count={cartItemsCount}
                                        size="small"
                                        offset={[-21, -3]}
                                        style={{
                                            backgroundColor: '#ff4d4f',
                                            color: '#fff',
                                        }}
                                    >
                                        <ShoppingCartOutlined />
                                    </Badge>
                            ),
                            label: 'Cart',
                            onClick: () => {
                                setIsModalCartVisible(true);
                            },
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <Space style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
                        <Input.Search
                            placeholder="Type to search..."
                            value={searchValue}
                            size="large"
                            style={{
                                width: 300,
                                alignItems: 'center',
                            }}
                            onChange={(e) => dispatch(setSearchValue(e.target.value))}
                            enterButton={
                                <Button
                                    type="primary"
                                    icon={<SearchOutlined />}
                                    style={{
                                        backgroundColor: '#595959',
                                        borderColor: '#595959',
                                    }}
                                />
                            }

                        />
                    </Space>
                </Header>
                <div style={{ fontSize: '24px', fontWeight: 'bold', padding: '16px' }}>
                    Shop</div>
                <Content
                    style={{
                        padding: 24,
                        flex: 1,
                        margin: 16,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        overflow: 'auto',
                    }}
                >
                    <ContentList />
                </Content>
            </Layout>
        </Layout >
    );
};

export default Navbar;
