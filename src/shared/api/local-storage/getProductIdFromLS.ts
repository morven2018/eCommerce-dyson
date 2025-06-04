export function getProductIdFromLS(): string | null {
  return localStorage.getItem('dysonProductId');
}
