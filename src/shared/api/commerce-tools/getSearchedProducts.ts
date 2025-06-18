import { commercetoolsConfig } from './config';
import { handleCatchError } from '@components/ui/error/catchError';
import { ProductsByCategory } from '@shared/types/types';
import { getAnonymousSessionToken } from './getAnonymousSessionToken';

interface EnterData {
  params: string | null;
  token: string | null;
}

export async function getSearchedProducts(
  data: EnterData
): Promise<ProductsByCategory | null> {
  const apiUrl = commercetoolsConfig.apiUrl;
  const projectKey = commercetoolsConfig.projectKey;
  const url = `${apiUrl}/${projectKey}/product-projections/search?${data.params}`;

  try {
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${data.token}`,
      },
    });

    if (!response.ok) {
      if (localStorage.getItem('authDysonToken')) localStorage.clear();
      const token = await getAnonymousSessionToken();

      if (!token)
        response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${token}`,
          },
        });
    }

    const result: ProductsByCategory = await response.json();

    return result;
  } catch (error) {
    handleCatchError(error, 'Error retrieving products data');
    return null;
  }
}
