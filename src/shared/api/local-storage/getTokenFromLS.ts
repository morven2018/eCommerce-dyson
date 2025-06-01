export function getTokenFromLS(): string | null {
  const authTokenName = 'authDysonToken';
  const anonymTokenName = 'AnonymousDysonToken';

  const token: string | null =
    localStorage.getItem(authTokenName) ||
    localStorage.getItem(anonymTokenName);

  return token;
}
