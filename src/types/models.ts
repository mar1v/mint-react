export interface ICart {
    isModalVisible: boolean,
    onCancel: () => void
}

export interface IUser {
    user: string,
    password: string
}

export interface IProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string[];
    category: string;
}

export interface FormModalProps {
    visible: boolean,
    onCancel: () => void;
}
export interface CartItem extends IProduct {
    quantity: number;
}
export interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalAmount: number;
}

export interface SearchState {
    searchValue: string;
}

export interface WishState {
    items: IProduct[];
}

export interface SortingState {
    priceRange: {
        min: number;
        max: number;
    };
    sortType: string;
}

export interface CategoryState {
    category: 'laptops' | 'smartphones';
    items: IProduct[];
}