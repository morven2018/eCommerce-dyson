export function getTokenFromLS(): string | null {
  const tokenName = 'authDysonToken';
  const token: string | null = localStorage.getItem(tokenName);
  if (token === null) return null;

  if (typeof token === 'string') {
    return token;
  }

  return null;
}
