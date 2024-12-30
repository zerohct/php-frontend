import axios from "axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
} from "../types/auth";
import apiClient from "./api";
import { Cookie } from "lucide-react";

class AuthApi {
  /**
   * Login user and get authentication token
   */
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );

      if (response.data.token) {
        // Lưu token vào sessionStorage
        sessionStorage.setItem("token", response.data.token);

        // Lưu username vào sessionStorage
        if (response.data.username) {
          sessionStorage.setItem("username", response.data.username);
        }
      }

      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error("Invalid username or password");
      }
      if (error.response?.status === 404) {
        throw new Error("Account not found");
      }
      throw new Error("Login failed");
    }
  }

  /**
   * Register new user account
   */
  static async register(
    credentials: RegisterCredentials
  ): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        API_ENDPOINTS.AUTH.REGISTER,
        credentials
      );

      if (response.data.token) {
        // Lưu token vào sessionStorage
        sessionStorage.setItem("token", response.data.token);

        // Lưu username vào sessionStorage
        if (response.data.username) {
          sessionStorage.setItem("username", response.data.username);
        }
      }

      return response.data;
    } catch (error: any) {
      if (error.response?.status === 409) {
        throw new Error("Username already exists");
      }
      if (error.response?.status === 400) {
        throw new Error("Username and password are required");
      }
      throw new Error("Registration failed");
    }
  }

  /**
   * Logout current user
   */
  static logout(): void {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    return !!sessionStorage.getItem("token");
  }

  /**
   * Get current username
   */
  static getUsername(): string | null {
    return sessionStorage.getItem("username");
  }
}

export default AuthApi;
