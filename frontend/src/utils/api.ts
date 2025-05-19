const getApiUrl = (): string => {
  const url = import.meta.env.VITE_API_URL;
  if (!url) {
    throw new Error("Missing VITE_API_URL in environment");
  }
  return url;
};

const API_URL = getApiUrl();

export const loginUser = async (name: string, password: string) => {
  const response = await fetch(`${API_URL}/login?name=${name}&password=${password}`, {
    method: "POST",
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Login failed");
  }

  return await response.json();
};

export const addUser = async (name: string, password: string) => {
  const response = await fetch(`${API_URL}/add-user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, password }),
  });
  
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message || "Registration failed");
  }

  return await response.json();
};

export const updateStats = async (
  userId: string,
  game: string,
  outcome: 'win' | 'lose' | 'blackjack' | 'tie'
) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ game, outcome }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return await response.json();
};


export interface UpdateUserPayload {
  id: string;
  name: string;
  oldPassword: string;
  newPassword?: string;
}

export const updateUser = async (payload: UpdateUserPayload) => {
  const response = await fetch(`${API_URL}/update-user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message);
  }

  const user = await response.json();

  return {
    id: user.id,
    name: user.name,
    token: user.token,
    gameStats: user.gameStats, 
  };
};