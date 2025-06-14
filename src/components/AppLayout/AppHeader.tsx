import { routesNames } from '#constants';
import { ArrowLeftOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Layout } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface AppHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  isNotOnProducts: boolean;
  searchValue: string;
  onSearchChange: (value: string) => void;
  handleSearch: (value: string) => void;
  colorBgContainer: string;
}

export const AppHeader: FC<AppHeaderProps> = ({
  collapsed,
  setCollapsed,
  isNotOnProducts,
  searchValue,
  onSearchChange,
  handleSearch,
  colorBgContainer,
}) => {
  const navigate = useNavigate();

  return (
    <Layout.Header className="p-0 flex justify-between items-center px-4" style={{ background: colorBgContainer }}>
      <div className="flex items-center gap-4">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="text-base w-16 h-16"
        />
        <span onClick={() => navigate(routesNames.SHOP)} className="text-xl font-bold cursor-pointer">
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
    </Layout.Header>
  );
};
