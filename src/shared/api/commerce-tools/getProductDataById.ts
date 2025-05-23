import { commercetoolsConfig } from './config';
import { openDialog } from '@services/DialogService';

interface EnterData {
  id: string;
  token: string;
}

interface ProductDataResponse {
  id: string;
  version: number;
  masterData: {
    current: {
      categories: [
        {
          id: string;
          typeId: string;
        },
      ];
      description: {
        en: string;
      };
      masterVariant: {
        attributes: [];
        id: number;
        images: [
          {
            dimensions: {
              h: number;
              w: number;
            };
            url: string;
          },
        ];
        prices: [
          {
            value: {
              type: string;
              fractionDigits: number;
              centAmount: number;
              currencyCode: string;
            };
            id: string;
          },
        ];
        sku: string;
      };
      name: {
        en: string;
      };
      slug: {
        en: string;
      };
      variants: [];
      // eslint-disable-next-line @typescript-eslint/no-empty-object-type
      searchKeywords: {};
    };
    hasStagedChanges: false;
    published: true;
    staged: {
      categories: [
        {
          id: string;
          typeId: string;
        },
      ];
      description: {
        en: string;
      };
      masterVariant: {
        attributes: [];
        id: number;
        images: [
          {
            dimensions: {
              h: number;
              w: number;
            };
            url: string;
          },
        ];
        prices: [
          {
            value: {
              type: string;
              fractionDigits: number;
              centAmount: number;
              currencyCode: string;
            };
            id: string;
          },
        ];
        sku: string;
      };
      name: {
        en: string;
      };
      slug: {
        en: string;
      };
      variants: [];
      // eslint-disable-next-line @typescript-eslint/no-empty-object-type
      searchKeywords: {};
    };
  };
  productType: {
    id: string;
    typeId: string;
  };
  taxCategory: {
    id: string;
    typeId: string;
  };
  createdAt: string;
  lastModifiedAt: string;
}

export async function getProductDataById(
  data: EnterData
): Promise<ProductDataResponse | null> {
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
      throw new Error(`Get product failed: ${errorMessage}`);
    }

    const result: ProductDataResponse = await response.json();
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
