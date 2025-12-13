export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

export interface UserFormData {
  name: string;
  email: string;
  phone: string;
  website: string;
  companyName: string;
}

export interface ApiState {
  users: User[];
  loading: boolean;
  error: string | null;
}