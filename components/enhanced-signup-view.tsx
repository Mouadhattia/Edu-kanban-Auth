"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  School,
  BookOpen,
  Users,
  User,
  Building,
  CheckCircle,
} from "lucide-react";
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
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import { useOrganizationData } from "@/contexts/organization-data-context";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

type SignupStep =
  | "role-selection"
  | "account-details"
  | "organization-details"
  | "verification"
  | "complete";
type UserType = "school" | "curriculum-designer";
type SchoolRole = "school-admin" | "teacher" | "student";

export function EnhancedSignupView() {
  const { register, error, loading, googleLogin, resendEmail } =
    useOrganizationData();

  const [role, setRole] = useState<UserRole>("student");
  const [emailVerfication, setEmailVerification] = useState(true);
  const [currentStep, setCurrentStep] = useState<SignupStep>("role-selection");
  const [userType, setUserType] = useState<UserType | null>(null);
  const [schoolRole, setSchoolRole] = useState<SchoolRole>("school-admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [organizationWebsite, setOrganizationWebsite] = useState("");
  const [organizationType, setOrganizationType] = useState("");
  const [primarySubjectAreas, setPrimarySubjectAreas] = useState<string[]>([]);
  const [schoolName, setSchoolName] = useState("");
  const [schoolDistrict, setSchoolDistrict] = useState("");
  const [schoolType, setSchoolType] = useState("");
  const [joinExisting, setJoinExisting] = useState<boolean | null>(null);
  const [invitationCode, setInvitationCode] = useState("");
  const [token, setToken] = useState("");
  const router = useRouter();
  const handleChangeCheckbox = (value: string) => {
    setPrimarySubjectAreas((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };
  function disableGoogleLogin(role: string, code: string) {
    if (role === "school-admin" || role === "organization-admin") {
      return false;
    } else if (role && code) {
      return false;
    } else {
      return true;
    }
  }

  function generatePassword(
    length: number = 12,
    options: {
      uppercase?: boolean;
      lowercase?: boolean;
      numbers?: boolean;
      symbols?: boolean;
    } = { uppercase: true, lowercase: true, numbers: true, symbols: true }
  ): string {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const nums = "0123456789";
    const syms = "!@#$%^&*()-_=+[]{}|;:,.<>?";

    let chars = "";
    if (options.uppercase) chars += upper;
    if (options.lowercase) chars += lower;
    if (options.numbers) chars += nums;
    if (options.symbols) chars += syms;

    if (!chars) throw new Error("At least one character type must be selected");

    let password = "";
    for (let i = 0; i < length; i++) {
      const rand = Math.floor(Math.random() * chars.length);
      password += chars[rand];
    }

    return password;
  }

  const handleRoleSelect = (type: UserType) => {
    setUserType(type);
    setCurrentStep("account-details");
  };

  const handleSchoolRoleSelect = (role: SchoolRole) => {
    setSchoolRole(role);
    setRole(role);
    // Reset join existing when changing roles
    setJoinExisting(null);

    // If student is selected, automatically set joinExisting to true
    if (role === "student") {
      setJoinExisting(true);
    }
  };

  const handleJoinExistingToggle = (join: boolean) => {
    setJoinExisting(join);
  };

  const handleAccountDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password != confirmPassword) {
      return;
    }
    if (userType === "school" && !schoolRole) {
      // Show error - need to select a role
      return;
    }

    if (userType === "curriculum-designer" && joinExisting === null) {
      // Show error - need to select whether joining existing or creating new
      return;
    }

    if (
      userType === "school" &&
      schoolRole === "teacher" &&
      joinExisting === null
    ) {
      // Show error - teachers need to select whether joining existing or creating new
      return;
    }

    if (
      (joinExisting === true || schoolRole === "student") &&
      !invitationCode
    ) {
      // Show error - need invite code
      return;
    }

    if (
      joinExisting === false ||
      (userType === "school" && schoolRole === "school-admin")
    ) {
      setCurrentStep("organization-details");
    } else {
      setCurrentStep("verification");
    }
  };

  const handleOrganizationDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep("verification");
  };

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    register(
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
      invitationCode
    ).then(() => {
      setCurrentStep("complete");
    });
  };

  const handleCompleteSignup = async () => {
    // Set appropriate role cookie based on selections
    router.push("/login");
  };

  const handleDemoLogin = (role: UserRole) => {
    document.cookie = `user-role=${role}; path=/`;

    if (typeof window !== "undefined") {
      localStorage.setItem("user-role", role);
      localStorage.setItem("user-email", "demo@edukanban.com");

      if (role === "teacher") {
        localStorage.setItem("user-name", "Dr. Smith");
      } else if (role === "student") {
        localStorage.setItem("user-name", "Alex Johnson");
      } else if (role === "school-admin") {
        localStorage.setItem("user-name", "Admin User");
      } else if (role === "curriculum-designer") {
        localStorage.setItem("user-name", "Jane Cooper");
      } else if (role === "organization-admin") {
        localStorage.setItem("user-name", "Michael Johnson");
      }
    }

    if (role === "school-admin") {
      router.push("/admin/dashboard");
    } else if (role === "curriculum-designer") {
      router.push("/curriculum-designer/dashboard");
    } else {
      router.push("/dashboard");
    }
  };

  const handleSocialSignup = (
    provider: "google" | "linkedin",
    token: string | ""
  ) => {
    setEmailVerification(false);
    if (provider === "google") {
      const decodedToken = jwtDecode(token);
      setFullName(decodedToken.name);
      setEmail(decodedToken.email);
      setPassword(generatePassword(12));
      setToken(token);

      // Handle Google signup
      if (role === "school-admin") {
        setCurrentStep("organization-details");
      } else if (role === "organization-admin") {
        setCurrentStep("organization-details");
      } else {
        googleLogin(token, role, invitationCode).then(() => {
          setCurrentStep("complete");
        });
      }
    } else if (provider === "linkedin") {
      // Handle LinkedIn signup
      console.log("LinkedIn Token:", token);
    }
    setToken(token);
  };

  // Helper function to determine if LinkedIn should be available
  const canUseLinkedIn = (): boolean => {
    if (userType === "curriculum-designer") return true;
    if (
      userType === "school" &&
      (schoolRole === "school-admin" || schoolRole === "teacher")
    )
      return true;
    return false;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl font-bold">EduKanban</CardTitle>
            </div>
            {currentStep !== "role-selection" && (
              <Button
                variant="ghost"
                onClick={() => setCurrentStep("role-selection")}
                className="text-sm"
              >
                Start Over
              </Button>
            )}
          </div>
          <CardDescription>
            {currentStep === "role-selection" &&
              "Join our educational ecosystem"}
            {currentStep === "account-details" && "Create your account"}
            {currentStep === "organization-details" &&
              "Tell us about your organization"}
            {currentStep === "verification" && "Verify your information"}
            {currentStep === "complete" && "Your account is ready!"}
          </CardDescription>
        </CardHeader>

        {/* Step indicator */}
        {currentStep !== "role-selection" && currentStep !== "complete" && (
          <div className="px-6 mb-4">
            <div className="flex justify-between">
              <div
                className={`flex flex-col items-center ${
                  currentStep === "account-details"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep === "account-details"
                      ? "bg-primary text-primary-foreground"
                      : currentStep === "organization-details" ||
                        currentStep === "verification"
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  1
                </div>
                <span className="text-xs mt-1">Account</span>
              </div>
              <div className="flex-1 flex items-center">
                <div
                  className={`h-1 w-full ${
                    currentStep === "organization-details" ||
                    currentStep === "verification"
                      ? "bg-primary/50"
                      : "bg-muted"
                  }`}
                ></div>
              </div>
              <div
                className={`flex flex-col items-center ${
                  currentStep === "organization-details"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep === "organization-details"
                      ? "bg-primary text-primary-foreground"
                      : currentStep === "verification"
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  2
                </div>
                <span className="text-xs mt-1">Details</span>
              </div>
              <div className="flex-1 flex items-center">
                <div
                  className={`h-1 w-full ${
                    currentStep === "verification"
                      ? "bg-primary/50"
                      : "bg-muted"
                  }`}
                ></div>
              </div>
              <div
                className={`flex flex-col items-center ${
                  currentStep === "verification"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep === "verification"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  3
                </div>
                <span className="text-xs mt-1">Verify</span>
              </div>
            </div>
          </div>
        )}

        <CardContent>
          {/* Role Selection Step */}
          {currentStep === "role-selection" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-center">
                I am joining as a...
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <Card
                  className={`border-2 cursor-pointer transition-all hover:border-primary/70 hover:shadow-md ${
                    userType === "school" ? "border-primary" : "border-muted"
                  }`}
                  onClick={() => handleRoleSelect("school")}
                >
                  <CardContent className="p-8 flex flex-col items-center text-center space-y-3">
                    <School className="h-16 w-16 text-primary mb-2" />
                    <h3 className="font-medium text-lg">School</h3>
                    <p className="text-sm text-muted-foreground">
                      For administrators, teachers, and students
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className={`border-2 cursor-pointer transition-all hover:border-primary/70 hover:shadow-md ${
                    userType === "curriculum-designer"
                      ? "border-primary"
                      : "border-muted"
                  }`}
                  onClick={() => handleRoleSelect("curriculum-designer")}
                >
                  <CardContent className="p-8 flex flex-col items-center text-center space-y-3">
                    <BookOpen className="h-16 w-16 text-primary mb-2" />
                    <h3 className="font-medium text-lg">Curriculum Designer</h3>
                    <p className="text-sm text-muted-foreground">
                      Create and sell educational content
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="pt-6 border-t">
                <h3 className="text-sm font-medium text-center mb-4">
                  Or try a demo account
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin("teacher")}
                  >
                    Teacher Demo
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin("student")}
                  >
                    Student Demo
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin("school-admin")}
                  >
                    School Admin Demo
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin("curriculum-designer")}
                  >
                    Curriculum Designer
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin("organization-admin")}
                  >
                    Organization Admin
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Account Details Step */}
          {currentStep === "account-details" && (
            <form onSubmit={handleAccountDetailsSubmit} className="space-y-4">
              {userType === "school" && (
                <div className="space-y-4">
                  <div>
                    <Label>I am a...</Label>
                    <div className="grid grid-cols-3 gap-2 mt-1.5">
                      <Button
                        type="button"
                        variant={
                          schoolRole === "school-admin" ? "default" : "outline"
                        }
                        className="justify-start"
                        onClick={() => handleSchoolRoleSelect("school-admin")}
                      >
                        <Users className="mr-2 h-4 w-4" />
                        Administrator
                      </Button>
                      <Button
                        type="button"
                        variant={
                          schoolRole === "teacher" ? "default" : "outline"
                        }
                        className="justify-start"
                        onClick={() => handleSchoolRoleSelect("teacher")}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Teacher
                      </Button>
                      <Button
                        type="button"
                        variant={
                          schoolRole === "student" ? "default" : "outline"
                        }
                        className="justify-start"
                        onClick={() => handleSchoolRoleSelect("student")}
                      >
                        <BookOpen className="mr-2 h-4 w-4" />
                        Student
                      </Button>
                    </div>
                  </div>

                  {schoolRole === "teacher" && (
                    <div>
                      {/* <Label>I want to...</Label> */}
                      {/* <div className="grid grid-cols-2 gap-2 mt-1.5">
                        <Button
                          type="button"
                          variant={
                            joinExisting === false ? "default" : "outline"
                          }
                          className="justify-start"
                          onClick={() => handleJoinExistingToggle(false)}
                        >
                          <Building className="mr-2 h-4 w-4" />
                          Create a new school
                        </Button>
                        <Button
                          type="button"
                          variant={
                            joinExisting === true ? "default" : "outline"
                          }
                          className="justify-start"
                          onClick={() => handleJoinExistingToggle(true)}
                        >
                          <School className="mr-2 h-4 w-4" />
                          Join an existing school
                        </Button>
                      </div> */}
                      <p className="text-sm text-muted-foreground">
                        As a teacher, you need to join an existing school using
                        an invite code.
                      </p>
                    </div>
                  )}

                  {schoolRole === "student" && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        As a student, you need to join an existing school using
                        an invite code.
                      </p>
                    </div>
                  )}

                  {(schoolRole === "student" || schoolRole === "teacher") && (
                    <div className="space-y-2">
                      <Label htmlFor="invitationCode">School Invite Code</Label>
                      <Input
                        id="invitationCode"
                        placeholder="Enter your invite code"
                        value={invitationCode}
                        onChange={(e) => setInvitationCode(e.target.value)}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        You should have received an invite code from your school
                        administrator.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {userType === "curriculum-designer" && (
                <div className="space-y-4">
                  <div>
                    <Label>I want to...</Label>
                    <div className="grid grid-cols-2 gap-2 mt-1.5">
                      <Button
                        type="button"
                        variant={joinExisting === false ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => {
                          handleJoinExistingToggle(false);
                          setRole("organization-admin");
                        }}
                      >
                        <Building className="mr-2 h-4 w-4" />
                        Create a new organization
                      </Button>
                      <Button
                        type="button"
                        variant={joinExisting === true ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => {
                          handleJoinExistingToggle(true);
                          setRole("curriculum-designer");
                        }}
                      >
                        <Users className="mr-2 h-4 w-4" />
                        Join an existing organization
                      </Button>
                    </div>
                  </div>

                  {joinExisting === true && (
                    <div className="space-y-2">
                      <Label htmlFor="invitationCode">
                        Organization Invite Code
                      </Label>
                      <Input
                        id="invitationCode"
                        placeholder="Enter your invite code"
                        value={invitationCode}
                        onChange={(e) => setInvitationCode(e.target.value)}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        You should have received an invite code from your
                        organization administrator.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Social Login Options - Now contextual to the selected role */}
              {userType && (
                <div className="pt-4 pb-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or sign up with
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {disableGoogleLogin(role, invitationCode) ? (
                      <Button variant="outline" className="w-full" disabled>
                        <FcGoogle className="mr-2 h-4 w-4" />
                        Sign in with Google
                      </Button>
                    ) : (
                      <GoogleLogin
                        onSuccess={(credentialResponse) => {
                          const token = credentialResponse.credential;
                          if (token) {
                            handleSocialSignup("google", token);
                          }
                        }}
                        onError={() => {
                          console.error("Google login failed");
                        }}
                      />
                    )}
                    {/* Only show LinkedIn for appropriate roles */}
                    {canUseLinkedIn() ? (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleSocialSignup("linkedin", "aze")}
                      >
                        <FaLinkedin className="mr-2 h-4 w-4 text-[#0A66C2]" />
                        LinkedIn
                      </Button>
                    ) : (
                      <div className="flex items-center justify-center text-sm text-muted-foreground">
                        <FaLinkedin className="mr-2 h-4 w-4 text-muted-foreground" />
                        LinkedIn not available for students
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {password != confirmPassword && (
                  <span className="text-xs text-muted-foreground text-red-500">
                    Password doses not match
                  </span>
                )}
              </div>

              <Button type="submit" className="w-full">
                Continue
              </Button>
            </form>
          )}

          {/* Organization Details Step */}
          {currentStep === "organization-details" && (
            <form
              onSubmit={handleOrganizationDetailsSubmit}
              className="space-y-4"
            >
              {userType === "school" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="schoolName">School Name</Label>
                    <Input
                      id="schoolName"
                      placeholder="Enter your school name"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="schoolDistrict">School District</Label>
                    <Input
                      id="schoolDistrict"
                      placeholder="Enter your school district"
                      value={schoolDistrict}
                      onChange={(e) => setSchoolDistrict(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="schoolType">School Type</Label>
                    <Select onValueChange={(value) => setSchoolType(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select school type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="elementary">
                          Elementary School
                        </SelectItem>
                        <SelectItem value="middle">Middle School</SelectItem>
                        <SelectItem value="high">High School</SelectItem>
                        <SelectItem value="k12">K-12</SelectItem>
                        <SelectItem value="charter">Charter School</SelectItem>
                        <SelectItem value="private">Private School</SelectItem>
                        <SelectItem value="college">
                          College/University
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {userType === "curriculum-designer" && joinExisting === false && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="organizationName">Organization Name</Label>
                    <Input
                      id="organizationName"
                      placeholder="Enter your organization name"
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organizationWebsite">
                      Organization Website
                    </Label>
                    <Input
                      id="organizationWebsite"
                      placeholder="https://www.example.com"
                      value={organizationWebsite}
                      onChange={(e) => setOrganizationWebsite(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organizationType">Organization Type</Label>
                    <Select
                      onValueChange={(value) => setOrganizationType(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select organization type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="publisher">
                          Educational Publisher
                        </SelectItem>
                        <SelectItem value="content-provider">
                          Content Provider
                        </SelectItem>
                        <SelectItem value="edtech">EdTech Company</SelectItem>
                        <SelectItem value="nonprofit">
                          Non-Profit Organization
                        </SelectItem>
                        <SelectItem value="individual">
                          Individual/Freelancer
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Primary Subject Areas</Label>
                    <div className="grid grid-cols-2 gap-2 mt-1.5">
                      <Button
                        type="button"
                        variant="outline"
                        className="justify-start"
                      >
                        <input
                          type="checkbox"
                          className="mr-2"
                          value="mathematics"
                          onChange={(e) => handleChangeCheckbox(e.target.value)}
                          checked={primarySubjectAreas.includes("mathematics")}
                        />
                        Mathematics
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="justify-start"
                      >
                        <input
                          type="checkbox"
                          className="mr-2"
                          value="science"
                          onChange={(e) => handleChangeCheckbox(e.target.value)}
                          checked={primarySubjectAreas.includes("science")}
                        />
                        Science
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="justify-start"
                      >
                        <input
                          type="checkbox"
                          className="mr-2"
                          value="language-arts"
                          onChange={(e) => handleChangeCheckbox(e.target.value)}
                          checked={primarySubjectAreas.includes(
                            "language-arts"
                          )}
                        />
                        Language Arts
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="justify-start"
                      >
                        <input
                          type="checkbox"
                          className="mr-2"
                          value="social-studies"
                          onChange={(e) => handleChangeCheckbox(e.target.value)}
                          checked={primarySubjectAreas.includes(
                            "social-studies"
                          )}
                        />
                        Social Studies
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="justify-start"
                      >
                        <input
                          type="checkbox"
                          className="mr-2"
                          value="arts-music"
                          onChange={(e) => handleChangeCheckbox(e.target.value)}
                          checked={primarySubjectAreas.includes("arts-music")}
                        />
                        Arts & Music
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="justify-start"
                      >
                        <input
                          type="checkbox"
                          className="mr-2"
                          value="physical-education"
                          onChange={(e) => handleChangeCheckbox(e.target.value)}
                          checked={primarySubjectAreas.includes(
                            "physical-education"
                          )}
                        />
                        Physical Education
                      </Button>
                    </div>
                  </div>
                </>
              )}

              <Button type="submit" className="w-full">
                Continue
              </Button>
            </form>
          )}

          {/* Verification Step */}
          {currentStep === "verification" && (
            <form onSubmit={handleVerificationSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Review Your Information</h3>

                <div className="rounded-lg border p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Account Type</span>
                    <span className="text-sm">
                      {userType === "school" && "School"}
                      {userType === "curriculum-designer" &&
                        "Curriculum Designer"}
                      {userType === "school" &&
                        schoolRole &&
                        ` (${schoolRole})`}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Name</span>
                    <span className="text-sm">{name}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Email</span>
                    <span className="text-sm">{email}</span>
                  </div>

                  {(joinExisting === true || schoolRole === "student") && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Joining</span>
                      <span className="text-sm">
                        {userType === "school"
                          ? "Existing school"
                          : "Existing organization"}{" "}
                        via invite
                      </span>
                    </div>
                  )}

                  {joinExisting === false && organizationName && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Organization</span>
                      <span className="text-sm">{organizationName}</span>
                    </div>
                  )}

                  {schoolName && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">School</span>
                      <span className="text-sm">{schoolName}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="terms"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      required
                    />
                    <label
                      htmlFor="terms"
                      className="ml-2 block text-sm text-muted-foreground"
                    >
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-primary hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-primary hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  {userType === "school" && schoolRole === "school-admin" && (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="authority"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        required
                      />
                      <label
                        htmlFor="authority"
                        className="ml-2 block text-sm text-muted-foreground"
                      >
                        I confirm that I have the authority to register this
                        school
                      </label>
                    </div>
                  )}

                  {userType === "curriculum-designer" &&
                    joinExisting === false && (
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="authority"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          required
                        />
                        <label
                          htmlFor="authority"
                          className="ml-2 block text-sm text-muted-foreground"
                        >
                          I confirm that I have the authority to register this
                          organization
                        </label>
                      </div>
                    )}
                </div>
              </div>

              <Button type="submit" className="w-full">
                {loading ? "Creating Account..." : "Complete Registration"}
              </Button>
            </form>
          )}

          {/* Complete Step */}
          {currentStep === "complete" && (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <CheckCircle className="h-12 w-12 text-primary" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-medium">
                  Account Created Successfully!
                </h3>
                <p className="text-muted-foreground">
                  {userType === "school" &&
                    "Your school account has been created."}
                  {userType === "curriculum-designer" &&
                    "Your curriculum designer account has been created."}
                </p>
                {emailVerfication && (
                  <p>A verification link has been sent to {email}</p>
                )}
              </div>

              <Button onClick={handleCompleteSignup} className="w-full">
                Go to Login
              </Button>
              {emailVerfication && (
                <Button
                  onClick={() => resendEmail(email)}
                  className="w-full"
                  disabled={loading}
                >
                  Resend
                </Button>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pt-0">
          {currentStep === "role-selection" && (
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Log in
              </Link>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
