export interface IProduct {
    id: number;
    title: string;
    content: string;
    price: number;
    imageUrl: string;
}
export const products: IProduct[] = [
    { id: 1, title: 'Headphone', content: 'Premium wireless headphones with noise cancellation', price: 99.99, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop&crop=center' },
    { id: 2, title: 'Keyboard', content: 'Mechanical gaming keyboard with RGB backlighting', price: 129.99, imageUrl: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=200&fit=crop&crop=center' },
    { id: 3, title: 'Mouse', content: 'Ergonomic wireless mouse with precision tracking', price: 49.99, imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop&crop=center' },
    { id: 4, title: 'Monitor', content: '4K UHD display with HDR support', price: 799.99, imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=200&fit=crop&crop=center' },
    { id: 5, title: 'Webcam', content: 'HD video camera for streaming and calls', price: 149.99, imageUrl: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=300&h=200&fit=crop&crop=center' },
    { id: 6, title: 'Speaker', content: 'Bluetooth speaker with premium sound quality', price: 79.99, imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=200&fit=crop&crop=center' },
    { id: 7, title: 'Microphone', content: 'Professional USB microphone for podcasting', price: 59.99, imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=300&h=200&fit=crop&crop=center' },
    { id: 8, title: 'Tablet', content: 'High-resolution tablet with stylus support', price: 399.99, imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop&crop=center' },
    { id: 9, title: 'Smartwatch', content: 'Fitness tracking smartwatch with GPS', price: 299.99, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop&crop=center' },
    { id: 10, title: 'Router', content: 'Wi-Fi 6 router with mesh network support', price: 199.99, imageUrl: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=300&h=200&fit=crop&crop=center' },
    { id: 11, title: 'Power Bank', content: 'Portable charger with fast charging technology', price: 129.99, imageUrl: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=200&fit=crop&crop=center' },
    { id: 12, title: 'Drone', content: 'Compact drone with 4K camera and stabilization', price: 399.99, imageUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=300&h=200&fit=crop&crop=center' },
];