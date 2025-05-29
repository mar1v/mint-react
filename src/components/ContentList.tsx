import { Button, Card, Col, Row } from 'antd';
import React, { FC } from 'react';
import { products } from '../constants';
import { useAppDispatch } from '../hooks/useTypedSelector';
import { addItem } from '../store/reducers/CartSlice/CartSlice';
import { IProduct } from '@/types/models';




const ContentList: FC = () => {
    const dispatch = useAppDispatch();
    const cartAddCartHandler = (product: IProduct) => {
        dispatch(addItem(product));
    }
    return (
        <Row gutter={[16, 16]}>
            {products.map((product) => (
                <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                    <Card
                        type="inner"
                        hoverable
                        variant="borderless"
                        style={{ height: '100%', position: 'relative', minHeight: '370px' }}

                        cover={product.imageUrl && <img
                            alt={product.title}
                            src={product.imageUrl}
                            style={{
                                height: '200px',
                                objectFit: 'cover',
                                width: '100%'
                            }}
                        />}
                    >
                        <span style={{ fontWeight: 'bold', display: 'flex', position: 'absolute', left: '15px', top: '210px', }}>
                            {product.title}
                        </span>
                        <br />
                        <span style={{ display: 'flex', position: 'absolute', left: '15px', top: '250px' }}>
                            {product.content}
                        </span>
                        <p style={{
                            fontWeight: 'bold',
                            display: 'flex',
                            position: 'absolute',
                            bottom: '15px',
                            left: '15px'
                        }}> ${product.price}</p>

                        {<Button type="primary" onClick={() => { cartAddCartHandler(product) }} style={{ display: 'flex', position: 'absolute', bottom: '15px', right: '15px' }}>Add to Cart</Button>}
                    </Card>
                </Col>
            ))
            }
        </Row >
    );
};

export default ContentList;