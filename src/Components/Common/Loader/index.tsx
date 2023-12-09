import { Center, Loader as LoaderMantine } from "@mantine/core";
import styles from "./index.module.css";
import { CSSProperties } from "react";

type LoaderProps = {
  style?: CSSProperties;
  className?: string;
};

export function Loader({ style, className }: LoaderProps) {
  return (
    <Center className={`${styles.container} ${className}`} style={{ ...(style || {}) }}>
      <LoaderMantine />
    </Center>
  );
}
