import React, { FC, useMemo } from 'react'
import Navbar from '../components/Navbar';
import { useAppDispatch, useTypedSelector } from '../hooks/useTypedSelector';
import { Button, Card, Col, Row } from 'antd';
import { IProduct } from '../types/models';
import { CloseOutlined } from '@ant-design/icons';
import { removeItemFromWish } from '../store/reducers/Wish/WishSlice';
import { addItemToCart } from '../store/reducers/CartSlice/CartSlice';

const Wishlist: FC = () => {
    const dispatch = useAppDispatch();
    const items = useTypedSelector(state => state.wish);
    const searchValue = useTypedSelector(state => state.search);
    const filtered = useMemo(() => {
        return items.items.filter((item: IProduct) =>
            item.title.toLowerCase().includes(searchValue.searchValue.toLowerCase()) &&
            item.title.length > 5 &&
            item.price > 0 &&
            item.description && item.description.length > 10
        );
    }, [items, searchValue]);

    const handleRemoveFromWish = (products: IProduct) => {
        dispatch(removeItemFromWish(products));
    };

    const handleAddToCart = (products: IProduct) => {
        dispatch(addItemToCart(products));
    };

    return (
        <Navbar>
            {filtered.length === 0 ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p style={{ fontStyle: 'italic' }}> Your wish list is empty</p>
                </div>
            ) : (
                <Row gutter={[16, 16]}>
                    {filtered.map((item: IProduct) => (
                        <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                            <Card
                                style={{
                                    position: 'relative',
                                    height: '400px',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}

                                cover={
                                    <div style={{ position: 'relative', backgroundColor: '#f5f5f5' }}>
                                        <img
                                            alt={item.title}
                                            src={item.images[0]}
                                            style={{
                                                width: '100%',
                                                height: '200px',
                                                objectFit: 'contain',
                                                padding: '16px'
                                            }}
                                        />
                                        <Button
                                            type="text"
                                            icon={<CloseOutlined />}
                                            size="small"
                                            style={{
                                                position: 'absolute',
                                                top: '8px',
                                                right: '8px',
                                                border: 'none'
                                            }}
                                            onClick={() => handleRemoveFromWish(item)}
                                        />
                                    </div>
                                }
                            >
                                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <h3 style={{
                                            margin: '0 0 8px 0',
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            minHeight: '48px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',

                                        }}>
                                            {item.title}
                                        </h3>
                                        <p style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600' }}>
                                            ${item.price} USD
                                        </p>
                                    </div>
                                    <Button
                                        type="primary"
                                        size="large"
                                        block
                                        style={{
                                            backgroundColor: '#000',
                                            borderColor: '#000',
                                            fontWeight: '500',
                                            height: '44px',
                                            marginTop: 'auto'
                                        }}
                                        onClick={() => handleAddToCart(item)}
                                    >
                                        ADD TO CART
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Navbar>
    )
}

export default Wishlist