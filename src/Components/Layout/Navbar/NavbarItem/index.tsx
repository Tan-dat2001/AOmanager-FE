import Link from "next/link";
import { MouseEvent } from "react";
import styles from "./index.module.css";
import { Text } from "@mantine/core";
import typo from "@/styles/text.module.css";
import { IconMenu } from "@/Components/Common/Icons/IconMenu";

type NavbarItemProps = {
  activeItem: number;
  item: {
    id: number;
    label: string;
    address: string;
    link?: string;
    icon?: string;
    activeIcon?: string;
  };
  onClick: (event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => void;
};

export function NavbarItem({ activeItem, item, onClick }: NavbarItemProps) {
  return (
    <Link className={styles.container} href={item.link ?? item.address} onClick={onClick}>
      {item.icon && <IconMenu iconName={item.id !== activeItem ? item.icon : item.activeIcon ?? ""} />}

      <Text
        className={`${typo.size_16_600} ${styles.label}`}
        style={{
          color: item.id !== activeItem ? "var(--text-primary)" : "#6E701F",
        }}
      >
        {item.label}
      </Text>
    </Link>
  );
}
