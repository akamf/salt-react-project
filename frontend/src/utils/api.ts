export const getApiUrl = (): string => {
  const url = import.meta.env.VITE_API_URL
  if (!url) {
    throw new Error("Missing VITE_API_URL in environment")
  }
  return url
};

export const loginUser = async (name: string, password: string) => {
  const API_URL = getApiUrl();

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
  const API_URL = getApiUrl();

  const response = await fetch(`${API_URL}/add-user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, password }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Registration failed");
  }

  return await response.json();
};
