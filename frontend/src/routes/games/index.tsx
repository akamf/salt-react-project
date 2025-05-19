import { createFileRoute, Link } from "@tanstack/react-router";
import GameCard from "../../components/GameCard";

const GameList = () => {
  return (
    <div className="max-w-5xl mx-auto mt-20 bg-green-900 p-10 rounded-lg shadow-xl space-y-6">
      <h2 className="text-3xl font-bold text-center mb-8">🎮 Explore Our Game Collection</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <GameCard
          to="/games/blackjack"
          title="Blackjack"
          icon="♠"
          description="Try your luck against the dealer."
        />
        <GameCard
          title="Texas Hold'em"
          icon="♥"
          description="Go all-in or fold. Play poker like a pro."
          disabled
        />
        <GameCard
          title="Solitaire"
          icon="♦"
          description="The classic single-player card puzzle."
          disabled
        />
      </div>
    </div>
  );
}

export const Route = createFileRoute('/games/')({
  component: GameList,
});
