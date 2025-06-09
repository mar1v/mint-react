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

export interface CartItem extends IProduct {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

export interface WishState {
  itemsInWish: IProduct[];
}

export interface FilterState {
  priceRange: {
    min: number;
    max: number;
  };
  sortType: string;
  searchValue: string;
}

export interface CategoryState {
  category: 'laptops' | 'smartphones';
  items: IProduct[];
}
