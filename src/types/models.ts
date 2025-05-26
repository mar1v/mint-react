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
    content: string;
    price: number;
    imageUrl: string;
}


export interface FormModalProps {
    visible: boolean,
    onCancel: () => void;
}