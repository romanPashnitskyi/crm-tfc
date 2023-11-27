import { Order } from '../types/order';

const fetchUserOrders = async (): Promise<Order[]> => {
  try {
    const response = await fetch('/orders.json');
    const allOrders = (await response.json()) as Order[];

    return allOrders;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return [];
  }
};

export default fetchUserOrders;
