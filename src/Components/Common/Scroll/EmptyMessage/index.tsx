import { Text } from "@mantine/core";
import typo from "@/styles/text.module.css";
import styles from "./index.module.css";

type EmptyMessageProps = {
  message?: string;
};

export function EmptyMessage({ message }: EmptyMessageProps) {
  return <Text className={`${typo.size_12_600} ${styles.message}`}>{message}</Text>;
}
