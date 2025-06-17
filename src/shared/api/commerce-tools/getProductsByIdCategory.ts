import { commercetoolsConfig } from './config';
import { handleCatchError } from '@components/ui/error/catchError';
import { ProductsByCategory } from '@shared/types/types';
import { getAnonymousSessionToken } from './getAnonymousSessionToken';

interface EnterData {
  idCategory: string | null;
  token: string | null;
  offset: number;
}

export async function getProductsByIdCategory(
  data: EnterData
): Promise<ProductsByCategory | null> {
  const apiUrl = commercetoolsConfig.apiUrl;
  const projectKey = commercetoolsConfig.projectKey;
  const limit = 4;
  const url = `${apiUrl}/${projectKey}/product-projections/search?filter=categories.id:"${data.idCategory}"&limit=${limit}&offset=${data.offset}`;

  try {
    let response = await makeResponse(url, data.token);
    if (!response.ok) {
      if (localStorage.getItem('authDysonToken')) localStorage.clear();
      const token = await getAnonymousSessionToken();

      if (!token) response = await makeResponse(url, token);
    }

    const result: ProductsByCategory = await response.json();
    return result;
  } catch (error) {
    handleCatchError(error, 'Error retrieving products data');
    return null;
  }
}

async function makeResponse(
  url: string,
  token: string | null
): Promise<Response> {
  return await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`,
    },
  });
}
