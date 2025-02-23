export interface Permission {
  id: string;
  name: string;
  resource: string;
  canRead: boolean;
  canWrite: boolean;
}

export interface Role {
  id?: string;
  name: string;
  description: string;
  permissions: Permission[];
}

export interface UserAuth {
  token: string;
  username: string;
  roles: string[];
  permissions: Permission[];
  expiresAt: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  isActive: boolean;
  roleIds: string[];
}

export interface BoosterCatalog {
  id: string;
  name: string;
  description: string;
  requiredPermissionIds: string[];
  boosters: Booster[];
}

export interface Booster {
  name: string;
  description: string;
  type: number;
  price: number;
  duration: number;
  isActive: boolean;
}

export function isAdmin(userAuth: UserAuth | undefined) {
  if (!userAuth) return false;
  return userAuth.roles.includes('Admin');
}

export function isPermitted(user: UserAuth | undefined,
                            resource: Resource,
                            access: 'Read' | 'Write') {
  if (user == null) return false;

  return user.permissions?.some((w: Permission) =>
                                  w.resource === resource &&
                                  (access === 'Read' ? w.canRead : w.canWrite)
  );
}

export type Resource = 'Users' | 'Roles' | 'Permissions' | 'Catalogs';
