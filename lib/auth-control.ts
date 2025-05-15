import type { UserRole } from "./types"

// Define role-based permissions
const rolePermissions: Record<UserRole, string[]> = {
  teacher: [
    "view:classes",
    "create:class",
    "edit:class",
    "delete:class",
    "view:students",
    "manage:students",
    "view:boards",
    "create:board",
    "edit:board",
    "delete:board",
    "view:assignments",
    "create:assignment",
    "grade:assignment",
  ],
  student: ["view:classes", "view:assignments", "submit:assignment", "view:boards", "view:progress"],
  admin: ["view:all", "manage:all"],
  "curriculum-designer": ["view:templates", "create:template", "edit:template", "delete:template", "publish:template"],
  "org-admin": ["view:organization", "manage:organization", "manage:members", "manage:billing"],
  "super-admin": ["view:all", "manage:all", "manage:system"],
}

/**
 * Check if a user has permission to perform an action
 * @param userRole The role of the user
 * @param permission The permission to check
 * @returns Boolean indicating if the user has permission
 */
export function hasPermission(userRole: UserRole, permission: string): boolean {
  // Super admin and admin have all permissions
  if (userRole === "super-admin" || userRole === "admin") {
    return true
  }

  // Check if the role has the specific permission
  return rolePermissions[userRole]?.includes(permission) || false
}

/**
 * Get all permissions for a user role
 * @param userRole The role of the user
 * @returns Array of permissions
 */
export function getUserPermissions(userRole: UserRole): string[] {
  return rolePermissions[userRole] || []
}

/**
 * Check if a user can access a specific route
 * @param userRole The role of the user
 * @param route The route to check
 * @returns Boolean indicating if the user can access the route
 */
export function canAccessRoute(userRole: UserRole, route: string): boolean {
  // Define route access by role
  const routeAccess: Record<string, UserRole[]> = {
    "/teacher": ["teacher", "admin", "super-admin"],
    "/teacher/classes": ["teacher", "admin", "super-admin"],
    "/teacher/students": ["teacher", "admin", "super-admin"],
    "/teacher/assignments": ["teacher", "admin", "super-admin"],
    "/teacher/boards": ["teacher", "admin", "super-admin"],
    "/teacher/analytics": ["teacher", "admin", "super-admin"],
    "/student": ["student", "admin", "super-admin"],
    "/student/classes": ["student", "admin", "super-admin"],
    "/student/assignments": ["student", "admin", "super-admin"],
    "/student/progress": ["student", "admin", "super-admin"],
    "/admin": ["admin", "super-admin"],
    "/curriculum-designer": ["curriculum-designer", "admin", "super-admin"],
    "/organization": ["org-admin", "admin", "super-admin"],
    "/super-admin": ["super-admin"],
  }

  // Check for exact route match
  if (routeAccess[route] && routeAccess[route].includes(userRole)) {
    return true
  }

  // Check for parent route match (e.g., /teacher/classes/1 should match /teacher/classes)
  for (const accessRoute in routeAccess) {
    if (route.startsWith(accessRoute) && routeAccess[accessRoute].includes(userRole)) {
      return true
    }
  }

  return false
}

/**
 * Get the home route for a user based on their role
 * @param userRole The role of the user
 * @returns The home route for the user
 */
export function getHomeRouteForRole(userRole: UserRole): string {
  switch (userRole) {
    case "teacher":
      return "/teacher/dashboard"
    case "student":
      return "/student/dashboard"
    case "admin":
      return "/admin/dashboard"
    case "curriculum-designer":
      return "/curriculum-designer/dashboard"
    case "org-admin":
      return "/organization/dashboard"
    case "super-admin":
      return "/super-admin"
    default:
      return "/"
  }
}
