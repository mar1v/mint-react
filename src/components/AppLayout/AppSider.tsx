import { routesNames } from '#constants';
import { HeartOutlined, MenuOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Badge, Layout, Menu } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { PriceFilter } from './PriceFilter';

interface AppSiderProps {
  collapsed: boolean;
  cartItemsCount: number;
  priceRange: { min: number; max: number };
  onCategoryChange: (value: 'laptops' | 'smartphones') => void;
  onPriceRangeChange: (value: { min: number; max: number }) => void;
  setIsModalFormVisible: (visible: boolean) => void;
  setIsModalCartVisible: (visible: boolean) => void;
}

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

export const AppSider: FC<AppSiderProps> = ({
  collapsed,
  cartItemsCount,
  priceRange,
  onCategoryChange,
  onPriceRangeChange,
  setIsModalFormVisible,
  setIsModalCartVisible,
}) => {
  const navigate = useNavigate();

  const menuItems = [
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
        <Badge count={cartItemsCount} size="small" offset={collapsed ? [-22, 10] : [-21, -3]}>
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
  ];

  return (
    <Layout.Sider style={siderStyle} trigger={null} collapsible collapsed={collapsed}>
      <Menu theme="dark" mode="inline" selectable={false} items={menuItems} />

      <PriceFilter collapsed={collapsed} priceRange={priceRange} onPriceRangeChange={onPriceRangeChange} />
    </Layout.Sider>
  );
};
