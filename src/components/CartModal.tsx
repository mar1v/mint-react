import { Avatar, Badge, Modal, Space } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'
import React, { FC } from 'react'
import { ICart } from '../types/models'

const CartModal: FC<ICart> = ({ isModalVisible, onCancel }) => {
    return (
        <Modal
            title="Cart"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalVisible}
            onCancel={onCancel}
            footer={null}
        >
        </Modal>
    )
}

export default CartModal
