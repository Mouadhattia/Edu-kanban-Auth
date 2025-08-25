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
  const { error, loading, googleLogin, login, user } = useOrganizationData();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password)
      .then(() => {
        console.log(user);
        if (user) {
          // Redirect based on role
          if (user.role === "superAdmin") {
            router.push("/super-admin");
          } else if (user.role === "school-admin") {
            router.push("/school/admin/dashboard");
          } else if (user.role === "organization-admin") {
            router.push("/organization/dashboard");
          } else if (user.role === "student") {
            router.push("/student/dashboard");
          } else if (user.role === "curriculum-designer") {
            router.push("/curriculum-designer/dashboard");
          } else if (user.role === "teacher") {
            router.push("/dashboard");
          }
        }
      })
      .catch(() => {
        console.error("Login failed", error);
      });
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
            {/* <div className="space-y-2 pt-2 border-t">
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
            </div> */}
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
