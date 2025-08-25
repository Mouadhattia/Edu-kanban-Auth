import type { User } from "@/lib/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `API request failed: ${response.status}`);
  }

  return response.json();
}

// Auth APIs

type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;
  schoolName: string;
  schoolDistrict: string;
  schoolType: string;
  role: string;
  organizationName: string;
  organizationType: string;
  organizationWebsite: string;
  primarySubjectAreas: string[];
  invitationCode?: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type GoogleLoginPayload = {
  token: string;
  role?: string;
  invitationCode?: string;
};

export async function register(payload: RegisterPayload): Promise<User> {
  return apiRequest<User>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function login(
  payload: LoginPayload
): Promise<{ user: User; token: string; message: string }> {
  return apiRequest<{ user: User; token: string; message: string }>(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
}

export async function googleLogin(payload: GoogleLoginPayload): Promise<User> {
  return apiRequest<User>("/auth/google/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getProfile(token: string): Promise<User> {
  return apiRequest<User>("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
// email Verification
export async function VerifyEmail(token?: string): Promise<any> {
  return apiRequest<User>(`/auth/verify-email/${token}`, {
    method: "GET",
  });
}

export async function resndEmail(email?: string): Promise<any> {
  return apiRequest<User>(`/auth/resend-verification/`, {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}
