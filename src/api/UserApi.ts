import apiClient from "./api"; // Đảm bảo bạn có apiClient để gửi yêu cầu HTTP
import { API_ENDPOINTS } from "../constants/apiEndpoints";



export interface User {
  id: string; // ID của người dùng
  username: string; // Tên người dùng
  password: string; // Mật khẩu (nên mã hóa trước khi lưu ở frontend)
  created_at: string; // Thời gian tạo tài khoản
}
class UserApiService {
  async getAllUsers() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USERS.LIST);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): never {
    console.error("API Error:", error);
    throw error;
  }
}

export const userApi = new UserApiService();