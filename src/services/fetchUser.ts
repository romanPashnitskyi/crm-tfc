import { User } from '../types/user';

const fetchUser = async (firstName: string, lastName: string): Promise<User | null> => {
  try {
    const response = await fetch('/customers.json');
    const users = (await response.json()) as User[];

    const foundUser = users.find(
      (user) => user.firstName === firstName && user.lastName === lastName
    );

    return foundUser || null;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

export default fetchUser;
