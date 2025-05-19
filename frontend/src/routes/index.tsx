import { createFileRoute, Link, useRouteContext } from '@tanstack/react-router'
import { useAuth } from '../hooks/useAuth';

const Index = () => {
  const { user } = useAuth();
  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold mb-6">🎲 Welcome to the Game Hub</h1>
      {!user ? (
        <Link
          to="/login"
          className="inline-block px-6 py-3 bg-emerald-900 hover:bg-emerald-800 rounded text-white text-lg"
        >
          Log In
        </Link>
      ) : (
        <div className="flex flex-row justify-center items-center gap-4">
          <Link
            to="/games"
            className="inline-block px-6 py-3 bg-emerald-900 hover:bg-emerald-800 rounded text-white text-lg"
          >
            View Games
          </Link>
          <Link
            to="/profile"
            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded text-white text-lg"
          >
            See Profile
          </Link>
        </div>
      )}
    </div>
  );
}

export const Route = createFileRoute('/')({
  component: Index,
})

