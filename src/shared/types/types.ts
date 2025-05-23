interface ProductDescription {
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
}

export interface ProductData {
  id: string;
  version: number;
  masterData: {
    current: ProductDescription;
    hasStagedChanges: false;
    published: true;
    staged: ProductDescription;
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
