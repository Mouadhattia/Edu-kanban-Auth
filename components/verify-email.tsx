"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MailCheck, XCircle } from "lucide-react";
import { useOrganizationData } from "@/contexts/organization-data-context";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";

export default function VerifyEmail() {
  const router = useRouter();
  const { token } = useParams();
  const { error, loading, verifyEmail, resendEmail } = useOrganizationData();
  const [isValid, setIsValid] = useState(false); // Set to false to show invalid/expired state
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (token) {
      verifyEmail(token)
        .then((isValid) => {
          if (isValid) {
            setIsValid(true);
            setTimeout(() => {
              router.push("/login");
            }, 2000);
          } else {
            setIsValid(false);
          }
        })
        .catch((error) => {
          console.error("Error verifying email:", error);
          setIsValid(false);
        });
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {isValid ? (
              <>
                <MailCheck className="h-5 w-5 text-green-600" />
                Email Verification
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-red-600" />
                Link Invalid
              </>
            )}
          </CardTitle>
          <CardDescription>
            {isValid
              ? "Your email has been verified successfully!"
              : "The verification link is invalid or has expired."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            {isValid ? (
              <>
                <div className="rounded-full bg-green-100 p-3">
                  <svg
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-center text-sm text-gray-600">
                  You can now sign in to your account
                </p>
              </>
            ) : (
              <p className="text-center text-sm text-red-600">
                Please request a new verification link.
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-center">
          {isValid ? (
            <Button onClick={() => router.push("/login")}>Go to Login</Button>
          ) : (
            <div className=" flex flex-col items-center space-y-2">
              <Input
                id="verification-email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-2  w-64"
                required
              />
              <Button disabled={loading} onClick={() => resendEmail(email)}>
                Resend Link
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
