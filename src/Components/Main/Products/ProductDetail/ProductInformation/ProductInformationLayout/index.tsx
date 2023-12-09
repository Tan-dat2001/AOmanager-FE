import { Text } from "@mantine/core";
import styles from "./index.module.css";
import typo from "@/styles/text.module.css";

type ProductInformationLayoutProps = {
  title: string;
  content?: string | number;
};

export function ProductInformationLayout({ title, content }: ProductInformationLayoutProps) {
  return (
    <div className={styles.container}>
      <Text className={typo.size_14_600}>{title}</Text>
      <Text className={`${typo.size_14_300} ${styles.content}`}>{content}</Text>
    </div>
  );
}
