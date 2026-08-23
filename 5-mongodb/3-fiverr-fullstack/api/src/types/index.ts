export interface ErrorResponse {
  status: string;
  message: string;
  code: string;
  stack?: string;
}

export type UserType = {
  _id: string;
  username: string;
  email: string;
  password: string;
  country: string;
  profilePicture: string;
  isSeller?: boolean;
  phone?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  path: string;
  destination: string;
  filename: string;
  size: number;
}

export interface ImageFiles {
  coverImage: File[];
  images: File[];
}

export interface Query {
  category?: string;
  userId?: string;
  minPrice?: string;
  maxPrice?: string;
  search?: string;
}

export interface Filters {
  category?: string;
  user?: string;
  packagePrice?: {
    $gte?: number;
    $lte?: number;
  };
  title?: {
    $regex: string;
    $options: string;
  };
}
