export type UserRole = 'citizen' | 'government' | 'ngo' | 'researcher' | 'admin';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  role: UserRole;
  district?: string;
  state?: string;
  pincode?: string;
  createdAt: string;
  updatedAt: string;
}

export type ServiceCategory = 'water' | 'electricity' | 'healthcare' | 'transport' | 'ration';

export type ReportStatus = 'pending' | 'verified' | 'rejected';

export interface PublicReport {
  reportId: string;
  userId: string;
  userEmail?: string;
  category: ServiceCategory;
  title: string;
  description: string;
  locationName: string;
  latitude: number;
  longitude: number;
  images?: string[];
  status: ReportStatus;
  confidenceScore: number;
  upvotes: number;
  downvotes: number;
  createdAt: string;
}

export interface ServiceStatus {
  serviceId: string;
  district: string;
  state: string;
  serviceType: ServiceCategory;
  officialStatus: string;
  actualStatus: string;
  confidenceScore: number;
  sourceCount: number;
  predictedStatus: string;
  lastUpdated: string;
}

export interface CitizenSignal {
  signalId: string;
  userId: string;
  locationName: string;
  serviceType: ServiceCategory;
  signalStrength: number; // 1 to 5
  description: string;
  timestamp: string;
}

export interface AIVerification {
  verificationId: string;
  relatedReportId: string;
  sourcesUsed: string[];
  conflictDetected: boolean;
  confidenceScore: number;
  reasoning: string;
  recommendedStatus: string;
  timestamp: string;
}

export interface AreaHealth {
  areaId: string;
  district: string;
  state: string;
  electricityReliability: number; // 0 to 100
  waterReliability: number;      // 0 to 100
  healthcareReliability: number;  // 0 to 100
  transportReliability: number;   // 0 to 100
  rationReliability: number;      // 0 to 100
  overallScore: number;           // 0 to 100
  updatedAt: string;
}

export interface DisruptionPrediction {
  predictionId: string;
  district: string;
  serviceType: ServiceCategory;
  predictedIssue: string;
  probability: number; // 0 to 100
  impactLevel: 'minor' | 'moderate' | 'severe' | 'critical';
  recommendedAction: string;
  generatedAt: string;
}
