import { Text } from "@mantine/core";
import styles from "./index.module.css";
import typo from "@/styles/text.module.css";

export default function Error404() {
  return (
    <div className={styles.container}>
      <Text className={typo.size_20_600}>This page cannot be accessed!</Text>
    </div>
  );
}
