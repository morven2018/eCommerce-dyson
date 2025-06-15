import { commercetoolsConfig } from './config';
import { handleCatchError } from '@components/ui/error/catchError';
import { ProductsByCategory } from '@shared/types/types';

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
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${data.token}`,
      },
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      const errorMessage = errorDetails.message;
      throw new Error(
        `Request failed while fetching products: ${errorMessage}`
      );
    }

    const result: ProductsByCategory = await response.json();
    return result;
  } catch (error) {
    handleCatchError(error, 'Error retrieving products data');
    return null;
  }
}
