export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8081/webbanhang";

export const API_ENDPOINTS = {
  PRODUCTS: {
    LIST: `${API_BASE_URL}/api/product`,
    DETAIL: `${API_BASE_URL}/api/product`,
    CREATE: `${API_BASE_URL}/api/product`,
    UPDATE: `${API_BASE_URL}/api/product`,
    DELETE: `${API_BASE_URL}/api/product`,
  },
  CART: {
    LIST: `${API_BASE_URL}/ProductApi/cart`,
    ADD: `${API_BASE_URL}/ProductApi/addtocart`,
    DECREASE: `${API_BASE_URL}/ProductApi/decrease`,
    INCREASE: `${API_BASE_URL}/ProductApi/increase`,
    CHECKOUT: `${API_BASE_URL}/ProductApi/processcheckout`,
    REMOVE: `${API_BASE_URL}/ProductApi/removeFromCart`,
  },
  CATEGORIES: {
    LIST: `${API_BASE_URL}/CategoryApi`,
    CREATE: `${API_BASE_URL}/CategoryApi/store`,
    UPDATE: `${API_BASE_URL}/CategoryApi/update`,
    DELETE: `${API_BASE_URL}/CategoryApi/delete`,
  },

  AUTH: {
    LOGIN: `${API_BASE_URL}/AccountApi/Login`,
    REGISTER: `${API_BASE_URL}/AccountApi/Register`,
  },
  USERS: {
    LIST: `${API_BASE_URL}/api/Account/getAllAccounts`, // Endpoint để lấy tất cả người dùng
  },
} as const;

export const generateDynamicEndpoint = (baseEndpoint: string, id?: string) => {
  return id ? `${baseEndpoint}/${id}` : baseEndpoint;
};
