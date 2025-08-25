"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "@/lib/types";
import {
  login as loginAPI,
  register as registerAPI,
  googleLogin as googleLoginAPI,
  VerifyEmail as verifyEmailAPI,
  resndEmail as resendEmailAPI,
} from "@/lib/api-service";
import { useToast } from "@/components/ui/toast";

interface OrganizationDataContextType {
  loading: boolean;
  error: Error | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    fullName: string,
    email: string,
    password: string,
    schoolName: string,
    schoolDistrict: string,
    schoolType: string,
    role: string,
    organizationName: string,
    organizationType: string,
    organizationWebsite: string,
    primarySubjectAreas: string[],
    invitationCode?: string
  ) => Promise<void>;
  googleLogin: (
    token: string,
    role?: string,
    invitationCode?: string
  ) => Promise<void>;
  verifyEmail: (token?: string) => Promise<Boolean>;
  resendEmail: (email?: string) => Promise<any>;
  logout: () => void;
}

const OrganizationDataContext = createContext<
  OrganizationDataContextType | undefined
>(undefined);

export function OrganizationDataProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const { addToast } = useToast();
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const res = await loginAPI({ email, password });
      localStorage.setItem("token", res.token);
      setUser(res.user);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    fullName: string,
    email: string,
    password: string,
    schoolName: string,
    schoolDistrict: string,
    schoolType: string,
    role: string,
    organizationName: string,
    organizationType: string,
    organizationWebsite: string,
    primarySubjectAreas: string[],
    invitationCode?: string
  ) => {
    try {
      console.log("email", email);
      setLoading(true);
      const user = await registerAPI({
        fullName,
        email,
        password,
        schoolName,
        schoolDistrict,
        schoolType,
        role,
        organizationName,
        organizationType,
        organizationWebsite,
        primarySubjectAreas,
        invitationCode,
      });
      setUser(user);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async (
    token: string,
    role?: string,
    invitationCode?: string
  ) => {
    try {
      setLoading(true);
      const user = await googleLoginAPI({ token, role, invitationCode });
      console.log(user);
      localStorage.setItem("token", user.token);
      setUser(user);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  const verifyEmail = async (token?: string) => {
    try {
      setLoading(true);
      const response = await verifyEmailAPI(token);
      if (response) {
        setLoading(false);
        return true;
      } else {
        setLoading(false);
        return false;
      }
    } catch (err) {
      setError(err as Error);
      return false;
    } finally {
      setLoading(false);
    }
  };
  const resendEmail = async (email?: string) => {
    try {
      setLoading(true);
      await resendEmailAPI(email);
      addToast({
        title: "Email Sent",
        description: "Please check your email for the verification link.",
        variant: "default",
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrganizationDataContext.Provider
      value={{
        loading,
        error,
        user,
        login,
        register,
        logout,
        googleLogin,
        verifyEmail,
        resendEmail,
      }}
    >
      {children}
    </OrganizationDataContext.Provider>
  );
}

export function useOrganizationData() {
  const context = useContext(OrganizationDataContext);
  if (context === undefined) {
    throw new Error(
      "useOrganizationData must be used within an OrganizationDataProvider"
    );
  }
  return context;
}
