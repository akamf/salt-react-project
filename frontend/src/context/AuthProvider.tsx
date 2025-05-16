import React from 'react'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from '../routeTree.gen'
import { UserDto, AuthContext } from '../utils/auth'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const AuthProvider = () => {
  const [user, setUser] = React.useState<UserDto | null>(null);

  const login = (user: UserDto) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  }

  React.useEffect(() => {
    const stored = localStorage.getItem('user');
    
    if (stored) setUser(JSON.parse(stored));
  }, [])

  const context: AuthContext = { user, login, logout };

  return <RouterProvider router={router} context={context} />;
}

export default AuthProvider;

