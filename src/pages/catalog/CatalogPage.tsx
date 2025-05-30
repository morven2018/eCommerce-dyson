import styles from './CatalogPage.module.scss';
import { useState, useEffect } from 'react';
import { ProductsByCategory, CardInfo } from '@shared/types/types';
import { getTokenFromLS } from '@shared/api/local-storage/getTokenFromLS';
import { getSearchedProducts } from '@shared/api/commerce-tools/getSearchedProducts';
import { openDialog } from '@services/DialogService';

import { Card } from '@components/ui/cards/Card';
import { SortByComponent } from '@components/ui/sort/SortByComponent';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { PriceRangeSlider } from '@components/ui/sort/range-slider/PriceRangeSlider';

export type SortOption =
  | 'price_asc'
  | 'price_desc'
  | 'name_asc'
  | 'name_desc'
  | 'normal';

export const CatalogPage = () => {
  const [productsData, setProductsData] = useState<ProductsByCategory | null>(
    null
  );
  const [sortOption, setSortOption] = useState<SortOption>('normal');
  const [searchText, setSearchText] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    const fetchProductsData = async () => {
      const token = getTokenFromLS();
      if (!token) return;

      let params = '';

      const text = encodeURIComponent(searchText.trim());

      let fuzzyLevel = 2;
      const searchTextLength = text.length;

      if (searchTextLength <= 2) {
        fuzzyLevel = 0;
      } else if (searchTextLength <= 5) {
        fuzzyLevel = 1;
      } else {
        fuzzyLevel = 2;
      }

      if (searchText.length > 1) {
        params += `text.en-US=*${searchText}*&fuzzy=true&fuzzyLevel=${fuzzyLevel}`;
      }
      if (params.length > 0) {
        params += '&';
      }
      if (sortOption === 'name_asc') {
        params += 'sort=name.en-US+asc';
      }
      if (sortOption === 'name_desc') {
        params += 'sort=name.en-US+desc';
      }
      if (sortOption === 'price_asc') {
        params += 'sort=price+asc';
      }
      if (sortOption === 'price_desc') {
        params += 'sort=price+desc';
      }

      const [min, max] = priceRange;
      if (min >= 0 && max > 0 && min < max) {
        // не работает, пробовал разные запросы, ответ всегда 200 но фильтра по цене нет !!!
        params += `&variants.prices.centAmount=centAmount+ge+${min * 100}+and+centAmount+le+${max * 100}`;
      }

      params += 'limit=50';

      try {
        const data = await getSearchedProducts({ params, token });
        setProductsData(data);
      } catch (error) {
        let message = 'Error fetching search products';
        if (error instanceof Error) message = error.message;
        else if (typeof error === 'string') message = error;
        openDialog(message);
      }
    };

    fetchProductsData();
  }, [searchText, sortOption]); // priceRange - убрал из зависимостей

  if (!productsData) {
    return <div className={styles.textLoading}>Loading...</div>;
  }

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handlePriceChange = (newValues: [number, number]) => {
    setPriceRange(newValues);
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>
        <TextField
          label="Search.."
          variant="outlined"
          value={searchText}
          onChange={handleSearchChange}
          size="small"
          slotProps={{
            input: {
              endAdornment: <SearchIcon />,
            },
          }}
          sx={{ width: '100%' }}
        />

        <PriceRangeSlider min={0} max={1000} onChange={handlePriceChange} />
      </div>
      <div className={styles.sortAndCardsContainer}>
        <SortByComponent
          sortOption={sortOption}
          onSortChange={handleSortChange}
        />
        <div className={styles.cardsContainer}>
          {productsData.results.map((card: CardInfo) => (
            <Card
              key={card.id}
              id={card.id}
              name={card.name['en-US']}
              description={card.description['en-US'] ?? 'Product description'}
              price={card.masterVariant?.prices?.[0]?.value?.centAmount ?? 0}
              discountedPrice={
                card.masterVariant?.prices?.[0]?.discounted?.value
                  ?.centAmount ?? null
              }
              src={card.masterVariant?.images?.[0]?.url ?? '/dyson_icon.svg'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
