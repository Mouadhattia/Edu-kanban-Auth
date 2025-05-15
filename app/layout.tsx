import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";
import { OrganizationDataProvider } from "@/contexts/organization-data-context";
import { GoogleOAuthProvider } from "@react-oauth/google";
export const metadata: Metadata = {
  title: "Kanban Board for Teachers",
  description:
    "A kanban board application for teachers to manage tasks and assignments",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <OrganizationDataProvider>
            <GoogleOAuthProvider
              clientId={
                process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
                "783526417448-f9oiqgg8dmr68vn242vhdgglqtb2c39k.apps.googleusercontent.com"
              }
            >
              {children}
            </GoogleOAuthProvider>
          </OrganizationDataProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
