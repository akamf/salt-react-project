import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuth } from '../hooks/useAuth'

export const Route = createFileRoute('/profile')({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: '/login',
        search: { redirect: '/profile' },
      })
    }
  },
  component: () => {
    const { user } = useAuth()
    return <div>Welcome {user?.name} to your profile!</div>
  }
});
