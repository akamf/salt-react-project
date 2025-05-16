import { createFileRoute, Link } from '@tanstack/react-router'

const Home = () => {
    return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold mb-6">🎲 Welcome to GameHub</h1>
      <Link
        to="/games"
        className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 rounded text-white text-lg"
      >
        View Games
      </Link>
    </div>
  );
}

export const Route = createFileRoute('/')({
  component: Home,
})

