import axios from "axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
} from "../types/auth";
import apiClient from "./api";

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

        // Lưu roles vào sessionStorage
        if (response.data.roles) {
          sessionStorage.setItem("roles", JSON.stringify(response.data.roles));
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

        // Lưu roles vào sessionStorage
        if (response.data.roles) {
          sessionStorage.setItem("roles", JSON.stringify(response.data.roles));
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
    sessionStorage.removeItem("roles");
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

  /**
   * Get user roles
   */
  static getRoles(): string[] {
    const rolesStr = sessionStorage.getItem("roles");
    if (!rolesStr) {
      return [];
    }
    try {
      return JSON.parse(rolesStr);
    } catch (error) {
      console.error("Error parsing roles:", error);
      return [];
    }
  }

  /**
   * Check if user has specific role
   */
  static hasRole(role: string): boolean {
    const roles = this.getRoles();
    return roles.includes(role);
  }

  /**
   * Check if user is admin
   */
  static isAdmin(): boolean {
    return this.hasRole("Admin");
  }

  /**
   * Decode JWT token and get roles
   */
  static getRolesFromToken(): string[] {
    const token = sessionStorage.getItem("token");
    if (!token) return [];

    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      const payload = JSON.parse(jsonPayload);
      return payload.data?.roles || [];
    } catch (error) {
      console.error("Error decoding token:", error);
      return [];
    }
  }
}

export default AuthApi;
