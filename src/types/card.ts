export interface PlayingCard {
  code: string
  image: string
  value: string
  suit: string
};

export enum CardValue {
  ACE = 'ACE',
  JACK = 'JACK',
  QUEEN = 'QUEEN',
  KING = 'KING',
};
