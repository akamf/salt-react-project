import { createFileRoute, Link, useRouteContext } from '@tanstack/react-router'
import { useAuth } from '../hooks/useAuth';

const Index = () => {
  const { user } = useAuth();
  return (
    <div className="text-center px-4">
      <h1 className="text-4xl font-bold mb-4">🎲 Welcome to the Game Hub</h1>

      <p className="text-lg text-gray-200 mb-8 max-w-xl mx-auto">
        Take a break, shuffle up, and play a round. Whether you're chasing 21 🃏
        or just hanging out, Game Hub is your cozy corner for casual card games.
        More games are coming soon — stay tuned! 💫
      </p>
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

