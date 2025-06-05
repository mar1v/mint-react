import { Badge, Button, Input, Layout, Menu, theme, } from 'antd';
import React, { FC, useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    MenuOutlined,
    SearchOutlined,
    HeartOutlined
} from '@ant-design/icons';
import FormModal from './FormModal';
import CartModal from './CartModal';
import { useAppDispatch, useTypedSelector } from '../hooks/useTypedSelector';
import { setSearchValue } from '../store/reducers/Search/SearchSlice';
import { routesNames } from '../router/router';
import { useNavigate } from 'react-router-dom';
import { changeCategory } from '../store/reducers/category/CategorySlice';
const { Header, Sider, Content } = Layout;


const Navbar: FC<{ children?: React.ReactNode }> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [isModalFormVisible, setIsModalFormVisible] = useState(false);
    const [isModalCartVisible, setIsModalCartVisible] = useState(false);
    const navigate = useNavigate();
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
                                    label: 'Laptop',
                                    onClick: () => {
                                        dispatch(changeCategory('laptops'));
                                    },
                                },
                                {
                                    key: '2-2',
                                    label: 'Smartphone',
                                    onClick: () => {
                                        dispatch(changeCategory('smartphones'));
                                    },
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
                        {
                            key: '4',
                            icon: <HeartOutlined />,
                            label: 'Wishlist',
                            onClick: () => {
                                navigate(routesNames.WISHLIST);
                            },
                        }
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingInline: 16
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
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
                        <span onClick={() => navigate(routesNames.SHOP)} style={{ fontSize: 20, fontWeight: 'bold', cursor: 'pointer' }}>Shop</span>
                    </div>
                    <Input.Search
                        placeholder="Type to search..."
                        value={searchValue}
                        size="large"
                        style={{ width: 300 }}
                        onChange={(e) => dispatch(setSearchValue(e.target.value))}
                        enterButton={
                            <Button
                                type="primary"
                                icon={<SearchOutlined />}
                                style={{
                                    backgroundColor: '#595959',
                                    borderColor: '#595959',
                                }}
                                onClick={() => dispatch(setSearchValue(searchValue))}
                            />
                        }
                    />
                </Header>
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
                    {children}
                </Content>
            </Layout>
        </Layout >
    );
};

export default Navbar;
