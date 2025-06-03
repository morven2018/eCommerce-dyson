import styles from './CategoryPage.module.scss';
import { useState, useEffect } from 'react';
import { getProductsByIdCategory } from '@shared/api/commerce-tools/getProductsByIdCategory';
import { getTokenFromLS } from '@shared/api/local-storage/getTokenFromLS';
import { commercetoolsConfig } from '@shared/api/commerce-tools/config';
import { openDialog } from '@services/DialogService';
import { ProductsByCategory, CardInfo } from '@shared/types/types';
import { Card } from '@components/ui/cards/Card';
import { getNameByPath } from '@shared/constants/categories';
import { Breadcrumbs } from '@components/ui/breadcrumbs/Breadcrumbs';

export const CategoryPage = ({ page }: { page: string }) => {
  const [productsData, setProductsData] = useState<ProductsByCategory | null>(
    null
  );

  const path = `/catalog/${page}`;

  const breadcrumbItems = [
    { path: '/', name: 'Home' },
    { path: '/catalog', name: 'Catalog' },
    { path: '', name: getNameByPath(path) },
  ];

  useEffect(() => {
    const fetchProductsData = async () => {
      const token = getTokenFromLS();

      let idCategory = '';
      switch (page) {
        case 'vacuums':
          idCategory = commercetoolsConfig.idCategoryVacuums;
          break;
        case 'hair-care':
          idCategory = commercetoolsConfig.idCategoryHairBeauty;
          break;
        case 'heater':
          idCategory = commercetoolsConfig.idCategoryAirHeaters;
          break;
        case 'headphones':
          idCategory = commercetoolsConfig.idCategoryHeadphones;
          break;
        case 'lighting':
          idCategory = commercetoolsConfig.idCategoryLighting;
          break;
        default:
          idCategory = '';
      }

      if (!idCategory || !token) {
        return;
      }

      try {
        const data = await getProductsByIdCategory({ idCategory, token });
        setProductsData(data);
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
  }, [page]);

  if (!productsData) {
    return <div className={styles.textLoading}>Loading...</div>;
  }

  const arrCardsInfo = productsData.results;

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <div className={styles.container}>
        {arrCardsInfo.map((card: CardInfo) => (
          <Card
            key={card.id}
            id={card.id}
            name={card.name['en-US']}
            description={card.description['en-US']}
            price={card.masterVariant?.prices?.[0]?.value?.centAmount ?? 0}
            discountedPrice={
              card.masterVariant?.prices?.[0]?.discounted?.value?.centAmount ??
              null
            }
            src={card.masterVariant?.images?.[0]?.url ?? '/dyson_icon.svg'}
          />
        ))}
      </div>
    </>
  );
};
