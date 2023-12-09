import { Carousel } from "@mantine/carousel";
import styles from "./index.module.css";
import { ProductImage } from "@/Components/Common/Icons/ProductImage";
import { Button, NumberInput, Text } from "@mantine/core";
import typo from "@/styles/text.module.css";
import { ProductProps } from "@/types";

type ImageAndCountFormProps = {
  product?: ProductProps;
  count: number;
  onChangeCount: (value: number) => void;
  onAddToCart: () => void;
};

export function ImageAndCountForm({ product, count, onChangeCount, onAddToCart }: ImageAndCountFormProps) {
  return (
    <div className={styles.container}>
      <Carousel slideSize="sx" slideGap="xs" loop align="start" controlSize={20} className={styles.carousel}>
        {product?.imageList?.map((e, i) => <ProductImage key={i} src={e} width={263} height={170} />)}
      </Carousel>

      <div className={styles.count}>
        <Text className={typo.size_14_600}>Quantity</Text>
        <NumberInput
          value={count}
          onChange={(value) => onChangeCount(parseInt(value.toString()))}
          min={1}
          max={product?.inventoryQuantity}
          className={styles.numberInput}
        />
      </div>

      <Button radius={0} className={styles.button} onClick={onAddToCart}>
        <Text className={`${typo.size_14_600} ${styles.textButton}`}>Add to cart</Text>
      </Button>
    </div>
  );
}
