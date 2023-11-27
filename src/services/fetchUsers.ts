import { User } from '../types/user';

interface Filters {
  gender?: string;
  location?: string;
}

const fetchUsers = async (page: number, limit: number, filters: Filters): Promise<User[]> => {
  try {
    const response = await fetch('/customers.json');
    let data = (await response.json()) as User[];

    if (filters.gender) {
      data = data.filter((user) => user.gender === filters.gender);
    }

    if (filters.location) {
      data = data.filter(
        (user) => user.country === filters.location || user.city === filters.location
      );
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return data.slice(startIndex, endIndex);
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export default fetchUsers;
