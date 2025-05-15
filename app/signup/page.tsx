import { EnhancedSignupView } from "@/components/enhanced-signup-view"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign Up | EduKanban",
  description: "Create your EduKanban account and start transforming your educational experience today.",
}

export default function SignupPage() {
  return <EnhancedSignupView />
}
