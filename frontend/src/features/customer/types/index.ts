export interface Address {
  id: string;
  type: string;
  address: string;
  isDefault: boolean;
  userId: string;
}

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  memberSince: string;
  addresses: Address[];
}

export interface UpdateProfileRequest {
  name?: string;
  phone?: string;
  address?: string;
}
