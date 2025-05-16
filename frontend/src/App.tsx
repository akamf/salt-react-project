import { ReactElement } from 'react';
import BlackJack from './games/blackjack/Game';


const App = (): ReactElement => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-green-600 to-green-900 text-white p-6 font-mono">
      <h1 className="text-4xl font-extrabold mb-8 text-center uppercase tracking-wider">
        ♠ Blackjack ♣
      </h1>
      <BlackJack />
    </div>
  );
}

export default App;
