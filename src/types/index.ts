// src/types/auth.ts

// =======================
// Generic API Response
// =======================
export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T | null;
}

// =======================
// User Types
// =======================
export type UserRole = "USER" | "AGENT" | "ADMIN";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  identifier: "NID" | "BIRTH_CERTIFICATE";
  identifier_image?: string;
  profile_picture?: string;
  status?: "pending" | "active" | "suspended"; // useful for agents
  createdAt: string;
  updatedAt: string;
}

// =======================
// Login
// =======================
export interface ILoginUser {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

// =======================
// Register
// =======================
export interface IRegisterUser {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "USER" | "AGENT";
  identifier: "NID" | "BIRTH_CERTIFICATE";
  identifier_image: File; // KYC image
  profile_picture?: File; // optional
}

// =======================
// Refresh Token
// =======================
export interface IRefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

// =======================
// Forgot / Reset Password
// =======================
export interface IForgotPassword {
  email: string;
}

export interface IResetPassword {
  token: string; // received from email
  newPassword: string;
}

// =======================
// OTP (Optional if needed)
// =======================
export interface ISendOtp {
  phone: string;
}

export interface IVerifyOtp {
  phone: string;
  otp: string;
}

export type TRole = "ADMIN" | "AGENT" | "USER";

// src/types/api.ts

// Generic API response wrapper
export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

// src/types/stats.ts

export interface UserStats {
  balance: number;
  totalReceived: number;
  totalSent: number;
  totalTransactions: number;
  userId: string;
}
