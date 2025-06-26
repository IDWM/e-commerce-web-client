import { USER_ROLES } from '@/types';

export interface RoutePermission {
  requiresAuth?: boolean;
  requiresRole?: string;
  allowedRoles?: string[];
}

export const ROUTE_PERMISSIONS: Record<string, RoutePermission> = {
  '/admin/*': { requiresRole: USER_ROLES.ADMIN },
  '/cart/*': { requiresAuth: true },
};

export function getRoutePermission(pathname: string): RoutePermission | null {
  // Buscar coincidencia con wildcard primero (más específico)
  const wildcardRoute = Object.keys(ROUTE_PERMISSIONS).find((route) => {
    if (route.endsWith('/*')) {
      const basePath = route.slice(0, -2);
      return pathname.startsWith(basePath + '/') || pathname === basePath;
    }
    return false;
  });

  if (wildcardRoute) {
    return ROUTE_PERMISSIONS[wildcardRoute];
  }

  // Buscar coincidencia exacta
  return ROUTE_PERMISSIONS[pathname] || null;
}

export function checkRouteAccess(
  pathname: string,
  isAuthenticated: boolean,
  userRole?: string,
): boolean {
  const permission = getRoutePermission(pathname);

  if (!permission) return true; // Ruta pública

  if (permission.requiresAuth && !isAuthenticated) return false;

  if (permission.requiresRole && userRole !== permission.requiresRole) return false;

  if (permission.allowedRoles && !permission.allowedRoles.includes(userRole || '')) return false;

  return true;
}
