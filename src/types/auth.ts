export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  status: string;
  message: string;
  token?: string;
  username: string;
}

export interface User {
  user_id: number;
  username: string;
  roles: string[];
}
