export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost/webbanhang";

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
  AUTH: {
    LOGIN: `${API_BASE_URL}/AccountApi/Login`,
    REGISTER: `${API_BASE_URL}/AccountApi/Register`,
  },
} as const;

export const generateDynamicEndpoint = (baseEndpoint: string, id?: string) => {
  return id ? `${baseEndpoint}/${id}` : baseEndpoint;
};
