// Define a Permission type based on the shape of the Permission.cs class.
export interface Permission {
  id: string;           // Unique identifier for the permission
  name: string;         // Name of the permission (e.g., "View Users")
  resource: string;     // Resource the permission applies to (e.g., "Users", "Dashboard")
  canRead: boolean;     // Can the permission allow read operations
  canWrite: boolean;    // Can the permission allow write operations
}

export interface Role {
  id?: string; // Unique identifier for the role
  name: string; // Name of the role
  description: string; // Description of the role
  permissions: Permission[]; // List of permissions assigned to the role
}

// Define a UserAuth type that includes tokens, user information, roles, and permissions.
export interface UserAuth {
  token: string;          // Token assigned to the authenticated user
  username: string;       // Username of the authenticated account
  roles: string[];          // Array of roles (just identifiers/names for the roles)
  permissions: Permission[]; // Array of permissions granted to the user
  expiresAt: string;      // Expiration date-time of the token in ISO 8601 string format
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  isActive: boolean;
  roleIds: string[];
}

export interface BoosterResponse {
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
