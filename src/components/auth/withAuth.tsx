import React from 'react';
import { AuthGuard } from './AuthGuard';
import { RoleGuard } from './RoleGuard';
import { UserRole } from '@/hooks/useRole';

/**
 * Higher-order component that provides authentication and role-based protection
 * Similar to Next.js middleware but for React components
 */
export function withAuth<T extends Record<string, any>>(
  Component: React.ComponentType<T>,
  options?: {
    requiredRole?: UserRole;
    allowedRoles?: UserRole[];
    requireAuth?: boolean;
  }
) {
  const { requiredRole, allowedRoles, requireAuth = true } = options || {};

  const WrappedComponent = (props: T) => {
    // If no auth required, render component directly
    if (!requireAuth) {
      return <Component {...props} />;
    }

    // Auth required - wrap with AuthGuard
    const AuthProtectedComponent = (
      <AuthGuard>
        <Component {...props} />
      </AuthGuard>
    );

    // If no role requirements, return auth-protected component
    if (!requiredRole && !allowedRoles) {
      return AuthProtectedComponent;
    }

    // Wrap with role guard for role-based protection
    return (
      <AuthGuard>
        <RoleGuard requiredRole={requiredRole} allowedRoles={allowedRoles}>
          <Component {...props} />
        </RoleGuard>
      </AuthGuard>
    );
  };

  // Preserve component name for debugging
  WrappedComponent.displayName = `withAuth(${Component.displayName || Component.name})`;

  return WrappedComponent;
}

/**
 * Route-level auth protection
 * Use this to protect entire routes
 */
export function protectRoute<T extends Record<string, any>>(
  Component: React.ComponentType<T>,
  role?: UserRole
) {
  return withAuth(Component, { requiredRole: role });
}

// Export convenience functions for specific roles
export const withAdminAuth = <T extends Record<string, any>>(Component: React.ComponentType<T>) =>
  withAuth(Component, { requiredRole: 'admin' });

export const withModeratorAuth = <T extends Record<string, any>>(Component: React.ComponentType<T>) =>
  withAuth(Component, { allowedRoles: ['admin', 'moderator'] });

export const withUserAuth = <T extends Record<string, any>>(Component: React.ComponentType<T>) =>
  withAuth(Component, { requireAuth: true });