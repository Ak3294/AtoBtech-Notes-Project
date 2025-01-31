import { useState, useEffect } from 'react';

export const useAdminAuth = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem('adminAuth');
    setIsAdmin(adminStatus === 'true');
  }, []);

  return isAdmin;
};