import { InputNumber, Slider } from 'antd';
import { FC } from 'react';

interface PriceFilterProps {
  collapsed: boolean;
  priceRange: { min: number; max: number };
  onPriceRangeChange: (value: { min: number; max: number }) => void;
}

export const PriceFilter: FC<PriceFilterProps> = ({ collapsed, priceRange, onPriceRangeChange }) => {
  if (collapsed) return null;

  return (
    <div className="px-6 mt-6 flex flex-col gap-2">
      <p className="text-white/65 m-0 text-sm">Filter by Price</p>
      <div className="flex gap-2">
        <InputNumber
          value={priceRange.min}
          min={0}
          max={50000}
          step={10}
          size="small"
          className="w-[70px]"
          style={{
            borderColor: '#303030',
            color: 'white',
            borderRadius: 6,
          }}
          onChange={(value) => onPriceRangeChange({ min: value ?? 0, max: priceRange.max })}
        />
        <InputNumber
          value={priceRange.max}
          min={0}
          max={50000}
          step={10}
          size="small"
          className="w-[70px]"
          style={{
            borderColor: '#303030',
            color: 'white',
            borderRadius: 6,
          }}
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
  );
};
