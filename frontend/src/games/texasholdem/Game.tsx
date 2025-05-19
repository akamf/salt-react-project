import Hand from "./component/Hand";

const sampleHand = [
  {
    "code": "6H", 
    "image": "https://deckofcardsapi.com/static/img/6H.png", 
    "images": {
      "svg": "https://deckofcardsapi.com/static/img/6H.svg", 
      "png": "https://deckofcardsapi.com/static/img/6H.png"
    }, 
    "value": "6", 
    "suit": "HEARTS"
  }, 
  {
    "code": "5S", 
    "image": "https://deckofcardsapi.com/static/img/5S.png", 
    "images": {
      "svg": "https://deckofcardsapi.com/static/img/5S.svg", 
      "png": "https://deckofcardsapi.com/static/img/5S.png"
    }, 
    "value": "5", 
    "suit": "SPADES"
  }
];

const TexasHoldem = () => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-green-900 p-6 rounded shadow-xl space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Texas Hold'em Component</h2>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Player</h2>
        <Hand 
          cards={sampleHand} 
          owner="Player"
        />
      </div>
    </div>
  );
};

export default TexasHoldem;
