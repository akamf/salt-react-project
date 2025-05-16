import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router';

export const Route = createRootRouteWithContext()({
  component: () => (
    <div className="w-full min-h-screen bg-gradient-to-b from-green-600 to-green-900 text-white p-6 font-mono">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold">Game Lounge</h1>
        <nav className="mt-4 flex justify-center gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/games" className="hover:underline">Games</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  ),
});
