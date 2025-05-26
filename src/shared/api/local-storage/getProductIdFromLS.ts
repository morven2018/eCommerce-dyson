export function getProductIdFromLS(): string | null {
  const idName = 'dysonProductId';
  const id: string | null = localStorage.getItem(idName);
  if (id === null) return null;

  if (typeof id === 'string') {
    return id;
  }

  return null;
}
