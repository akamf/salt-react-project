import { CardValue, PlayingCard } from "../../types/card";

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
