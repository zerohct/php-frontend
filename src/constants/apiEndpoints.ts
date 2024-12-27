// src/constants/apiConfig.ts
export const API_BASE_URL = "http://localhost/lab_1/api";

export const API_ENDPOINTS = {
  PRODUCT: {
    CREATE: `${API_BASE_URL}/`,
    GET_ALL: `${API_BASE_URL}/`,
    GET_ID: `${API_BASE_URL}/`,
    UPDATE: `${API_BASE_URL}/`,
    DELETE: `${API_BASE_URL}/`,
  },
} as const;

export const generateDynamicEndpoint = (baseEndpoint: string, id?: string) => {
  return id ? `${baseEndpoint}?id=${id}` : baseEndpoint;
};
