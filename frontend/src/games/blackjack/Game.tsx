import { ReactElement, useState } from "react";

import Controls from "./components/Controls";
import Hand from "./components/Hand";
import { PlayingCard } from "../types/card";
import Status from "./components/Status";
import Score from "./components/Score";
import { GameStatus } from "./types/game";
import { calculateHandValue } from "./utils/calculateHandValue";
import { isBlackjack, isBust, determineWinner } from "./utils/engine";
import { useAuth } from "../../hooks/useAuth";
import { updateStats } from "../../utils/api";


const BlackJack = (): ReactElement => {
  const { user, login } = useAuth();

  const [playerCards, setPlayerCards] = useState<PlayingCard[]>([]);
  const [dealerCards, setDealerCards] = useState<PlayingCard[]>([]);
  const [deckId, setDeckId] = useState<string | null>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.None);

    const startNewGame = async () => {
    try {
      const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
      const data = await response.json();
      const newDeckId = data.deck_id;
      setDeckId(data.deck_id);

      const drawResponse = await fetch(`https://deckofcardsapi.com/api/deck/${newDeckId}/draw/?count=4`);
      const drawData = await drawResponse.json();
      const cards = drawData.cards;

      setPlayerCards([cards[0], cards[2]]);
      setDealerCards([cards[1], cards[3]]);

      if (isBlackjack([cards[0], cards[2]])) {
        setGameStatus(GameStatus.Blackjack);
        if (user) {
          const updatedUser = await updateStats(user.id, "blackjack", "blackjack");
          login(updatedUser);
        }
        return;
      }

      setGameStatus(GameStatus.Playing);
    } catch (error) {
      console.error('Failed to start game:', error);
    }
  }

  const handleHit = async () => {
    if (!deckId) return;

    try {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
      const data = await response.json();

      const newCard = data.cards[0];
      const updatedHand = [...playerCards, newCard];
      setPlayerCards(updatedHand);

      if (isBust(updatedHand)) {
        setGameStatus(GameStatus.Lose);
        if (user) {
          const updatedUser = await updateStats(user.id, "blackjack", "loss");
          login(updatedUser);
        }
      }
    } catch (error) {
      console.error('Failed to draw card:', error);
    }
  }

  const handleStand = async () => {
    if (!deckId) return;

    const dealer = [...dealerCards];

    while (calculateHandValue(dealer) < 17) {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
      const data = await response.json();
      const newCard = data.cards[0];
      dealer.push(newCard);
    }

    setDealerCards(dealer);
    const result = determineWinner(playerCards, dealer);
    setGameStatus(result);
    
    if (user) {
      const updatedUser = await updateStats(user.id, "blackjack", result.toLowerCase() as any);
      login(updatedUser);
    }
  }
  

  return (
    <div className="w-full max-w-4xl mx-auto bg-green-900 p-6 rounded shadow-xl space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Dealer</h2>
        <Hand 
          cards={dealerCards} 
          owner="Dealer" 
          revealAllCards={gameStatus !== GameStatus.Playing} 
        />
        <Score cards={dealerCards} label={"Dealer"} revealScore={gameStatus !== GameStatus.Playing} />
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Player</h2>
        <Hand 
          cards={playerCards} 
          owner="Player" 
        />
        <Score cards={playerCards} label={"Player"} />
      </div>

      <div className="text-center">
        <Status status={gameStatus} />
        <Controls
          onHit={handleHit}
          onStand={handleStand}
          onNewGame={startNewGame}
          disabled={gameStatus !== GameStatus.Playing}
        />
      </div>
    </div>
  );
}

export default BlackJack;
