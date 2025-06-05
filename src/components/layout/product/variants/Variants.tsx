import styles from './Variants.module.scss';

interface Variant {
  iconUrl: string;
  name: string;
}

interface VariantsProps {
  variants: Variant[];
}

export const Variants = ({ variants }: VariantsProps) => {
  return (
    <div className={styles.container}>
      {variants.map((variant, index) => (
        <div key={`${variant}${index}`} className={styles.variant}>
          <img src={variant.iconUrl} alt={`Variant ${index + 1}`} />
          <span>{variant.name}</span>
        </div>
      ))}
    </div>
  );
};
