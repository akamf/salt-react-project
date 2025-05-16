import { PlayingCard } from "../types/card";
import { calculateHandValue } from "../utils";

interface ScoreProps {
  cards: PlayingCard[];
  label: string;
  revealScore?: boolean;
}

const Score = ({ cards, label, revealScore = true }: ScoreProps) => {
  if (!revealScore) return;

  const score: number = calculateHandValue(cards);

  return (
    <div className="mt-2 text-sm text-gray-200 italic">
      {label} Score: {score}
    </div>
  );
}

export default Score;
