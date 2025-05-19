import { PlayingCard } from '../../types/card'
import Card from '../../components/Card';

interface HandProps {
  cards: PlayingCard[];
  owner: 'Player' | 'Opponent';
  revealAllCards?: boolean;
}

function Hand({ cards, owner, revealAllCards = false }: HandProps) {
  return (
    <div className="flex justify-center flex-wrap gap-2 items-center">
      {cards.map((card: PlayingCard) => (
        <Card 
          key={card.code} 
          image={card.image} 
          value={card.value}
        />
      ))}
    </div>
  )
}

export default Hand;
