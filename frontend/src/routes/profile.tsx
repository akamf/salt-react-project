import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { updateUser } from '../utils/api';


const Profile = () => {
  const { user, login } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const hasNameChanged = name.trim() !== user?.name;
  const wantsToChangePassword = oldPassword && newPassword;

  const isFormValid = () => {
    if (!hasNameChanged && !wantsToChangePassword) {
      return false;
    }

    if (wantsToChangePassword && (newPassword.length < 6 || !/[a-zA-Z]/.test(newPassword) || !/\d/.test(newPassword))) {
      return false;
    }

    return true;
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!user) {
      return;
    }

    try {
      const updatedUser = await updateUser({
        id: user.id,
        name: name.trim(),
        oldPassword,
        newPassword: newPassword.trim() || undefined,
      });

      login(updatedUser);
      setMessage('✅ Profile updated successfully.');
      setOldPassword('');
      setNewPassword('');
    } catch (err: any) {
      setError(err.message || 'Failed to update profile.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 mt-10 rounded shadow text-black">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Profile Settings</h2>

      {message && <p className="text-center mb-4 font-medium text-emerald-700">{message}</p>}

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Current Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={!isFormValid()}
          className={`w-full py-2 rounded text-white ${
            isFormValid()
              ? 'bg-amber-700 hover:bg-amber-800'
              : 'bg-amber-700/50 cursor-not-allowed'
          }`}
        >
          Update
        </button>
      </form>

      {/* Stats section */}
      <div className="mt-10 bg-gray-100 rounded p-4">
        <h3 className="text-center text-lg font-semibold mb-8 text-gray-700">🎮 Your Game Stats</h3>
        {user?.gameStats && Object.keys(user.gameStats).length > 0 ? (
          Object.entries(user.gameStats).map(([game, stats]) => (
            <div key={game} className="mb-4 bg-gray-300/80 p-4 rounded shadow">
              <h4 className="font-semibold text-center text-gray-800">{game.toUpperCase()}</h4>
              <ul className="text-sm text-gray-700 list-none ml-5">
                <li>Wins: {stats.wins}</li>
                <li>Losses: {stats.losses}</li>
                <li>Ties: {stats.ties}</li>
                {stats.extraStats &&
                  Object.entries(stats.extraStats).map(([key, value]) => (
                    <li key={`extra-${key}`}>
                      {key}: {value}
                    </li>
                  ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-600">You haven't played any games yet.</p>
        )}
      </div>
    </div>
  );
}

export const Route = createFileRoute('/profile')({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: '/login',
        search: { redirect: '/profile' },
      })
    }
  },
  component: Profile
});
