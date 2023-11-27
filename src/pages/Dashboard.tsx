import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Row } from 'react-bootstrap';
import UserCard from '../components/UserCard';
import FilterForm from '../components/FilterForm';
import fetchUsers from '../services/fetchUsers';
import { User } from '../types/user';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [gender, setGender] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const limit = 50;

  useEffect(() => {
    const loadUsers = async () => {
      const newUsers = await fetchUsers(page, limit, { gender, location });
      setUsers((prevUsers) => [...prevUsers, ...newUsers]);
      setHasMore(newUsers.length >= limit);
    };
    loadUsers();
  }, []);

  const applyFilters = async () => {
    setPage(1);
    const filteredUsers = await fetchUsers(1, limit, { gender, location });
    setUsers(filteredUsers);
    setHasMore(filteredUsers.length >= limit);
  };

  const loadMoreUsers = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    const additionalUsers = await fetchUsers(nextPage, limit, { gender, location });
    setUsers((prevUsers) => [...prevUsers, ...additionalUsers]);
    setHasMore(additionalUsers.length >= limit);
  };

  const handleUserClick = (user: User) => {
    const userName = encodeURIComponent(`${user.firstName}-${user.lastName}`);
    navigate(`/user/${userName}`);
  };

  return (
    <>
      <h2>Filter Users</h2>
      <FilterForm
        gender={gender}
        location={location}
        onGenderChange={setGender}
        onLocationChange={setLocation}
        onApply={applyFilters}
      />

      <h2>Users List</h2>
      <InfiniteScroll
        dataLength={users.length}
        next={loadMoreUsers}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Row>
          {users.map((user, index) => (
            <UserCard key={index} user={user} onClick={() => handleUserClick(user)} />
          ))}
        </Row>
      </InfiniteScroll>
    </>
  );
};

export default Dashboard;
