import { Button, Text } from "@mantine/core";
import styles from "./index.module.css";
import typo from "@/styles/text.module.css";
import { formatPrice } from "@/utils/string";
import { useRouter } from "next/router";

type CartFooterProps = {
  total?: number;
  isShowButton?: boolean;
};

export function CartFooter({ total, isShowButton = true }: CartFooterProps) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Text className={`${typo.size_14_300} ${styles.total}`}>Total: </Text>
      <Text className={`${typo.size_24_600} ${styles.money}`}>{formatPrice(total)}</Text>

      {isShowButton && (
        <Button
          className={styles.button}
          radius={0}
          onClick={() => ((total || 0) > 0 ? router.push("/main/cart/order") : null)}
        >
          <Text className={`${typo.size_14_600} ${styles.textButton}`}>Buy Now</Text>
        </Button>
      )}
    </div>
  );
}
