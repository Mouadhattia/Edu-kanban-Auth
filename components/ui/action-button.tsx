"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface ActionButtonProps extends React.ComponentProps<typeof Button> {
  action?: "navigate" | "function"
  path?: string
  onAction?: () => void
}

export function ActionButton({ children, action = "function", path, onAction, ...props }: ActionButtonProps) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      props.onClick(e)
      return
    }

    if (action === "navigate" && path) {
      e.preventDefault()
      router.push(path)
    } else if (action === "function" && onAction) {
      e.preventDefault()
      onAction()
    }
  }

  // If this is a navigation button but rendered inside a dropdown or other component
  // that needs an <a> tag, we can use the asChild prop
  if (action === "navigate" && path && props.asChild) {
    return (
      <Button {...props} onClick={handleClick}>
        {children}
      </Button>
    )
  }

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  )
}
