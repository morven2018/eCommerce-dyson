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

export interface Attributes {
  name: string | undefined;
  value: string | undefined;
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
    attributes: Attributes[];
  };
}

export interface FacetRange {
  type: string;
  from: number;
  fromStr: string;
  to: number;
  toStr: string;
  count: number;
  totalCount: number;
  total: number;
  min: number;
  max: number;
  mean: number;
}

export interface FacetTerm {
  term: string;
  count: number;
}

export interface TermFacet {
  type: 'terms';
  dataType: 'text' | 'string' | 'boolean' | 'number';
  terms: FacetTerm[];
  missing?: number;
  total?: number;
  other?: number;
}

export interface RangeFacet {
  type: 'range';
  dataType: string;
  ranges: FacetRange[];
}

export type FacetField = TermFacet | RangeFacet;

export interface Facet {
  [key: string]: FacetField;
}

export interface ProductsByCategory {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: CardInfo[];
  facets: Facet;
}

export interface ProductsData {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: ProductData[];
}

interface PriceValue {
  centAmount: number;
  currencyCode: string;
  fractionDigits: number;
  type: string;
}

export interface CartLineItem {
  id: string;
  name: {
    'en-US': string;
  };
  price: {
    value: PriceValue;
    discounted?: {
      value: PriceValue;
    };
  };
  productId: string;
  productKey: string;
  totalPrice: {
    centAmount: number;
    currencyCode: string;
    fractionDigits: number;
    type: string;
  };
  variant: {
    id: number;
    key: string;
    images: {
      url: string;
      label: string;
    }[];
  };
  quantity: number;
}

interface TotalPrice {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

export interface CartData {
  cartState: string;
  id: string;
  lineItems: CartLineItem[];
  totalPrice: TotalPrice;
  version: number;
}
