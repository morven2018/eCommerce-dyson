export function getTokenFromLS(): string | null {
  return (
    localStorage.getItem('authDysonToken') ??
    localStorage.getItem('AnonymousDysonToken')
  );
}
