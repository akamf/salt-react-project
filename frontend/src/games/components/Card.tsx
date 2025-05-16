interface CardProps {
  image: string;
  value: string;
  hidden?: boolean;
}

const Card = ({ image, value, hidden = false }: CardProps) => {
  return (
    <div className="w-20 h-28 relative">
      <img 
        src={hidden ? 'https://deckofcardsapi.com/static/img/back.png' : image}
        alt={value || 'card'} 
        className="w-full h-full object-cover rounded shadow-lg"
      />
    </div>
  )
}

export default Card;
