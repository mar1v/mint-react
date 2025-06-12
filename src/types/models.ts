export interface IUser {
  user: string;
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
