export function getCartIdFromLS(): string | null {
  return localStorage.getItem('cartIdDyson');
}
