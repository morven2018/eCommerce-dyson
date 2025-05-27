import { commercetoolsConfig } from './config';
import { openDialog } from '@services/DialogService';
import { ProductsByCategory } from '@shared/types/types';

interface EnterData {
  id: string | null;
  token: string | null;
}

export async function getProductsByIdCategory(
  data: EnterData
): Promise<ProductsByCategory | null> {
  const apiUrl = commercetoolsConfig.apiUrl;
  const projectKey = commercetoolsConfig.projectKey;
  const url = `${apiUrl}/${projectKey}/product-projections/search?filter=categories.id:"${data.id}"`;

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
    let message = 'Error retrieving products data';

    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    }

    openDialog(message);

    return null;
  }
}
