import { Button, Modal } from 'antd'
import React, { FC } from 'react'
import { ICart, IProduct, CartItem } from '../types/models'
import { useAppDispatch, useTypedSelector } from '../hooks/useTypedSelector'
import { clearCart, removeItemFromCart, updateQuantity } from '../store/reducers/CartSlice/CartSlice'
import { routesNames } from '../router/router'
import { Link } from 'react-router-dom'

const CartModal: FC<ICart> = ({ isModalVisible, onCancel }) => {
    const dispatch = useAppDispatch()
    const items = useTypedSelector(state => state.cart)

    const handleRemoveFromCart = (products: IProduct) => {
        dispatch(removeItemFromCart(products));
    };

    const handleUpdateQuantity = (productId: number, quantity: number) => {
        dispatch(updateQuantity({ id: productId, quantity }));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    }

    return (
        <Modal
            title="Cart"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalVisible}
            onCancel={onCancel}
            footer={[
                <div
                    key="footer"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    {items.items.length <= 0 || items.totalQuantity <= 0 ? (
                        <div style={{ marginLeft: 'auto' }}>
                            <Button onClick={onCancel}>Close</Button>
                        </div>
                    ) : (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ fontWeight: 'bold', marginRight: '10px' }}>Total:</span>
                                <span style={{ fontWeight: 'bold' }}>${items.totalAmount.toFixed(2)}</span>
                            </div>
                            <div>
                                <Button onClick={handleClearCart} style={{ marginRight: '10px' }}>Clear Cart</Button>
                                <Button onClick={onCancel}>Close</Button>
                                <Link to={routesNames.CART}>
                                    <Button style={{
                                        marginLeft: '10px',
                                        backgroundColor: '#000',
                                        borderColor: '#000',
                                        fontWeight: '500'
                                    }} type="primary">Checkout</Button>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            ]}
        >
            {
                items.items.length === 0 || items.totalQuantity === 0 ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <p style={{ fontStyle: 'italic' }}> Your cart is empty</p>
                    </div>
                ) : (
                    items.items.map((item: CartItem) => (
                        <div
                            key={item.id}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '10px',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img
                                    src={item.images[0]}
                                    alt={item.title}
                                    style={{ width: '50px', height: '50px', marginRight: '10px', objectFit: 'cover' }}
                                />
                                <div>
                                    <p>{item.title}</p>
                                    <p style={{ fontWeight: 'bold' }}>${item.price.toFixed(2)}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Button onClick={() => handleRemoveFromCart(item)}>Remove</Button>
                                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                                    <Button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</Button>
                                    <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                                    <Button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</Button>
                                </div>
                            </div>
                        </div>
                    ))
                )
            }
        </Modal>
    )
}

export default CartModal