import React, { FC, useEffect, useMemo } from 'react';
import { Button, Card, Col, Row, Select, Spin, } from 'antd';
import { useAppDispatch, useTypedSelector } from '../hooks/useTypedSelector';
import { addItemToCart } from '../store/reducers/CartSlice/CartSlice';
import { IProduct } from '../types/models';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { toggleItemInWish } from '../store/reducers/Wish/WishSlice';
import { useGetLaptopsQuery, useGetSmartphonesQuery } from '../api/productsApi';
import { setSortType } from '../store/reducers/Sorting/SortingSlice';



const ContentList: FC = () => {
    const dispatch = useAppDispatch();
    const searchValue = useTypedSelector(state => state.search.searchValue);
    const category = useTypedSelector(state => state.category.category);
    const wishItems = useTypedSelector(state => state.wish.items);
    const priceRange = useTypedSelector(state => state.sorting.priceRange);
    const useProductsQuery = (category: 'laptops' | 'smartphones') => {
        const laptopQuery = useGetLaptopsQuery(undefined, { skip: category !== 'laptops' });
        const smartphoneQuery = useGetSmartphonesQuery(undefined, { skip: category !== 'smartphones' });
        return category === 'laptops' ? laptopQuery : smartphoneQuery;
    };

    const { data: products = [], isLoading } = useProductsQuery(category);

    const sortType = useTypedSelector(state => state.sorting.sortType);
    const sortedProducts = useMemo(() => {
        const result = [...products];
        switch (sortType) {
            case 'price-asc':
                return result.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return result.sort((a, b) => b.price - a.price);
            case 'alphabet':
                return result.sort((a, b) => a.title.localeCompare(b.title));
            default:
                return result;
        }
    }, [products, sortType]);

    const filtered = useMemo(() => {
        return sortedProducts.filter(product =>
            product.title.toLowerCase().includes(searchValue.toLowerCase()) &&
            product.price >= priceRange.min &&
            product.price <= priceRange.max
        );
    }, [sortedProducts, searchValue, priceRange]);



    const isProductInWishlist = (productId: number) => {
        return wishItems.some((item: IProduct) => item.id === productId);
    };

    const toggleFavorite = (product: IProduct) => {
        dispatch(toggleItemInWish(product));
    };

    const cartAddCartHandler = (product: IProduct) => {
        dispatch(addItemToCart(product));
    };

    if (isLoading) return <Spin style={{ height: '100%', width: '100%' }} size="large" />;
    if (!products) return <h2>Failed to load products</h2>;

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                <Select
                    style={{ width: 200 }}
                    size="middle"
                    placeholder="Sort by"
                    onChange={(value) => {
                        dispatch(setSortType(value));
                    }}
                    options={[
                        { label: 'Price: Low to High', value: 'price-asc' },
                        { label: 'Price: High to Low', value: 'price-desc' },
                        { label: 'Title: A to Z', value: 'alphabet' },
                    ]}
                />
            </div>
            <Row gutter={[16, 16]}>
                {
                    filtered.length === 0 ? (
                        <h1 style={{ width: '100%', textAlign: 'center' }}>No results</h1>
                    ) : (
                        filtered.map((product) => (
                            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                                <Card
                                    type="inner"
                                    hoverable
                                    variant="borderless"
                                    style={{ height: '100%', position: 'relative', minHeight: '370px' }}
                                    cover={product.images?.[0] && (
                                        <img
                                            alt={product.title}
                                            src={product.images[0]}
                                            style={{
                                                height: '200px',
                                                objectFit: 'cover',
                                                width: '100%',
                                                borderTopLeftRadius: '8px',
                                                borderTopRightRadius: '8px',
                                            }}
                                        />
                                    )}
                                >
                                    <span style={{ fontWeight: 'bold', display: 'flex', position: 'absolute', left: '15px', top: '210px', }}>
                                        {product.title}
                                    </span>
                                    <br />
                                    <span style={{ display: 'flex', position: 'absolute', left: '15px', top: '260px' }}>
                                        {product.description.substring(0, 70)}...
                                    </span>
                                    <p style={{
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        position: 'absolute',
                                        bottom: '15px',
                                        left: '15px'
                                    }}> ${product.price.toFixed(2)}</p>
                                    <Button
                                        type="primary"
                                        onClick={() => cartAddCartHandler(product)}
                                        style={{
                                            display: 'flex',
                                            position: 'absolute',
                                            bottom: '15px',
                                            right: '15px',
                                            backgroundColor: '#000',
                                            borderColor: '#000',
                                            fontWeight: '500'
                                        }}
                                    >
                                        Add to Cart
                                    </Button>
                                    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                        {isProductInWishlist(product.id) ? (
                                            <HeartFilled
                                                style={{ color: 'red', cursor: 'pointer' }}
                                                onClick={() => toggleFavorite(product)}
                                            />
                                        ) : (
                                            <HeartOutlined
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => toggleFavorite(product)}
                                            />
                                        )}
                                    </div>
                                </Card>
                            </Col>
                        ))
                    )
                }
            </Row>
        </>
    );
};

export default ContentList;
