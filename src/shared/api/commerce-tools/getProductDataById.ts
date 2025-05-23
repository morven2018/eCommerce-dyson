import { commercetoolsConfig } from './config';
import { openDialog } from '@services/DialogService';
import { ProductData } from '@shared/types/types';

interface EnterData {
  id: string;
  token: string | null;
}

export async function getProductDataById(
  data: EnterData
): Promise<ProductData | null> {
  const apiUrl = commercetoolsConfig.apiUrl;
  const projectKey = commercetoolsConfig.projectKey;
  const url = `${apiUrl}/${projectKey}/products/${data.id}`;

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
      throw new Error(`Request failed while fetching product: ${errorMessage}`);
    }

    const result: ProductData = await response.json();
    return result;
  } catch (error) {
    let message = 'Error retrieving product data';

    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    }

    openDialog(message);

    return null;
  }
}
