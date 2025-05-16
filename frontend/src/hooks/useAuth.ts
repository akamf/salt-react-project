import { useRouteContext } from '@tanstack/react-router'
import type { AuthContext } from '../lib/auth'

export function useAuth(): AuthContext {
  return useRouteContext({ from: '__root__' });
}
