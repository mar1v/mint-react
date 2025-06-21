import { CartModal } from '#components/CartModal';
import LoginForm from '#components/LoginForm';
import { useAppLayout } from '#hooks';
import { Layout } from 'antd';
import { FC, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { AppSider } from './AppSider';

export const AppLayout: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalCartVisible, setIsModalCartVisible] = useState(false);
  const [isModalLoginVisible, setIsModalLoginVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    handleSearch,
    onSearchChange,
    onPriceRangeChange,
    onCategoryChange,
    isNotOnProducts,
    searchValue,
    priceRange,
    cartItemsCount,
    colorBgContainer,
    borderRadiusLG,
  } = useAppLayout(searchParams, setSearchParams);

  return (
    <Layout className="min-h-screen">
      <AppSider
        collapsed={collapsed}
        cartItemsCount={cartItemsCount}
        priceRange={priceRange}
        onCategoryChange={onCategoryChange}
        onPriceRangeChange={onPriceRangeChange}
        setIsModalCartVisible={setIsModalCartVisible}
        setIsModalLoginVisible={setIsModalLoginVisible}
        isNotOnProducts={isNotOnProducts}
      />
      <Layout>
        <AppHeader
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          isNotOnProducts={isNotOnProducts}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          handleSearch={handleSearch}
          colorBgContainer={colorBgContainer}
        />

        <Layout.Content
          className="p-6 flex-1 m-4 overflow-auto"
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Layout.Content>
      </Layout>
      <LoginForm visible={isModalLoginVisible} onCancel={() => setIsModalLoginVisible(false)} />
      <CartModal isModalVisible={isModalCartVisible} onCancel={() => setIsModalCartVisible(false)} />
    </Layout>
  );
};
