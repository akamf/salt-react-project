import { createFileRoute, Link } from "@tanstack/react-router";

const GameList = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Available Games</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/games/blackjack"
          className="bg-black text-white rounded-lg p-6 shadow-lg hover:bg-gray-900 transition"
        >
          <h3 className="text-xl font-bold mb-2">♠ Blackjack</h3>
          <p className="text-sm text-gray-300">Try your luck against the dealer.</p>
        </Link>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/games/')({
  component: GameList,
})
