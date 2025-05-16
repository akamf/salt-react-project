import { GameStatus } from "../types/game";

interface StatusProps {
  status: GameStatus;
}

const Status = ({ status }: StatusProps) => {
  let message: string = '';

  switch (status) {
    case GameStatus.Win:
      message = '🎉 You Win!';
      break;
    case GameStatus.Lose:
      message = '💀 Dealer Wins!';
      break;
    case GameStatus.Tie:
      message = '🤝 It’s a tie!';
      break;
    case GameStatus.Blackjack:
      message = '🃏 BLACKJACK! You win!';
      break;
    case GameStatus.Playing:
    case GameStatus.None:
    default:
      return null;
    }

  return (
    <div className="text-center my-4 text-xl font-semibold bg-black bg-opacity-20 p-3 rounded">
      {message}
    </div>
  );
}

export default Status;
