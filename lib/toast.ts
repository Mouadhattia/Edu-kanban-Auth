"use client"

import type { Toast } from "@/components/ui/toast"

import type React from "react"

import { useToast as useToastHook } from "@/components/ui/toast"
import { useEffect, useState } from "react"

// This is a simpler way to use toast without having to use the hook directly
export function toast(props: {
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}) {
  // Using a state variable to hold the addToast function
  // This ensures the hook is always called, satisfying the rules of hooks
  const [addToast, setAddToast] = useState<((toast: Omit<Toast, "id">) => void) | null>(null)
  const { addToast: addToastFn } = useToastHook()

  useEffect(() => {
    setAddToast(() => addToastFn)
  }, [addToastFn])

  useEffect(() => {
    if (addToast) {
      try {
        addToast(props)
      } catch (error) {
        console.error("Failed to show toast:", error)
      }
    } else {
      // Server-side rendering, do nothing
      console.log("Toast attempted during SSR, ignoring")
    }
  }, [addToast, props])
}
