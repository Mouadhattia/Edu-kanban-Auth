import VerifyEmail from "@/components/verify-email";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email | EduKanban",
  description: "Verfiy Your Account.",
};

export default function VerifyEmailPage() {
  return <VerifyEmail />;
}
