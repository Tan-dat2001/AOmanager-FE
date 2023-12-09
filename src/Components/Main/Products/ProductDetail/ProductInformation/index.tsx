import { Text } from "@mantine/core";
import styles from "./index.module.css";
import typo from "@/styles/text.module.css";
import { ProductInformationLayout } from "./ProductInformationLayout";
import { ProductProps } from "@/types";
import { formatInventoryQuantity, formatPrice, formatSoldQuantity } from "@/utils/string";

type ProductInformationProps = {
  product?: ProductProps;
};

export function ProductInformation({ product }: ProductInformationProps) {
  const list = [
    {
      title: "Description",
      content: product?.description,
    },
    {
      title: "Suitable temperature",
      content: product?.temperature,
    },
    {
      title: "Habitat",
      content: product?.habitat,
    },
    {
      title: "Food type",
      content: product?.foodType,
    },
    {
      title: "Position",
      content: product?.position,
    },
    {
      title: "Max size",
      content: product?.maxSize,
    },
    {
      title: "PH",
      content: product?.ph,
    },
    {
      title: "Reproduction method",
      content: product?.reproductionMethod,
    },
  ];

  return (
    <div className={styles.container}>
      <Text className={`${typo.size_24_600} ${styles.name}`}>{product?.name}</Text>
      <Text className={`${typo.size_18_600} ${styles.price}`}>{formatPrice(product?.price)}</Text>
      <Text className={`${typo.size_16_300} ${styles.count}`}>{formatSoldQuantity(product?.soldQuantity)}</Text>
      <Text className={`${typo.size_16_300} ${styles.count2}`}>
        {formatInventoryQuantity(product?.inventoryQuantity)}
      </Text>

      {list.map(
        (e, i) =>
          e.content !== undefined &&
          e.content !== null &&
          e.content !== "" && <ProductInformationLayout key={i} title={e.title} content={e.content} />,
      )}
    </div>
  );
}
