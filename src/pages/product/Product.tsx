import styles from './Product.module.scss';
import { useState, useEffect } from 'react';
import { getProductDataById } from '@shared/api/commerce-tools/getProductDataById';
import { getTokenFromLS } from '@shared/api/local-storage/getTokenFromLS';
import ProductTitle from '@components/layout/product/title/ProductTitle';
import { ButtonBack } from '@components/ui/buttons/ButtonBack';
import ProductCard from '@components/layout/product/card/ProductCard';
import { Slider } from '@components/layout/product/slider/Slider';
import { ProductData, ProductImage } from '@shared/types/types';
import Benefits from '@components/layout/product/benefits/Benefits';
import { openDialog } from '@services/DialogService';
import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '@components/ui/breadcrumbs/breadcrumbs';

export const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [productData, setProductData] = useState<ProductData | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      const token = getTokenFromLS();

      if (!token || !productId) {
        return;
      }

      try {
        const data = await getProductDataById({ id: productId, token });
        setProductData(data);
      } catch (error) {
        let message = 'Error get product by ID';

        if (error instanceof Error) {
          message = error.message;
        } else if (typeof error === 'string') {
          message = error;
        }

        openDialog(message, true);
      }
    };

    fetchProductData();
  }, [productId]);

  if (!productData) {
    return <div className={styles.textLoading}>Loading...</div>;
  }

  const currentPath = productData.masterData.current;

  const name = currentPath.name?.['en-US'] || 'Product name';
  const categorySlug = 'hair-care';

  const breadcrumbItems = [
    { path: '/', name: 'Home' },
    { path: '/catalog', name: 'Catalog' },
    { path: `/catalog/${categorySlug}`, name: 'Hair Care' }, // Динамически можно получить название категории
    { path: '', name: name }, // Текущая страница (без ссылки)
  ];

  const price = currentPath.masterVariant?.prices?.[0]?.value?.centAmount
    ? currentPath.masterVariant.prices[0].value.centAmount / 100
    : 0;

  const discountedPrice = currentPath.masterVariant?.prices?.[0]?.discounted
    ?.value?.centAmount
    ? currentPath.masterVariant.prices[0].discounted.value.centAmount / 100
    : null;

  const description =
    currentPath.description?.['en-US'] || 'No description available';

  const sliderImages = currentPath.masterVariant?.images?.map(
    (img: ProductImage) => ({
      src: img.url,
      alt: 'Product image',
    })
  ) || [{ src: 'dyson_icon.svg', alt: 'Default image' }];

  const variantData =
    currentPath.variants?.map((variant) => {
      const imageUrl = variant.images?.[0]?.url || 'dyson_icon.svg';
      const variantName = variant.key || variant.sku || 'Unnamed variant';

      return {
        iconUrl: imageUrl,
        name: variantName,
      };
    }) || [];

  return (
    <>
      <ProductTitle name={name} price={discountedPrice ?? price} />
      <Breadcrumbs items={breadcrumbItems} />
      <div className={styles.container}>
        <ButtonBack />
        <div className={styles.productContainer}>
          <ProductCard
            name={name}
            description={description}
            price={price}
            discountedPrice={discountedPrice}
            variants={variantData}
          />
          <Slider images={sliderImages} />
        </div>
      </div>
      <Benefits />
    </>
  );
};
