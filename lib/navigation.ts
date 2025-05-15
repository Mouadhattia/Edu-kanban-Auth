import type { useRouter } from "next/navigation"

/**
 * Safely navigate to a route, with optional error handling
 * @param router Next.js router instance
 * @param path Path to navigate to
 * @param options Optional configuration
 */
export const navigateTo = (
  router: ReturnType<typeof useRouter>,
  path: string,
  options?: {
    onError?: (error: unknown) => void
    fallbackPath?: string
    userRole?: string
  },
) => {
  try {
    // Check if the route exists
    if (!routeExists(path)) {
      console.warn(`Route does not exist: ${path}`)

      if (options?.onError) {
        options.onError(new Error(`Route does not exist: ${path}`))
      }

      if (options?.fallbackPath) {
        router.push(options.fallbackPath)
      }

      return
    }

    // In a real app, you would check permissions here
    // For now, we'll just navigate
    router.push(path)
  } catch (error) {
    console.error(`Navigation error to ${path}:`, error)

    if (options?.onError) {
      options.onError(error)
    }

    if (options?.fallbackPath) {
      try {
        router.push(options.fallbackPath)
      } catch (fallbackError) {
        console.error(`Fallback navigation error to ${options.fallbackPath}:`, fallbackError)
      }
    }
  }
}

/**
 * Check if a route exists in the application
 * This is a more comprehensive implementation
 */
export const routeExists = (path: string): boolean => {
  // Define all valid route patterns
  const validRoutePatterns = [
    // Teacher routes
    /^\/teacher\/dashboard$/,
    /^\/teacher\/classes$/,
    /^\/teacher\/classes\/[^/]+$/,
    /^\/teacher\/classes\/[^/]+\/boards$/,
    /^\/teacher\/classes\/[^/]+\/students$/,
    /^\/teacher\/classes\/[^/]+\/edit$/,
    /^\/teacher\/students$/,
    /^\/teacher\/assignments$/,
    /^\/teacher\/boards$/,
    /^\/teacher\/analytics$/,
    /^\/teacher\/purchases$/,
    /^\/teacher\/settings$/,

    // Student routes
    /^\/student\/dashboard$/,
    /^\/student\/classes$/,
    /^\/student\/assignments$/,
    /^\/student\/progress$/,
    /^\/student\/board\/[^/]+$/,

    // Admin routes
    /^\/admin\/dashboard$/,
    /^\/admin\/teachers$/,
    /^\/admin\/students$/,
    /^\/admin\/classes$/,
    /^\/admin\/boards$/,
    /^\/admin\/templates$/,
    /^\/admin\/analytics$/,
    /^\/admin\/settings$/,

    // Super admin routes
    /^\/super-admin$/,
    /^\/super-admin\/users$/,
    /^\/super-admin\/organizations$/,
    /^\/super-admin\/templates$/,
    /^\/super-admin\/standards$/,
    /^\/super-admin\/settings$/,
    /^\/super-admin\/billing$/,
    /^\/super-admin\/analytics$/,
    /^\/super-admin\/security$/,
    /^\/super-admin\/system$/,
    /^\/super-admin\/localization$/,
    /^\/super-admin\/communications$/,
    /^\/super-admin\/school-websites$/,
    /^\/super-admin\/school-websites\/[^/]+$/,
    /^\/super-admin\/audit-logs$/,
    /^\/super-admin\/database$/,
    /^\/super-admin\/notifications$/,
    /^\/super-admin\/help$/,

    // Curriculum designer routes
    /^\/curriculum-designer\/dashboard$/,
    /^\/curriculum-designer\/templates$/,
    /^\/curriculum-designer\/analytics$/,
    /^\/curriculum-designer\/earnings$/,
    /^\/curriculum-designer\/settings$/,

    // Organization routes
    /^\/organization\/dashboard$/,
    /^\/organization\/members$/,
    /^\/organization\/templates$/,
    /^\/organization\/approvals$/,
    /^\/organization\/analytics$/,
    /^\/organization\/activity$/,
    /^\/organization\/settings$/,
    /^\/organization\/billing$/,
    /^\/organization\/integrations$/,

    // Board routes
    /^\/board\/[^/]+$/,

    // Template routes
    /^\/templates$/,
    /^\/templates\/browse$/,
    /^\/templates\/requests$/,
    /^\/template\/[^/]+$/,
    /^\/template-editor\/[^/]+$/,
    /^\/template-board\/[^/]+$/,

    // Other routes
    /^\/calendar$/,
    /^\/progress$/,
    /^\/assignments$/,
    /^\/assignments\/create$/,
    /^\/assignments\/[^/]+$/,
    /^\/assignments\/[^/]+\/grade\/[^/]+$/,
    /^\/purchases$/,
    /^\/purchases\/[^/]+$/,

    // Class routes
    /^\/classes\/[^/]+$/,
    /^\/classes\/[^/]+\/students$/,
    /^\/classes\/[^/]+\/boards$/,
    /^\/classes\/[^/]+\/edit$/,
  ]

  // Check if the path matches any of the valid route patterns
  return validRoutePatterns.some((pattern) => pattern.test(path))
}
