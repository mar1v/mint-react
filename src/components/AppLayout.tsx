import { routesNames } from '#constants';
import { useAppDispatch, useTypedSelector } from '#hooks';
import { changeCategory, setAppliedSearchValue, setPriceRange, setSearchValue } from '#store/reducers';
import {
  ArrowLeftOutlined,
  HeartOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Badge, Button, Input, InputNumber, Layout, Menu, Slider, theme } from 'antd';
import React, { FC, useState } from 'react';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import CartModal from './CartModal/CartModal';
import FormModal from './FormModal';

const { Header, Sider, Content } = Layout;

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

const AppLayout: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalFormVisible, setIsModalFormVisible] = useState(false);
  const [isModalCartVisible, setIsModalCartVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const searchValue = useTypedSelector((state) => state.filter.searchValue);
  const priceRange = useTypedSelector((state) => state.filter.priceRange);
  const cartItemsCount = useTypedSelector((state) => state.cart.totalQuantity);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleSearch = (searchValue: string) => {
    dispatch(setAppliedSearchValue(searchValue));

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('search', searchValue);
    setSearchParams(newParams);
  };

  const onSearchChange = (value: string) => dispatch(setSearchValue(value));
  const onPriceRangeChange = (value: { min: number; max: number }) => dispatch(setPriceRange(value));
  const onCategoryChange = (value: 'laptops' | 'smartphones') => {
    const url = `${routesNames.SHOP}?category=${value}`;
    navigate(url);
    dispatch(changeCategory(value));
  };

  const isNotOnProducts = location.pathname !== routesNames.SHOP;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider style={siderStyle} trigger={null} collapsible collapsed={collapsed}>
        <FormModal visible={isModalFormVisible} onCancel={() => setIsModalFormVisible(false)} />
        <CartModal isModalVisible={isModalCartVisible} onCancel={() => setIsModalCartVisible(false)} />
        <Menu
          theme="dark"
          mode="inline"
          selectable={false}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Sign in',
              onClick: () => setIsModalFormVisible(true),
            },
            {
              key: '2',
              icon: <MenuOutlined />,
              label: 'Category',
              children: [
                {
                  key: '2-1',
                  label: 'Laptops',
                  onClick: () => onCategoryChange('laptops'),
                },
                {
                  key: '2-2',
                  label: 'Smartphones',
                  onClick: () => onCategoryChange('smartphones'),
                },
              ],
            },
            {
              key: '3',
              icon: (
                <Badge
                  count={cartItemsCount}
                  size="small"
                  offset={collapsed ? [-22, 7] : [-21, -3]}
                  style={{ backgroundColor: '#ff4d4f', color: '#fff' }}
                >
                  <ShoppingCartOutlined />
                </Badge>
              ),
              label: 'Cart',
              onClick: () => setIsModalCartVisible(true),
            },
            {
              key: '4',
              icon: <HeartOutlined />,
              label: 'Wishlist',
              onClick: () => navigate(routesNames.WISHLIST),
            },
          ]}
        />

        <div style={{ padding: '0 24px', marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {!collapsed && <p style={{ color: 'rgba(255, 255, 255, 0.65)', margin: 0, fontSize: 14 }}>Filter by Price</p>}
          <div style={{ display: 'flex', gap: 8 }}>
            <InputNumber
              value={priceRange.min}
              min={0}
              max={50000}
              step={10}
              size="small"
              style={{ borderColor: '#303030', color: 'white', borderRadius: 6, width: 70 }}
              onChange={(value) => onPriceRangeChange({ min: value ?? 0, max: priceRange.max })}
            />
            <InputNumber
              value={priceRange.max}
              min={0}
              max={50000}
              step={10}
              size="small"
              style={{ borderColor: '#303030', color: 'white', borderRadius: 6, width: 70 }}
              onChange={(value) => onPriceRangeChange({ min: priceRange.min, max: value ?? 0 })}
            />
          </div>
          <Slider
            range
            min={0}
            max={5000}
            step={10}
            value={[priceRange.min, priceRange.max]}
            onChange={([min, max]) => onPriceRangeChange({ min, max })}
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
              style={{ fontSize: '16px', width: 64, height: 64 }}
            />
            <span onClick={() => navigate(routesNames.SHOP)} style={{ fontSize: 20, fontWeight: 'bold', cursor: 'pointer' }}>
              Shop
            </span>
            {isNotOnProducts && (
              <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(routesNames.SHOP)}>
                Back to Shop
              </Button>
            )}
          </div>
          <Input.Search
            placeholder="Type to search..."
            value={searchValue}
            size="large"
            allowClear
            className="w-[300px] ant-input-lg"
            onChange={(e) => onSearchChange(e.target.value)}
            onSearch={handleSearch}
            enterButton={<Button type="primary" icon={<SearchOutlined />} style={{ backgroundColor: '#595959', borderColor: '#595959' }} />}
          />
        </Header>
        <Content style={{ padding: 24, flex: 1, margin: 16, background: colorBgContainer, borderRadius: borderRadiusLG, overflow: 'auto' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
