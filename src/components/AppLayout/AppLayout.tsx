import { CartModal } from '#components/CartModal';
import { FormModal } from '#components/FormModal';
import { useAppLayout } from '#hooks';
import { Layout } from 'antd';
import { FC, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { AppHeader, AppSider } from './';

export const AppLayout: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalFormVisible, setIsModalFormVisible] = useState(false);
  const [isModalCartVisible, setIsModalCartVisible] = useState(false);
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
        setIsModalFormVisible={setIsModalFormVisible}
        setIsModalCartVisible={setIsModalCartVisible}
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

      <FormModal visible={isModalFormVisible} onCancel={() => setIsModalFormVisible(false)} />

      <CartModal isModalVisible={isModalCartVisible} onCancel={() => setIsModalCartVisible(false)} />
    </Layout>
  );
};
