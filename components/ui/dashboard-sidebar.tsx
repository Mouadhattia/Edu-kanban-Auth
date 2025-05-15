"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GraduationCap } from "lucide-react"
import type { NavItem } from "@/lib/types"

interface DashboardSidebarProps {
  items: NavItem[]
  title?: string
  className?: string
  defaultCollapsed?: boolean
  onToggle?: (collapsed: boolean) => void
}

export function DashboardSidebar({
  items,
  title = "EduKanban",
  className,
  defaultCollapsed = false,
  onToggle,
}: DashboardSidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedState = localStorage.getItem("sidebar-collapsed")
      if (storedState !== null) {
        setIsCollapsed(storedState === "true")
      }
    }
  }, [])

  const toggleSidebar = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)

    if (typeof window !== "undefined") {
      localStorage.setItem("sidebar-collapsed", String(newState))
    }

    if (onToggle) {
      onToggle(newState)
    }

    // Dispatch custom event for other components that need to know about sidebar state
    const event = new CustomEvent("sidebarStateChange", { detail: { collapsed: newState } })
    window.dispatchEvent(event)
  }

  return (
    <div
      className={cn(
        "flex-shrink-0 border-r h-full bg-background transition-all duration-300",
        isCollapsed ? "w-[70px]" : "w-[240px]",
        className,
      )}
    >
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <GraduationCap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span
            className={cn(
              "font-bold transition-opacity duration-300",
              isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100",
            )}
          >
            {title}
          </span>
        </Link>
        <Button variant="ghost" size="icon" className="ml-auto" onClick={toggleSidebar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("transition-transform duration-300", isCollapsed ? "rotate-180" : "")}
          >
            <path d="m15 6-6 6 6 6" />
          </svg>
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="px-3 py-4">
          {items.map((section, index) => (
            <div key={index} className="mb-8">
              <h4
                className={cn(
                  "mb-2 px-2 text-xs font-semibold uppercase tracking-tight text-muted-foreground transition-opacity duration-300",
                  isCollapsed ? "opacity-0 h-0 overflow-hidden" : "opacity-100",
                )}
              >
                {section.title}
              </h4>
              <nav className="grid gap-1">
                {section.items.map((item, i) => (
                  <Link key={i} href={item.href} passHref>
                    <Button
                      variant={pathname === item.href ? "secondary" : "ghost"}
                      className={cn("w-full justify-start", isCollapsed ? "px-2" : "")}
                    >
                      {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                      <span
                        className={cn(
                          "transition-opacity duration-300",
                          isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100",
                        )}
                      >
                        {item.title}
                      </span>
                      {item.badge && !isCollapsed && (
                        <span
                          className={cn(
                            "ml-auto rounded-full px-2 py-0.5 text-xs font-semibold",
                            item.badgeVariant === "destructive"
                              ? "bg-destructive text-destructive-foreground"
                              : "bg-primary text-primary-foreground",
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Button>
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
