import { createRootRouteWithContext, Link, Outlet, useNavigate, useRouteContext } from '@tanstack/react-router'
import type { AuthContext } from '../utils/auth'
import { useState } from 'react';

const RootComponent = () => {
  const navigate = useNavigate();
  const { user, logout } = useRouteContext({ from: '__root__' });
  
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate({ to: '/' });
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-gradient-to-b from-green-600 to-green-900 text-white font-mono">
      {/* header */}
      <header className="bg-emerald-800/80 px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2 ml-5 md:ml-10">
          <Link to="/" className="hover:opacity-50">
            <img
              src="/logo/GameHubLogo.png"
              alt="Game Hub logo"
              className="h-10 md:h-20 w-auto p-1 rounded-full bg-white shadow"
            />
          </Link>
        </div>

        {/* burger-menu (mobile) */}
        <button
          className="md:hidden mr-5 text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* menu (desktop) */}
        <nav className="hidden md:flex mr-10 items-center gap-6 text-xl font-bold">
          {!user ? (
            <>
              <Link to="/login" className="hover:underline">Log In</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          ) : (
            <>
              <Link to="/games" className="hover:underline">Games</Link>
              <Link to="/profile" className="hover:underline">Profile</Link>
              <button onClick={handleLogout} className="underline">Log Out</button>
            </>
          )}
        </nav>
      </header>

      {/* dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-emerald-900/80 text-center flex flex-col gap-2 py-3 text-lg">
          {!user ? (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Log In</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          ) : (
            <>
              <Link to="/games" onClick={() => setMenuOpen(false)}>Games</Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
              <button onClick={handleLogout} className="underline">Log Out</button>
            </>
          )}
        </div>
      )}

      {/* main-content */}
      <main className="flex-grow flex flex-col justify-center items-center px-4 sm:px-6 py-10">
        <Outlet />
      </main>

      {/* footer */}
      <footer className="bg-emerald-950/80 py-4 text-center text-sm text-gray-300">
        © Andreas Kamf 2025
      </footer>
    </div>
  );
};

export const Route = createRootRouteWithContext<AuthContext>()({
  component: RootComponent,
});
