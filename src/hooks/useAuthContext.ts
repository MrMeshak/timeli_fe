import { usePermissionsStore } from '@/store/permissionsStore';

export interface IAuthContext {
  isAuthenticated: boolean;
  permissions: bigint;
}

export function useAuthContext() {
  const permissionStr = usePermissionsStore();

  if (!permissionStr) {
    return {
      isAuthenticated: false,
      permission: BigInt(0),
    };
  }

  try {
    const permissions = BigInt(permissionStr);
    return {
      isAuthenticated: !!permissions,
      permissions: permissions,
    };
  } catch {
    return {
      isAuthenticated: false,
      permissions: BigInt(0),
    };
  }
}
