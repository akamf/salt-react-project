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