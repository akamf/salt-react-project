import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { useAuth } from '../hooks/useAuth';
import { addUser } from '../utils/api';


const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!name.trim() || !password.trim()) {
      setError("Username and password cannot be empty");
      return;
    }

    try {
      await addUser(name, password);
      setSuccess(true);

      setTimeout(() => {
        navigate({ to: '/login' });
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Registration failed, try again later");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 bg-white p-6 rounded text-black">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Register</h2>
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
      {success ? (
        <p className="text-green-800 text-center font-medium">
          Registration successful!✅
          <br/>
          Redirecting to login...
        </p>
      ) : (
        <button
          type="submit"
          className="w-full bg-amber-700 hover:bg-amber-800 text-white py-2 rounded"
        >
          Register
        </button>
      )}
    </form>
  );
}

export const Route = createFileRoute('/register')({
  component: Register,
});
