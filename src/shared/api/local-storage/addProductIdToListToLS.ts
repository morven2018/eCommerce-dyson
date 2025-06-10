export function addProductIdToListToLS(id: string): void {
  const storedList = localStorage.getItem('listProductsIdInCart');
  const list: string[] = storedList ? JSON.parse(storedList) : [];

  list.push(id);

  localStorage.setItem('listProductsIdInCart', JSON.stringify(list));
}
