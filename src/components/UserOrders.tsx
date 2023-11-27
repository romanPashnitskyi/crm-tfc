import React from 'react';
import { Table } from 'react-bootstrap';
import { Order } from '../types/order';

interface UserOrdersProps {
  orders: Order[];
}

const UserOrders: React.FC<UserOrdersProps> = ({ orders }) => {
  return (
    <>
      <h3 style={{ marginTop: '10px', marginBottom: '10px' }}>Order History</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Item Name</th>
            <th>Amount</th>
            <th>Price</th>
            <th>Currency</th>
            <th>Created At</th>
            <th>Shipped At</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.number}</td>
              <td>{order.itemName}</td>
              <td>{order.amount}</td>
              <td>{order?.['price '] ? order?.['price '].toFixed(2) : 'N/A'}</td>
              <td>{order.currency}</td>
              <td>{new Date(order.createdAt * 1000).toLocaleDateString()}</td>
              <td>{new Date(order.shippedAt * 1000).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserOrders;
