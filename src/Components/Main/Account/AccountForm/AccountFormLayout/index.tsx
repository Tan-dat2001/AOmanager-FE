import { ReactNode } from "react";
import typo from "@/styles/text.module.css";
import styles from "./index.module.css";
import { Text } from "@mantine/core";

type AccountFormLayoutProps = {
  title: string;
  children: ReactNode;
};

export function AccountFormLayout({ title, children }: AccountFormLayoutProps) {
  return (
    <div className={styles.container}>
      <Text className={typo.size_14_600}>{title}</Text>
      {children}
    </div>
  );
}
