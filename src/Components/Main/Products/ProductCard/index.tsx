import { ProductImage } from "@/Components/Common/Icons/ProductImage";
import styles from "./index.module.css";
import typo from "@/styles/text.module.css";
import { Text } from "@mantine/core";
import { useRouter } from "next/router";
import { ProductProps } from "@/types";
import { formatPrice, formatSoldQuantity } from "@/utils/string";

type ProductCardProps = {
  product?: ProductProps;
};

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const onClick = () => {
    router.push("/main/products/detail?id=" + product?.id);
  };

  return (
    <div className={styles.container} onClick={onClick}>
      <ProductImage src={product?.avatar} width={182} height={86} />

      <Text className={`${typo.size_16_600} ${styles.name}`}>{product?.name}</Text>

      <div className={styles.expand}>
        <Text className={`${typo.size_14_600} ${styles.price}`}>{formatPrice(product?.price)}</Text>
        <Text className={`${typo.size_14_300} ${styles.sell}`}>{formatSoldQuantity(product?.soldQuantity)}</Text>
      </div>
    </div>
  );
}
