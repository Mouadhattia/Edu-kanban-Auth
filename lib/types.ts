export type UserRole =
  | "teacher"
  | "student"
  | "school-admin"
  | "curriculum-designer"
  | "organization-admin"
  | "superAdmin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  fullName?: string;
  expertise?: string[];
  organizationIds?: string[]; // Organizations the user belongs to
  defaultOrganizationId?: string; // The organization shown by default
  status?: "active" | "pending" | "suspended" | "deleted";
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  active?: boolean; // Indicates if the user is active or not
  schoolId?: string[];
  token?: string; // JWT token for authentication
}
