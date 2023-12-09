import { Text } from "@mantine/core";
import styles from "./index.module.css";
import typo from "@/styles/text.module.css";

export function HeaderTable() {
  return (
    <div className={styles.container}>
      <Text className={`${typo.size_14_600} ${styles.text}`}>Image</Text>
      <Text className={`${typo.size_14_600} ${styles.text}`}>Name</Text>
      <Text className={`${typo.size_14_600} ${styles.text}`}>Quantity</Text>
      <Text className={`${typo.size_14_600} ${styles.text}`}>Unit price</Text>
      <Text className={`${typo.size_14_600} ${styles.text}`}>Total</Text>
      <div />
    </div>
  );
}
