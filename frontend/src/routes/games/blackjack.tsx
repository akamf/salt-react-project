import { createFileRoute, redirect } from "@tanstack/react-router";
import BlackJack from "../../games/blackjack/Game";

const BlackJackPage = () => {
    return (
      <>
        <h1 className="text-4xl font-extrabold mb-8 text-center uppercase tracking-wider">
          ♠ Blackjack ♣
        </h1>
        <BlackJack />
      </>
    );
}

export const Route = createFileRoute('/games/blackjack')({
  beforeLoad: ({ context }) => {
      if (!context.user) {
        throw redirect({
          to: '/login',
          search: { redirect: '/profile' },
        })
      }
    },
  component: BlackJackPage,
})
