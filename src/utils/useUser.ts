'use client';
import { useState, useEffect } from 'react';

export function useUser() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Usuário Michel configurado como autor do OIO ONE
    setUser({ id: '1', name: 'Michel - OIO ONE', photo: '' });
  }, []);

  return { user };
}

export function useUserProtected() {
  const { user } = useUser();
  return { user };
}
