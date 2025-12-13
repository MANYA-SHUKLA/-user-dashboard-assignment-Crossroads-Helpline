import axios from 'axios';
import type { User } from '../types/user';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const generateUserId = (existingUsers: User[]): number => {
  const maxId = existingUsers.reduce((max, user) => Math.max(max, user.id), 0);
  return maxId + 1;
};