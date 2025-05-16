export type UserDto = {
  id: string;
  name: string;
  gameStats: Record<string, {
    wins: number;
    losses: number;
    ties: number;
    extraStats: Record<string, number>;
  }>;
  token: string;
};

export type AuthContext = {
  user: UserDto | null
  login: (user: UserDto) => void
  logout: () => void
};
