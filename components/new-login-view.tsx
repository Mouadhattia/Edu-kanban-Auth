"use client";

import type React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UserRole } from "@/lib/types";
import { FaLinkedin } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { useOrganizationData } from "@/contexts/organization-data-context";

export function NewLoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("teacher");
  const router = useRouter();
  const { error, loading, googleLogin, login } = useOrganizationData();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginWithRole(role, email || "demo@edukanban.com");
  };

  const loginWithRole = (selectedRole: UserRole, userEmail: string) => {
    // In a real app, you would authenticate the user here
    // For demo purposes, we'll just set a cookie and redirect
    document.cookie = `user-role=${selectedRole}; path=/`;

    // Also store in localStorage for components that need this info
    if (typeof window !== "undefined") {
      localStorage.setItem("user-role", selectedRole);
      localStorage.setItem("user-email", userEmail);

      // Set a default name based on role
      if (selectedRole === "teacher") {
        localStorage.setItem("user-name", "Dr. Smith");
      } else if (selectedRole === "student") {
        localStorage.setItem("user-name", "Alex Johnson");
      } else if (selectedRole === "admin") {
        localStorage.setItem("user-name", "Admin User");
      } else if (selectedRole === "curriculum-designer") {
        localStorage.setItem("user-name", "Jane Cooper");
      } else if (selectedRole === "org-admin") {
        localStorage.setItem("user-name", "Michael Johnson");
      } else if (selectedRole === "super-admin") {
        localStorage.setItem("user-name", "Super Admin");
      }
    }

    console.log("Logging in as:", selectedRole);

    // Redirect to the appropriate dashboard based on role
    if (selectedRole === "super-admin") {
      router.push("/super-admin");
    } else if (selectedRole === "admin") {
      router.push("/admin/dashboard"); // Redirect admin to the admin dashboard with sidebar
    } else if (selectedRole === "org-admin") {
      router.push("/organization/dashboard"); // Ensure org-admin goes to the organization dashboard
    } else if (selectedRole === "student") {
      router.push("/student/dashboard");
    } else if (selectedRole === "curriculum-designer") {
      router.push("/curriculum-designer/dashboard");
    } else {
      router.push("/dashboard");
    }
  };

  const handleQuickDemo = () => {
    // Pre-fill credentials for quick demo
    setEmail("demo@edukanban.com");
    setPassword("demo123");
    loginWithRole(role, "demo@edukanban.com");
  };

  const handleSocialLogin = (
    provider: "google" | "linkedin",
    token: string
  ) => {
    // For LinkedIn, we'll restrict to professional roles
    if (provider === "google") {
      googleLogin(token)
        .then(() => {
          router.push("/dashboard");
        })
        .catch(() => {
          console.error("Google login failed", error);
        });
    } else if (provider === "linkedin") {
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">EduKanban</CardTitle>
          <CardDescription>
            Enter your credentials or use Demo Mode
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email (optional for Demo)</Label>
              <Input
                id="email"
                type="email"
                placeholder="demo@edukanban.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password (optional for Demo)</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Social Login Options */}
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {/* <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSocialLogin("google")}
                >
                  <FcGoogle className="mr-2 h-4 w-4" />
                  Google
                </Button> */}
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    const token = credentialResponse.credential;
                    if (token) {
                      handleSocialLogin("google", token);
                    }
                  }}
                  onError={() => {
                    console.error("Google login failed");
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSocialLogin("linkedin", "a")}
                >
                  <FaLinkedin className="mr-2 h-4 w-4 text-[#0A66C2]" />
                  LinkedIn
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                LinkedIn is available for teachers, administrators, and
                curriculum designers
              </p>
            </div>

            {/* Demo Mode role selector */}
            <div className="space-y-2 pt-2 border-t">
              <Label htmlFor="role">Demo Mode: Select Role</Label>
              <Select
                value={role}
                onValueChange={(value) => setRole(value as UserRole)}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="admin">School Admin</SelectItem>
                  <SelectItem value="curriculum-designer">
                    Curriculum Designer
                  </SelectItem>
                  <SelectItem value="org-admin">Organization Admin</SelectItem>
                  <SelectItem value="super-admin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                className="w-full mt-2"
                onClick={handleQuickDemo}
              >
                Quick Demo Login
              </Button>
              <p className="text-xs text-muted-foreground">
                Click "Quick Demo Login" to instantly access the selected role's
                dashboard.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </CardFooter>
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign Up
            </Link>
          </div>
          <div className="text-center text-sm mb-4">
            <Link
              href="/forgot-password"
              className="text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
