import { CardValue, PlayingCard } from "../../types/card";
import { GameStatus } from "../types/game";
import { calculateHandValue } from "./calculateHandValue";

export const isBlackjack = (cards: PlayingCard[]): boolean => {
  if (cards.length !== 2) {
    return false;
  }

  const values = cards.map(card => card.value);
  return (
    (values.includes(CardValue.ACE) &&
      (values.includes('10') || values.includes(CardValue.KING) || values.includes(CardValue.QUEEN) || values.includes(CardValue.JACK)))
  );
};

export const isBust = (cards: PlayingCard[]): boolean => {
  return calculateHandValue(cards) > 21;
};

export const determineWinner = (player: PlayingCard[], dealer: PlayingCard[]): GameStatus => {
  const playerScore = calculateHandValue(player);
  const dealerScore = calculateHandValue(dealer);

  if (playerScore > 21) {
    return GameStatus.Lose
  }
  if (dealerScore > 21) {
    return GameStatus.Win
  }
  if (playerScore > dealerScore) {
    return GameStatus.Win
  }
  if (playerScore < dealerScore) {
    return GameStatus.Lose
  }
  return GameStatus.Tie
};
