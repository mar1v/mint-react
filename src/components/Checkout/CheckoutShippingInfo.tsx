import { useLazyGetCitiesQuery, useLazyGetWarehousesQuery } from '#api/novaPoshtaApi';
import { useAppDispatch, useTypedSelector } from '#hooks';
import { setField } from '#store/reducers';
import { City, IShippingState } from '#types/models';
import { Input, Select } from 'antd';
import React, { FC, useEffect, useState } from 'react';

export const CheckoutShippingInfo: FC = () => {
  const dispatch = useAppDispatch();
  const { firstName, lastName, phone, email, postalCode, city, warehouse } = useTypedSelector((state) => state.shipping);
  const isCartEmpty = useTypedSelector((state) => state.cart.itemsInCart.length === 0);
  const [cityInputValue, setCityInputValue] = useState('');
  const [fetchCities, { data: fetchedCities }] = useLazyGetCitiesQuery();
  const [fetchWarehouses, { data: fetchedWarehouses }] = useLazyGetWarehousesQuery();

  useEffect(() => {
    setCityInputValue(city?.Description || '');
  }, [city]);

  const handleCitySearch = (value: string) => {
    setCityInputValue(value);
    dispatch(setField({ key: 'city', value: null }));
    fetchCities(value);
  };

  const handleCitySelect = (selected: City) => {
    dispatch(setField({ key: 'city', value: selected }));
    fetchWarehouses(selected.Ref);
  };

  const handleWarehouseSelect = (desc: string) => {
    const selected = fetchedWarehouses?.find((w) => w.Description === desc);
    if (selected) {
      dispatch(setField({ key: 'warehouse', value: selected }));
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setField({ key: name as keyof IShippingState, value }));
  };

  if (isCartEmpty) return null;

  return (
    <div className="max-w-4xl mx-auto mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="text"
          name="firstName"
          allowClear
          placeholder="First name"
          value={firstName}
          onChange={handleChangeInput}
          className="w-full h-12 px-4 "
        />
        <Input
          type="text"
          name="lastName"
          allowClear
          placeholder="Last name"
          value={lastName}
          onChange={handleChangeInput}
          className="w-full h-12 px-4 "
        />
        <Input
          type="text"
          name="email"
          allowClear
          placeholder="Email"
          value={email}
          onChange={handleChangeInput}
          className="w-full h-12 px-4 col-span-2"
        />
        <Input
          type="text"
          name="city"
          allowClear
          placeholder="City"
          value={cityInputValue}
          onChange={(e) => handleCitySearch(e.target.value)}
          className="w-full h-12 px-4"
        />
        <Input
          type="text"
          name="postalCode"
          allowClear
          placeholder="Postal code"
          value={postalCode}
          onChange={handleChangeInput}
          className="w-full h-12 px-4 "
        />
        {fetchedCities && cityInputValue !== (city?.Description || '') && (
          <ul className="mt-1 border rounded bg-white shadow z-10 max-h-40 overflow-y-auto">
            {fetchedCities.map((c) => (
              <li key={c.Ref} onClick={() => handleCitySelect(c)} className="p-2 hover:bg-gray-100 cursor-pointer">
                {c.Description}
              </li>
            ))}
          </ul>
        )}
        <Input
          type="text"
          name="phone"
          allowClear
          placeholder="Phone (optional)"
          value={phone}
          onChange={handleChangeInput}
          className="w-full h-12 px-4 col-span-2"
        />
      </div>
      <Select
        className="w-full h-12 mt-4"
        onChange={handleWarehouseSelect}
        disabled={!city}
        value={warehouse?.Description || ''}
        placeholder="Select warehouse"
        showSearch
        optionFilterProp="children"
      >
        {fetchedWarehouses?.map((w) => (
          <Select.Option key={w.Ref} value={w.Description}>
            {w.Description}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};
