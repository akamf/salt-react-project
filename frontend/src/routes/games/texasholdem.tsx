import { createFileRoute, redirect } from '@tanstack/react-router'
import TexasHoldem from '../../games/texasholdem/Game';

function TexasHoldemPage() {
  return (
    <>
      <h1 className="text-4xl font-extrabold mb-8 text-center uppercase tracking-wider">
        ♠ Texas Hold'em ♣
      </h1>
      <TexasHoldem />
    </>
  );
}

export const Route = createFileRoute('/games/texasholdem')({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: '/login',
        search: { redirect: '/profile' },
      })
    }
  },
  component: TexasHoldemPage,
});
