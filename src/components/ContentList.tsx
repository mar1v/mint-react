import { Button, Card, Col, Row, Spin } from 'antd';
import React, { FC, useMemo } from 'react';
import { useAppDispatch } from '../hooks/useTypedSelector';
import { useSelector } from 'react-redux';
import { addItem } from '../store/reducers/CartSlice/CartSlice';
import { useGetProductsQuery } from '../api/productsApi';
import { RootState } from '../store';
import { IProduct } from '../types/models';

const ContentList: FC = () => {
    const dispatch = useAppDispatch();
    const searchValue = useSelector((state: RootState) => state.search.searchValue);
    const { data: products = [], isLoading, error } = useGetProductsQuery();

    const filtered = useMemo(() => {
        return products
            .filter(
                (product) =>
                    product.title &&
                    product.images &&
                    product.images.length > 0 &&
                    product.images[0]?.trim() !== ""
            )
            .filter((product) =>
                product.title.toLowerCase().includes(searchValue.toLowerCase())
            );
    }, [products, searchValue]);

    const cartAddCartHandler = (product: IProduct) => {
        dispatch(addItem(product));
    };

    if (isLoading) return <Spin style={{ height: '100%', width: '100%' }} size="large" />;
    if (error) return <h2>Failed to load products</h2>;

    return (
        <Row gutter={[16, 16]}>
            {filtered.length === 0 ? (
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
                            }}> ${product.price}</p>
                            <Button
                                type="primary"
                                onClick={() => cartAddCartHandler(product)}
                                style={{
                                    display: 'flex',
                                    position: 'absolute',
                                    bottom: '15px',
                                    right: '15px',
                                }}
                            >
                                Add to Cart
                            </Button>
                        </Card>
                    </Col>
                ))
            )}
        </Row>
    );
};

export default ContentList;
