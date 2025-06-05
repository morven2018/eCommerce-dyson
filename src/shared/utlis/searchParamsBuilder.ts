import { SortOption } from '@pages/catalog/CatalogPage';

function determineFuzzyLevel(length: number) {
  if (length <= 2) return 0;
  if (length <= 5) return 1;
  return 2;
}

const addSearchQuery = (paramsArray: string[], searchText: string) => {
  const fuzzyLevel = determineFuzzyLevel(searchText.length);

  if (searchText.length > 1) {
    paramsArray.push(
      `text.en-US=*${searchText}*&fuzzy=true&fuzzyLevel=${fuzzyLevel}`
    );
  }
};

const addSortQuery = (paramsArray: string[], sortOption: SortOption) => {
  const sortMap: Record<SortOption, string> = {
    normal: '',
    name_asc: 'sort=name.en-US+asc',
    name_desc: 'sort=name.en-US+desc',
    price_asc: 'sort=price+asc',
    price_desc: 'sort=price+desc',
  };

  const sortParam = sortMap[sortOption];
  if (sortParam) paramsArray.push(sortParam);
};

const addPriceFilter = (paramsArray: string[], priceRange: number[]) => {
  const [min, max] = priceRange;

  const isValidPriceRange =
    (min > 0 && max === 1000) ||
    (min >= 0 && max < 1000) ||
    (min > 0 && max < 1000);

  if (isValidPriceRange) {
    paramsArray.push(
      `filter.query=variants.price.centAmount: range(${min * 100} to ${max ? max * 100 : '*'})`
    );
  }
};

const addDiscountFilter = (paramsArray: string[], discount: boolean) => {
  if (discount) {
    paramsArray.push('filter.query=variants.prices.discounted:exists');
  }
};

const addColorFilter = (paramsArray: string[], selectedColors: string[]) => {
  if (selectedColors.length > 0) {
    const colorFilter = selectedColors.map((color) => `"${color}"`).join(',');
    paramsArray.push(`filter.query=variants.attributes.color:${colorFilter}`);
  }
};

export const buildSearchParams = ({
  searchText,
  sortOption,
  priceRange,
  discount,
  selectedColors,
}: {
  searchText: string;
  sortOption: SortOption;
  priceRange: number[];
  discount: boolean;
  selectedColors: string[];
}) => {
  const paramsArray: string[] = [];

  addSearchQuery(paramsArray, searchText);
  addSortQuery(paramsArray, sortOption);
  addPriceFilter(paramsArray, priceRange);
  addDiscountFilter(paramsArray, discount);
  addColorFilter(paramsArray, selectedColors);

  paramsArray.push('limit=50');
  return paramsArray.join('&');
};
