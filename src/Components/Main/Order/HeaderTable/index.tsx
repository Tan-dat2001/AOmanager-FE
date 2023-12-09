import { Text } from "@mantine/core";
import styles from "./index.module.css";
import typo from "@/styles/text.module.css";

export function HeaderTable() {
  return (
    <div className={styles.container}>
      <Text className={`${typo.size_14_600} ${styles.text}`}>Order ID</Text>
      <Text className={`${typo.size_14_600} ${styles.text}`}>Customer</Text>
      <Text className={`${typo.size_14_600} ${styles.text}`}>Order Date</Text>
      <div />
      <div />
    </div>
  );
}
