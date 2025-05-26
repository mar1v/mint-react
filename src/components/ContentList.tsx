import { Button, Card, Col, Row } from 'antd';
import React, { FC } from 'react';
import { products } from '../constants';




const ContentList: FC = () => {
    return (
        <Row gutter={[16, 16]}>
            {products.map((product) => (
                <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                    <Card
                        type="inner"
                        hoverable
                        title={product.title}
                        variant="borderless"
                        style={{ height: '100%', position: 'relative', minHeight: '370px' }}
                        extra={<Button type="primary">Add to Cart</Button>}
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
                        {product.content}
                        <p style={{
                            fontWeight: 'bold',
                            position: 'absolute',
                            bottom: '25px',
                            left: '15px'
                        }}> ${product.price}</p>
                    </Card>
                </Col>
            ))
            }
        </Row >
    );
};

export default ContentList;