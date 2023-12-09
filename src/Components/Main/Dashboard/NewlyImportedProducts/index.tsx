import { Carousel } from "@mantine/carousel";
import { ProductCard } from "../../Products/ProductCard";
import styles from "./index.module.css";
import { Text } from "@mantine/core";
import typo from "@/styles/text.module.css";
import { getNewProducts } from "@/services/product";
import useSWR from "swr";
import { Loader } from "@/Components/Common/Loader";

const key = "NEW_PRODUCTS";

export function NewlyImportedProducts() {
  const { data, isLoading } = useSWR(key, () => getNewProducts());

  return (
    <>
      <Text className={`${typo.size_20_600} ${styles.title}`}>Just imported</Text>

      {isLoading && <Loader />}

      <Carousel slideSize="sx" slideGap="xs" loop align="start" controlSize={20} className={styles.carousel}>
        {(data || []).map((e, i) => (
          <Carousel.Slide key={i}>
            <ProductCard product={e} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
}
