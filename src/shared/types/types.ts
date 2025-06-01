export interface ProductImage {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
}

interface ProductPriceValue {
  type: string;
  fractionDigits: number;
  centAmount: number;
  currencyCode: string;
}

interface ProductDiscountedPrice {
  value: ProductPriceValue;
}

interface ProductPrice {
  value: ProductPriceValue;
  discounted?: ProductDiscountedPrice;
  id: string;
}

interface ProductVariantBase {
  id: number;
  sku?: string;
  key?: string;
  images?: ProductImage[];
  prices?: ProductPrice[];
}

interface ProductCategory {
  id: string;
  typeId: string;
}

interface ProductDescription {
  name: {
    'en-US': string;
  };
  description?: {
    'en-US': string;
  };
  slug?: {
    'en-US': string;
  };
  categories?: ProductCategory[];
  masterVariant?: ProductVariantBase;
  variants?: ProductVariantBase[];
  searchKeywords?: Record<string, unknown>;
  metaTitle?: {
    'en-US': string;
  };
  metaDescription?: {
    'en-US': string;
  };
}

export interface ProductData {
  id: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  productType: {
    id: string;
    typeId: string;
  };
  taxCategory: {
    id: string;
    typeId: string;
  };
  masterData: {
    current: ProductDescription;
    staged: ProductDescription;
    hasStagedChanges: boolean;
    published: boolean;
  };
}

export interface CardInfo {
  description: {
    'en-US': string;
  };
  id: string;
  name: {
    'en-US': string;
  };
  masterVariant?: {
    images: ProductImage[];
    prices: ProductPrice[];
  };
}

export interface ProductsByCategory {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: CardInfo[];
}

export interface ProductsData {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: ProductData[];
}
