import { Badge, Button, Input, InputNumber, Layout, Menu, Slider, Space, theme, } from 'antd';
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
import { changeCategory } from '../store/reducers/Category/CategorySlice';
import { setPriceRange } from '../store/reducers/Sorting/SortingSlice';
const { Header, Sider, Content } = Layout;


const Navbar: FC<{ children?: React.ReactNode }> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [isModalFormVisible, setIsModalFormVisible] = useState(false);
    const [isModalCartVisible, setIsModalCartVisible] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const searchValue = useTypedSelector(state => state.search.searchValue);
    const priceRange = useTypedSelector(state => state.sorting.priceRange);
    const cartItemsCount = useTypedSelector(state => { return state.cart.totalQuantity });
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const siderStyle: React.CSSProperties = {
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        scrollbarWidth: 'thin',
        scrollbarGutter: 'stable',
    };
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider style={siderStyle} trigger={null} collapsible collapsed={collapsed}>
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
                                <Badge
                                    count={cartItemsCount}
                                    size="small"
                                    offset={collapsed ? [-22, 7] : [-21, -3]}
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
                        },
                    ]}
                />
                <div
                    style={{
                        padding: '0 24px',
                        marginTop: 24,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                    }}
                >
                    {!collapsed && (
                        <p style={{ color: 'rgba(255, 255, 255, 0.65)', margin: 0, fontSize: 14 }}>
                            Filter by Price
                        </p>
                    )}

                    <div style={{ display: 'flex', gap: 8 }}>
                        <InputNumber
                            value={priceRange.min}
                            min={0}
                            max={50000}
                            step={10}
                            type="number"
                            size="small"
                            style={{
                                borderColor: '#303030',
                                color: 'white',
                                borderRadius: 6,
                                width: 70,
                            }}
                            onChange={(value) => {
                                dispatch(setPriceRange({ min: value ?? 0, max: priceRange.max }));
                            }}
                        />
                        <InputNumber
                            value={priceRange.max}
                            min={0}
                            max={50000}
                            step={10}
                            type="number"
                            size="small"
                            style={{
                                borderColor: '#303030',
                                color: 'white',
                                borderRadius: 6,
                                width: 70,
                            }}
                            onChange={(value) => {
                                dispatch(setPriceRange({ min: priceRange.min, max: value ?? 5000 }));
                            }}
                        />
                    </div>
                    <Slider
                        range
                        min={0}
                        max={5000}
                        step={10}
                        value={[priceRange.min, priceRange.max]}
                        onChange={([min, max]) => {
                            dispatch(setPriceRange({ min, max }));
                        }}
                        tooltip={{ open: false }}
                        trackStyle={[{ backgroundColor: '#1890ff' }]}
                    />
                </div>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingInline: 16,
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
