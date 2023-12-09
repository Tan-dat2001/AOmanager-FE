import { Text } from "@mantine/core";
import { ReactNode } from "react";
import styles from "./index.module.css";
import typo from "@/styles/text.module.css";

type LayoutProps = {
  title: string;
  required?: boolean;
  children: ReactNode;
};

export function Layout({ title, required = true, children }: LayoutProps) {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Text className={`${typo.size_14_600} ${styles.title}`}>{title}</Text>
        {required && <Text className={`${typo.size_14_600} ${styles.required}`}>*</Text>}
      </div>

      {children}
    </div>
  );
}
