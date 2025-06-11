import { IProduct } from '#types/models';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row } from 'antd';
import { FC, useMemo } from 'react';
import { useAppDispatch, useSortedProducts, useTypedSelector } from '../hooks';
import { addItemToCart, removeItemFromWish } from '../store/reducers';
import { filterProducts } from '../utils/filteredProducts';

export const Wishlist: FC = () => {
  const dispatch = useAppDispatch();
  const appliedSearch = useTypedSelector((state) => state.filter.appliedSearchValue);
  const priceRange = useTypedSelector((state) => state.filter.priceRange);
  const wishItems = useTypedSelector((state) => state.wish.itemsInWishList);
  const sortedProducts = useSortedProducts(wishItems);
  const filteredProducts = useMemo(
    () => filterProducts<IProduct>(sortedProducts, appliedSearch, priceRange),
    [sortedProducts, appliedSearch, priceRange],
  );
  const handleRemoveFromWish = (products: IProduct) => {
    dispatch(removeItemFromWish(products));
  };
  const handleAddToCart = (products: IProduct) => {
    dispatch(addItemToCart(products));
  };

  return (
    <>
      {filteredProducts.length === 0 ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p style={{ fontStyle: 'italic' }}> Your wish list is empty</p>
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {filteredProducts.map((item) => (
            <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                style={{
                  position: 'relative',
                  height: '400px',
                  display: 'flex',
                  flexDirection: 'column',
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
                        padding: '16px',
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
                        border: 'none',
                      }}
                      onClick={() => handleRemoveFromWish(item)}
                    />
                  </div>
                }
              >
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h3
                      style={{
                        margin: '0 0 8px 0',
                        fontSize: '16px',
                        fontWeight: '500',
                        minHeight: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600' }}>${item.price} USD</p>
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
                      marginTop: 'auto',
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
    </>
  );
};
