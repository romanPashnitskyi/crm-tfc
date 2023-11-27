import React from 'react';
import { Card } from 'react-bootstrap';
import { User } from '../types/user';

interface UserInfoProps {
  user: User;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{`${user.firstName} ${user.lastName}`}</Card.Title>
        <Card.Text>Email: {user.email}</Card.Text>
        <Card.Text>Gender: {user.gender}</Card.Text>
        <Card.Text>City: {user.city}</Card.Text>
        <Card.Text>State: {user.state}</Card.Text>
        <Card.Text>Post Code: {user.postCode}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default UserInfo;
