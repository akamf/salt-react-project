import { useEffect, useState } from 'react';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from '../routeTree.gen';
import { UserDto, AuthContext } from '../utils/auth';

const router = createRouter({ 
  routeTree,
  context: { user: null, login: () => {}, logout: () => {} }
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const AuthProvider = () => {
  const [user, setUser] = useState<UserDto | null>(null);
  const [isReady, setIsReady] = useState(false);

  const login = (user: UserDto) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  }

   useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Invalid user in localStorage, clearing...");
        localStorage.removeItem('user');
      }
    }
    setIsReady(true);
  }, []);

  const context: AuthContext = { user, login, logout };

  if (!isReady) {
    return null;
  }

  return <RouterProvider router={router} context={context} />;
}

export default AuthProvider;
