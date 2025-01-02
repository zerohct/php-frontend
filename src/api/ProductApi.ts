import apiClient from "./api";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  category_id: number;
  image?: string;
  category_name?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CheckoutData {
  name: string;
  phone: string;
  address: string;
}

class ProductApiService {
  async getAllProducts() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.LIST);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getProductById(id: string) {
    try {
      const response = await apiClient.get(
        `${API_ENDPOINTS.PRODUCTS.DETAIL}/${id}`
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async createProduct(productData: Partial<Product>) {
    try {
      const formData = this.convertToFormData(productData);
      const response = await apiClient.post(
        API_ENDPOINTS.PRODUCTS.CREATE,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateProduct(id: string, productData: Partial<Product>) {
    try {
      const formData = this.convertToFormData(productData);
      const response = await apiClient.post(
        `${API_ENDPOINTS.PRODUCTS.UPDATE}/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteProduct(id: string) {
    try {
      const response = await apiClient.delete(
        `${API_ENDPOINTS.PRODUCTS.DELETE}/${id}`
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async removeFromCart(productId: string) {
    try {
      const response = await apiClient.delete(
        `${API_ENDPOINTS.CART.REMOVE}/${productId}`
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async addToCart(productId: string) {
    try {
      const response = await apiClient.post(
        `${API_ENDPOINTS.CART.ADD}/${productId}`
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async decreaseCartItem(productId: string) {
    try {
      const response = await apiClient.post(
        `${API_ENDPOINTS.CART.DECREASE}/${productId}`
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getCart() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.CART.LIST);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async checkout(checkoutData: CheckoutData) {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.CART.CHECKOUT,
        checkoutData
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private convertToFormData(data: Record<string, any>): FormData {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });
    return formData;
  }

  private handleError(error: any): never {
    console.error("API Error:", error);
    throw error;
  }
}

export const productApi = new ProductApiService();
