/**
 * Utility to handle role-based localStorage to avoid conflicts when 
 * multi-tabbing between Admin, Staff, and Customer views.
 */

const getPrefix = (role?: string) => {
  if (role) return `${role}_`;
  const path = window.location.pathname;
  if (path.startsWith('/admin')) return 'admin_';
  if (path.startsWith('/staff')) return 'staff_';
  return 'customer_';
};

export const storage = {
  getToken: (role?: string) => localStorage.getItem(`${getPrefix(role)}token`),
  setToken: (token: string, role?: string) => localStorage.setItem(`${getPrefix(role)}token`, token),
  removeToken: (role?: string) => localStorage.removeItem(`${getPrefix(role)}token`),
  
  getUser: (role?: string) => {
    try {
      const stored = localStorage.getItem(`${getPrefix(role)}user`);
      if (!stored || stored === 'undefined') return null;
      return JSON.parse(stored);
    } catch (e) {
      return null;
    }
  },
  setUser: (user: any, role?: string) => {
    const r = role || user?.role;
    localStorage.setItem(`${getPrefix(r)}user`, JSON.stringify(user));
  },
  removeUser: (role?: string) => localStorage.removeItem(`${getPrefix(role)}user`),
  
  clearAll: (role?: string) => {
    const prefix = getPrefix(role);
    localStorage.removeItem(`${prefix}token`);
    localStorage.removeItem(`${prefix}user`);
  }
};
