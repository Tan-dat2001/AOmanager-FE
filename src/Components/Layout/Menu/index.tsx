import { ReactNode } from "react";
import { Navbar } from "../Navbar";
import styles from "./index.module.css";
import { ButtonUp } from "@/Components/Common/ButtonUp";

type MenuProps = {
  children: ReactNode;
};

export function Menu({ children }: MenuProps) {
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Navbar />
      </div>

      <div className={styles.content}>{children}</div>

      <ButtonUp />
    </div>
  );
}
