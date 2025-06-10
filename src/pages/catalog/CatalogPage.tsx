import styles from './CatalogPage.module.scss';
import { useState, useEffect } from 'react';
import { ProductsByCategory, CardInfo } from '@shared/types/types';
import { getTokenFromLS } from '@shared/api/local-storage/getTokenFromLS';
import { getSearchedProducts } from '@shared/api/commerce-tools/getSearchedProducts';
import { openDialog } from '@services/DialogService';

import { Card } from '@components/ui/cards/Card';
import { SortByComponent } from '@components/ui/sort/SortByComponent';
import { TextField, FormControlLabel, Switch } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { PriceRangeSlider } from '@components/ui/sort/range-slider/PriceRangeSlider';
import { ColorRange } from '@components/ui/sort/color-range/ColorRange';
import { Breadcrumbs } from '@components/ui/breadcrumbs/Breadcrumbs';
import { buildSearchParams } from '@shared/utlis/searchParamsBuilder';

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
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [discount, setDiscount] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const storedList = localStorage.getItem('listProductsIdInCart');
  const listProductIdInCart: string[] = storedList
    ? JSON.parse(storedList)
    : [];

  const breadcrumbItems = [
    { path: '/', name: 'Home' },
    { path: '/catalog', name: 'Catalog' },
  ];

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      const fetchProductsData = async () => {
        const token = getTokenFromLS();
        if (!token) return;

        try {
          const params = buildSearchParams({
            searchText,
            sortOption,
            priceRange,
            discount,
            selectedColors,
          });
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
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText, sortOption, priceRange, discount, selectedColors]);

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

  const toggleDiscount = () => {
    setDiscount(!discount);
  };

  const handleClearFilter = () => {
    setSearchText('');
    setPriceRange([0, 0]);
    setDiscount(false);
    setSelectedColors([]);
  };

  const allColors = productsData.results.flatMap((product) => {
    if (product.masterVariant) {
      return product.masterVariant.attributes
        .map((attribute) => attribute.value)
        .flat(5);
    }
  });

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
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

          <FormControlLabel
            control={
              <Switch
                checked={discount}
                onChange={toggleDiscount}
                sx={{
                  '& .Mui-checked .MuiSwitch-thumb': {
                    color: '#595079',
                  },
                  '.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#595079',
                  },
                }}
              />
            }
            label="Only with discount"
            sx={{
              '.MuiFormControlLabel-label': {
                fontSize: '14px',
                fontWeight: '500',
                color: '#595079',
              },
            }}
          />

          <ColorRange
            colors={
              [
                ...new Set(allColors?.filter((color) => color !== undefined)),
              ].sort((a, b) => a.localeCompare(b)) ?? []
            }
            selectedColors={selectedColors}
            onChange={(colors) => setSelectedColors(colors)}
          />

          <PriceRangeSlider
            min={
              productsData.results.length
                ? Math.min(
                    ...productsData.results.map(
                      (el) =>
                        (el.masterVariant?.prices.at(0)?.value.centAmount ??
                          0) / 100
                    )
                  )
                : 0
            }
            max={
              productsData.results.length
                ? Math.max(
                    ...productsData.results.map(
                      (el) =>
                        (el.masterVariant?.prices.at(0)?.value.centAmount ??
                          0) / 100
                    )
                  )
                : 0
            }
            onChange={handlePriceChange}
          />
          <button className={styles.button} onClick={handleClearFilter}>
            Clear Filters
          </button>
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
                price={card.masterVariant?.prices.at(0)?.value?.centAmount ?? 0}
                discountedPrice={
                  card.masterVariant?.prices?.[0]?.discounted?.value
                    ?.centAmount ?? null
                }
                src={card.masterVariant?.images?.[0]?.url ?? '/dyson_icon.svg'}
                isInCart={listProductIdInCart.includes(card.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
