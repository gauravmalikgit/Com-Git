import { Request } from 'express';
import { User } from '@prisma/client';

// Extend Express Request type to include user
export interface AuthenticatedRequest extends Request {
  user?: User;
}

// User related types
export interface CreateUserRequest {
  email: string;
  password: string;
  name?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

// Campaign related types
export interface CreateCampaignRequest {
  name: string;
  description?: string;
  brand?: string;
  category?: string;
  offer?: string;
}

// Notification related types
export interface CreateNotificationRequest {
  title: string;
  description: string;
  product?: string;
  brand?: string;
  category?: string;
  offer?: string;
  discountedPrice?: number;
  mrp?: number;
  emotion?: string;
  urgency?: string;
  tone?: string;
  ctr?: number;
  revenue?: number;
  sent?: number;
  clicks?: number;
  conversions?: number;
  campaignId?: string;
}

// AI Generation related types
export interface GeneratePNRequest {
  product: string;
  offer: string;
  discountedPrice?: number;
  mrp?: number;
  brand?: string;
  category?: string;
  emotion?: string;
  urgency?: string;
  tone?: string;
}

export interface GeneratedPN {
  title: string;
  description: string;
  estimatedCTR: number;
  confidence: number;
  reasoning: string;
}

export interface GeneratePNResponse {
  generated: GeneratedPN[];
  suggestions: string[];
}

// File upload types
export interface FileUploadRequest {
  campaignId?: string;
  campaignName?: string;
}

export interface ProcessedFileData {
  totalRows: number;
  validRows: number;
  invalidRows: number;
  notifications: CreateNotificationRequest[];
  analytics: {
    topWords: string[];
    topEmojis: string[];
    avgCTR: number;
    avgRevenue: number;
  };
}

// Analytics types
export interface AnalyticsFilters {
  startDate?: Date;
  endDate?: Date;
  campaignId?: string;
  category?: string;
  brand?: string;
}

export interface AnalyticsResponse {
  totalCampaigns: number;
  totalNotifications: number;
  avgCTR: number;
  totalRevenue: number;
  topPerformingWords: string[];
  topPerformingEmojis: string[];
  performanceByCategory: Record<string, number>;
  performanceByBrand: Record<string, number>;
  recentTrends: {
    date: string;
    ctr: number;
    revenue: number;
  }[];
}

// API Response types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = any> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Validation error types
export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}