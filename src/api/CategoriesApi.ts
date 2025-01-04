import apiClient from "./api"; // Đảm bảo bạn có apiClient để gửi yêu cầu HTTP
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export interface Category {
  id: string; // Change this from number to string
  name: string;
  description: string;
}

class CategoryApiService {
  async getAllCategories() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.CATEGORIES.LIST);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }



  async createCategory(categoryData: Partial<Category>) {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.CATEGORIES.CREATE,
        categoryData
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateCategory(id: string, categoryData: Partial<Category>) {
    try {
      const response = await apiClient.put(
        `${API_ENDPOINTS.CATEGORIES.UPDATE}/${id}`,
        categoryData
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteCategory(id: string) {
    try {
      const response = await apiClient.delete(
        `${API_ENDPOINTS.CATEGORIES.DELETE}/${id}`
      );
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

export const categoryApi = new CategoryApiService();
