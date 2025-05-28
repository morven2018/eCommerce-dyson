import styles from './CatalogPage.module.scss';
import { useState, useEffect } from 'react';
import { ProductsData, ProductData } from '@shared/types/types';
import { getTokenFromLS } from '@shared/api/local-storage/getTokenFromLS';
import { getProducts } from '@shared/api/commerce-tools/getProducts';
import { openDialog } from '@services/DialogService';

import { Card } from '@components/ui/cards/Card';
import { SortByComponent } from '@components/ui/sort/SortByComponent';

export type SortOption =
  | 'price_asc'
  | 'price_desc'
  | 'name_asc'
  | 'name_desc'
  | 'normal';

export const CatalogPage = () => {
  const [productsData, setProductsData] = useState<ProductsData | null>(null);
  const [baseProductsData, setBaseProductsData] = useState<ProductData[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('normal');

  const sortProducts = (
    products: ProductData[],
    option: SortOption
  ): ProductData[] => {
    switch (option) {
      case 'price_asc':
        return [...products].sort((a, b) => {
          const priceA =
            a.masterData.current.masterVariant?.prices?.[0]?.value
              ?.centAmount ?? 0;
          const priceB =
            b.masterData.current.masterVariant?.prices?.[0]?.value
              ?.centAmount ?? 0;

          return priceA > priceB ? 1 : -1;
        });
      case 'price_desc':
        return [...products].sort((a, b) => {
          const priceA =
            a.masterData.current.masterVariant?.prices?.[0]?.value
              ?.centAmount ?? 0;
          const priceB =
            b.masterData.current.masterVariant?.prices?.[0]?.value
              ?.centAmount ?? 0;

          return priceA < priceB ? 1 : -1;
        });
      case 'name_asc':
        return [...products].sort((a, b) =>
          a.masterData.current.name['en-US'] >
          b.masterData.current.name['en-US']
            ? 1
            : -1
        );
      case 'name_desc':
        return [...products].sort((a, b) =>
          a.masterData.current.name['en-US'] <
          b.masterData.current.name['en-US']
            ? 1
            : -1
        );
      case 'normal':
        return baseProductsData;

      default:
        return products;
    }
  };

  useEffect(() => {
    const fetchProductsData = async () => {
      const token = getTokenFromLS();
      const params = null;

      if (!token) {
        return;
      }

      try {
        const data = await getProducts({ params, token });
        setProductsData(data);
        setBaseProductsData(data?.results ?? []);
      } catch (error) {
        let message = 'Error get products category by ID';

        if (error instanceof Error) {
          message = error.message;
        } else if (typeof error === 'string') {
          message = error;
        }

        openDialog(message);
      }
    };

    fetchProductsData();
  }, []);

  if (!productsData || !baseProductsData.length) {
    return <div className={styles.textLoading}>Loading...</div>;
  }

  const sortedProducts = sortProducts(baseProductsData, sortOption);

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sortAndCardsContainer}>
        <SortByComponent
          sortOption={sortOption}
          onSortChange={handleSortChange}
        />
        <div className={styles.cardsContainer}>
          {sortedProducts.map((card: ProductData) => (
            <Card
              key={card.id}
              id={card.id}
              name={card.masterData.current.name['en-US']}
              description={
                card.masterData.current.description?.['en-US'] ??
                'Product description'
              }
              price={
                card.masterData.current.masterVariant?.prices?.[0]?.value
                  ?.centAmount ?? 0
              }
              discountedPrice={
                card.masterData.current.masterVariant?.prices?.[0]?.discounted
                  ?.value?.centAmount ?? null
              }
              src={
                card.masterData.current.masterVariant?.images?.[0]?.url ??
                '/dyson_icon.svg'
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};
