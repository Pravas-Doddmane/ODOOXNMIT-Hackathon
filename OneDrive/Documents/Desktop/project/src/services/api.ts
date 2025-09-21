import axios from 'axios';
import { ApiResponse, LoginRequest, RegisterRequest, OTPRequest } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  // Auth endpoints
  login: (data: LoginRequest) => api.post<ApiResponse>('/auth/login', data),
  register: (data: RegisterRequest) => api.post<ApiResponse>('/auth/register', data),
  forgotPassword: (email: string) => api.post<ApiResponse>(`/auth/forgot-password?email=${email}`),
  resetPassword: (data: OTPRequest) => api.post<ApiResponse>('/auth/reset-password', data),

  // User endpoints
  getUsers: () => api.get('/users'),
  getUserById: (id: number) => api.get(`/users/${id}`),
  updateUser: (id: number, data: any) => api.put(`/users/${id}`, data),
  deleteUser: (id: number) => api.delete(`/users/${id}`),

  // BOM endpoints
  getBOMs: () => api.get('/boms'),
  getBOMById: (id: number) => api.get(`/boms/${id}`),
  createBOM: (data: any) => api.post('/boms', data),
  updateBOM: (id: number, data: any) => api.put(`/boms/${id}`, data),
  deleteBOM: (id: number) => api.delete(`/boms/${id}`),

  // Manufacturing Order endpoints
  getManufacturingOrders: () => api.get('/manufacturing-orders'),
  getManufacturingOrderById: (id: number) => api.get(`/manufacturing-orders/${id}`),
  createManufacturingOrder: (data: any) => api.post('/manufacturing-orders', data),
  updateManufacturingOrder: (id: number, data: any) => api.put(`/manufacturing-orders/${id}`, data),
  deleteManufacturingOrder: (id: number) => api.delete(`/manufacturing-orders/${id}`),
  getManufacturingOrdersByStatus: (status: string) => api.get(`/manufacturing-orders/status/${status}`),
  getManufacturingOrdersByAssignee: (assigneeId: number) => api.get(`/manufacturing-orders/assignee/${assigneeId}`),

  // Work Center endpoints
  getWorkCenters: () => api.get('/work-centers'),
  getWorkCenterById: (id: number) => api.get(`/work-centers/${id}`),
  createWorkCenter: (data: any) => api.post('/work-centers', data),
  updateWorkCenter: (id: number, data: any) => api.put(`/work-centers/${id}`, data),
  deleteWorkCenter: (id: number) => api.delete(`/work-centers/${id}`),

  // Work Order endpoints
  getWorkOrders: () => api.get('/work-orders'),
  getWorkOrderById: (id: number) => api.get(`/work-orders/${id}`),
  createWorkOrder: (data: any) => api.post('/work-orders', data),
  updateWorkOrder: (id: number, data: any) => api.put(`/work-orders/${id}`, data),
  deleteWorkOrder: (id: number) => api.delete(`/work-orders/${id}`),
  getWorkOrdersByManufacturingOrder: (moId: number) => api.get(`/work-orders/manufacturing-order/${moId}`),
  getWorkOrdersByOperator: (operatorId: number) => api.get(`/work-orders/operator/${operatorId}`),
  getWorkOrdersByStatus: (status: string) => api.get(`/work-orders/status/${status}`),
  startWorkOrder: (id: number) => api.post(`/work-orders/${id}/start`),
  completeWorkOrder: (id: number) => api.post(`/work-orders/${id}/complete`),

  // Stock endpoints
  getStockMovements: () => api.get('/stock/movements'),
  getStockMovementById: (id: number) => api.get(`/stock/movements/${id}`),
  createStockMovement: (data: any) => api.post('/stock/movements', data),
  getStockMovementsByProduct: (productName: string) => api.get(`/stock/movements/product/${productName}`),
  getStockMovementsByType: (movementType: string) => api.get(`/stock/movements/type/${movementType}`),
  getCurrentStock: (productName: string) => api.get(`/stock/current/${productName}`),
};