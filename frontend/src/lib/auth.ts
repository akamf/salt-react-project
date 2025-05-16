export type User = {
  id: string
  name: string
};

export type AuthContext = {
  user: User | null
  login: (name: string) => void
  logout: () => void
};
