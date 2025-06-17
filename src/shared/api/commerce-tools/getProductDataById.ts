import { commercetoolsConfig } from './config';
import { handleCatchError } from '@components/ui/error/catchError';
import { ProductData } from '@shared/types/types';
import { getAnonymousSessionToken } from './getAnonymousSessionToken';

interface EnterData {
  id: string | null;
  token: string | null;
}

export async function getProductDataById(
  data: EnterData
): Promise<ProductData | null> {
  const apiUrl = commercetoolsConfig.apiUrl;
  const projectKey = commercetoolsConfig.projectKey;
  const url = `${apiUrl}/${projectKey}/products/${data.id}`;

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
            Authorization: `Bearer ${data.token}`,
          },
        });
    }

    const result: ProductData = await response.json();
    return result;
  } catch (error) {
    handleCatchError(error, 'Error retrieving product data');
    return null;
  }
}
