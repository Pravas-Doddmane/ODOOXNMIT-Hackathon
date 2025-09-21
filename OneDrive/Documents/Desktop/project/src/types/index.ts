export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  enabled: boolean;
  otp?: string;
  otpGeneratedTime?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface OTPRequest {
  email: string;
  otp: string;
  newPassword: string;
}

export interface BillOfMaterials {
  id?: number;
  productName: string;
  description: string;
}

export interface ManufacturingOrder {
  id?: number;
  productName: string;
  quantity: number;
  status: string;
  startDate: string;
  deadline: string;
  assignee?: User;
  bom?: BillOfMaterials;
}

export interface WorkCenter {
  id?: number;
  name: string;
  description: string;
  costPerHour: number;
  active: boolean;
}

export interface WorkOrder {
  id?: number;
  name: string;
  description: string;
  status: string;
  duration: number;
  manufacturingOrder?: ManufacturingOrder;
  workCenter?: WorkCenter;
  operator?: User;
  startTime?: string;
  endTime?: string;
}

export interface StockMovement {
  id?: number;
  productName: string;
  movementType: string;
  quantity: number;
  date: string;
  reference?: string;
}