import { createRootRouteWithContext, Link, Outlet, useRouteContext } from '@tanstack/react-router'
import type { AuthContext } from '../utils/auth'

const RootComponent = () => {
  const { user, logout } = useRouteContext({ from: '__root__' })

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-green-600 to-green-900 text-white font-mono">
      <header className="w-full rounded-b-lg mb-6 text-center bg-amber-950/80 p-6">
        <h1 className="text-3xl font-bold">Game Lounge</h1>
        <nav className="mt-4 flex justify-center gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/games" className="hover:underline">Games</Link>
          {user && (
            <>
              <Link to="/profile" className="hover:underline">Profile</Link>
              {/* <Link to="/high-score" className="hover:underline">High Score</Link> */}
            </>
          )}
          {!user ? (
            <Link to="/login">Log In</Link>
          ) : (
            <button onClick={logout} className="ml-4 underline">Log Out</button>
          )}
        </nav>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}

export const Route = createRootRouteWithContext<AuthContext>()({
  component: RootComponent,
})
