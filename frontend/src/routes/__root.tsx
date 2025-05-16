import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router';

export const Route = createRootRouteWithContext()({
  component: () => (
    <div className="w-full min-h-screen bg-gradient-to-b from-green-600 to-green-900 text-white font-mono">
      <header className="w-full rounded-b-lg mb-6 text-center bg-emerald-950/50 p-6">
        <h1 className="text-3xl font-bold">Game Lounge</h1>
        <nav className="mt-4 flex justify-center gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/games" className="hover:underline">Games</Link>
        </nav>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  ),
});
