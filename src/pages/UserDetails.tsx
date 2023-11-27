import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { User } from '../types/user';
import fetchUser from '../services/fetchUser';
import fetchUserOrders from '../services/fetchUserOrders';
import { Order } from '../types/order';
import UserInfo from '../components/UserInfo';
import UserOrders from '../components/UserOrders';

const UserDetails: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const { userName = '' } = useParams<{ userName?: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (userName) {
      const [firstName, lastName] = decodeURIComponent(userName).split('-');
      const loadUser = async () => {
        const userDetails = await fetchUser(firstName, lastName);
        setUser(userDetails);
      };
      loadUser();

      const loadOrders = async () => {
        const userOrders = await fetchUserOrders();
        setOrders(userOrders);
      };
      loadOrders();
    }
  }, [userName]);

  const handleBackClick = () => {
    navigate('/');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Button onClick={handleBackClick} style={{ marginBottom: '10px' }}>
        Back to List
      </Button>
      <UserInfo user={user} />
      <UserOrders orders={orders} />
    </>
  );
};

export default UserDetails;
