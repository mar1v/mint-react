import { Select } from 'antd';
import { FC } from 'react';

interface sortSelectProps {
  handleSortChange: (value: string) => void;
}

export const SortSelect: FC<sortSelectProps> = ({ handleSortChange }) => {
  return (
    <div className="mb-5 flex justify-end">
      <Select
        className="w-48"
        size="middle"
        placeholder="Sort by"
        onChange={handleSortChange}
        options={[
          { label: 'Price: Low to High', value: 'price-asc' },
          { label: 'Price: High to Low', value: 'price-desc' },
          { label: 'Title: A to Z', value: 'alphabet' },
        ]}
      />
    </div>
  );
};
