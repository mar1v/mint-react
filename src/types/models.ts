export interface IUser {
  username: string;
  password: string;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
}
export interface ICart {
  isModalVisible: boolean;
  onCancel: () => void;
}
export interface ICartItem extends IProduct {
  quantity: number;
}

export interface ICartState {
  itemsInCart: ICartItem[];
  totalQuantity: number;
  totalAmount: number;
}

export interface IWishListState {
  itemsInWishList: IProduct[];
}

export interface IFilterState {
  priceRange: {
    min: number;
    max: number;
  };
  sortType: string;
  searchValue: string;
  appliedSearchValue: string;
}

export interface ICategoryState {
  category: 'laptops' | 'smartphones';
  items: IProduct[];
}
export interface City {
  Description: string;
  Ref: string;
}

export interface Warehouse {
  Description: string;
  Ref: string;
}

export interface IShippingState {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  postalCode: string;
  city: City | null;
  warehouse: Warehouse | null;
}
