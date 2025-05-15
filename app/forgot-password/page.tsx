import { EnhancedSignupView } from "@/components/enhanced-signup-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset password | EduKanban",
  description:
    "Rest your password by sending a reset link to your email. Follow the instructions in the email to create a new password.",
};

export default function RestPasswordPage() {
  return <EnhancedSignupView />;
}
