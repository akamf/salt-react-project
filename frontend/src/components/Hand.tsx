import { PlayingCard } from '../types/card'
import Card from './Card';

interface HandProps {
  cards: PlayingCard[];
  owner: 'Player' | 'Dealer';
  revealAllCards?: boolean;
}

function Hand({ cards, owner, revealAllCards = false }: HandProps) {
  return (
    <div className="flex justify-center flex-wrap gap-2 items-center">
      {cards.map((card: PlayingCard, index: number) => (
        <Card 
          key={card.code} 
          image={card.image} 
          value={card.value}
          hidden={owner === 'Dealer' && index > 0 && !revealAllCards}
        />
      ))}
    </div>
  )
}

export default Hand;
