import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { User } from '../types/user';

interface UserCardProps {
  user: User;
  onClick: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  return (
    <Col sm={12} md={6} lg={4} xl={3} onClick={onClick}>
      <Card className="card-hover" style={{ marginTop: '10px', marginBottom: '10px' }}>
        <Card.Body>
          <Card.Title>
            <i className="bi bi-person" style={{ marginRight: '10px' }}></i>
            {`${user.firstName} ${user.lastName}`}
          </Card.Title>
          <Card.Text>{user.email}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default UserCard;
