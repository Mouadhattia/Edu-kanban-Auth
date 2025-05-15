import { NewLoginView } from "@/components/new-login-view"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Log In | EduKanban",
  description: "Log in to your EduKanban account to access your dashboard, curriculum, and more.",
}

export default function LoginPage() {
  return <NewLoginView />
}
