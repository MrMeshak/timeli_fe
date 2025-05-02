import { useSyncExternalStore } from 'react';

export function setPermissions(permissions: string) {
  localStorage.setItem('permissions', permissions);
  window.dispatchEvent(
    new StorageEvent('storage', { key: 'permissions', newValue: permissions }),
  );
}

export function removePermissions() {
  localStorage.removeItem('permissions');
  window.dispatchEvent(
    new StorageEvent('storage', { key: 'permissions', newValue: null }),
  );
}
const permssionsStore = {
  subscribe: (listener: () => void) => {
    addEventListener('storage', listener);
    return () => window.removeEventListener('storage', listener);
  },
  getSnapshot: () => localStorage.getItem('permissions'),
};

export function usePermissionsStore() {
  return useSyncExternalStore(
    permssionsStore.subscribe,
    permssionsStore.getSnapshot,
  );
}
