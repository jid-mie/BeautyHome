export interface User {
  id: number;
  name: string;
  full_name?: string;
  email: string;
  phone?: string;
  address?: string;
  skill?: string;
  avatar?: string;
  role?: 'customer' | 'staff' | 'admin';
  status?: number | string;
  staff_id?: number;
  customer_id?: number;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password?: string; // Optional if using social login later
}

export interface RegisterRequest {
  full_name: string;
  email: string;
  phone: string;
  password?: string;
  address?: string;
}
