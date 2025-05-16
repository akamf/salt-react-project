import { ReactElement, useState } from "react";

import Controls from "./components/Controls";
import Hand from "./components/Hand";
import { GameStatus } from "./types/game";
import { PlayingCard } from "./types/card";
import { calculateHandValue } from "./utils";
import Status from "./components/Status";
import Score from "./components/Score";


const Game = (): ReactElement => {
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

      const playerScore: number = calculateHandValue([cards[0], cards[2]]);
      setPlayerCards([cards[0], cards[2]]);
      setDealerCards([cards[1], cards[3]]);

      if (playerScore === 21) {
        setGameStatus(GameStatus.Blackjack);
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

      const playerScore: number = calculateHandValue(updatedHand);
      if (playerScore > 21) {
        setGameStatus(GameStatus.Lose);
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

    const playerScore: number = calculateHandValue(playerCards);
    const dealerScore: number = calculateHandValue(dealer);

    if (playerScore > 21) setGameStatus(GameStatus.Lose);
    else if (dealerScore > 21) setGameStatus(GameStatus.Win);
    else if (playerScore > dealerScore) setGameStatus(GameStatus.Win);
    else if (playerScore < dealerScore) setGameStatus(GameStatus.Lose);
    else setGameStatus(GameStatus.Tie);
  }
  

  return (
    <div className="max-w-4xl mx-auto bg-green-900 p-6 rounded shadow-xl space-y-6">
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

export default Game;
