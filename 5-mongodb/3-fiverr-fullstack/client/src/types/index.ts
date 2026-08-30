export interface RegisterData {
  username: string;
  email: string;
  profilePicture: File;
  country: string;
  password: string;
  isSeller: boolean;
  phone?: string;
  description?: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  country: string;
  profilePicture: string;
  isSeller: boolean;
  description?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}

export interface FilterParams {
  category?: string | null;
  search?: string | null;
  userId?: string;
  minPrice?: string;
  maxPrice?: string;
}

export interface Gig<U> {
  _id: string;
  user: U;
  title: string;
  description: string;
  reviewCount: number;
  starCount: number;
  category: string;
  coverImage: string;
  images: string[];
  packageTitle: string;
  packageDescription: string;
  packagePrice: number;
  packageFeatures: string[];
  packageDuration: number;
  packageRevision: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllGigRes {
  message: string;
  results: number;
  data: Gig<{
    _id: string;
    username: string;
    profilePicture: string;
  }>[];
}

export interface GetOneGigRes {
  message: string;
  data: Gig<User>;
}
