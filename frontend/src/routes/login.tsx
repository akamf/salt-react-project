import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useAuth } from '../hooks/useAuth';
import React, { useState } from 'react';
import { loginUser } from '../utils/api';


const LogIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const user = await loginUser(name, password);
      login(user);

      setTimeout(() => {
        navigate({ to: '/' })
      }, 0);
    } catch (err: any) {
      setError(err.message || "Login Failed");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 bg-white p-6 rounded text-black">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Login</h2>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <input
        type="text"
        placeholder="Username"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      <button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-2 rounded">
        Log In
      </button>
    </form>
  );
}


export const Route = createFileRoute('/login')({
  component: LogIn,
});
