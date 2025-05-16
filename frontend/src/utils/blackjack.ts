import { GameStatus } from "../types/blackjack";
import { CardValue, PlayingCard } from "../types/card";

export const calculateHandValue = (cards: PlayingCard[]): number => {
    let total: number = 0;
    let aces: number = 0;

    for (const card of cards) {
        if ([CardValue.KING, CardValue.QUEEN, CardValue.JACK].includes(card.value as CardValue)) {
            total += 10;
        } else if (card.value === 'ACE') {
            total += 11;
            aces += 1;
        } else {
            total += parseInt(card.value);
        }

    }

    while (total > 21 && aces > 0) {
        total -= 10;
        aces -= 1;
    }

    return total;
};


export const isBlackjack = (cards: PlayingCard[]): boolean => {
  if (cards.length !== 2) return false

  const values = cards.map(card => card.value)
  return (
    (values.includes(CardValue.ACE) &&
      (values.includes('10') || values.includes(CardValue.KING) || values.includes(CardValue.QUEEN) || values.includes(CardValue.JACK)))
  )
};

export const isBust = (cards: PlayingCard[]): boolean => {
  return calculateHandValue(cards) > 21
};

export const determineWinner = (player: PlayingCard[], dealer: PlayingCard[]): GameStatus => {
  const playerScore = calculateHandValue(player)
  const dealerScore = calculateHandValue(dealer)

  if (playerScore > 21) return GameStatus.Lose
  if (dealerScore > 21) return GameStatus.Win
  if (playerScore > dealerScore) return GameStatus.Win
  if (playerScore < dealerScore) return GameStatus.Lose
  return GameStatus.Tie
};
