import { useRouteContext } from '@tanstack/react-router'
import type { AuthContext } from '../utils/auth'

export function useAuth(): AuthContext {
  return useRouteContext({ from: '__root__' });
}
