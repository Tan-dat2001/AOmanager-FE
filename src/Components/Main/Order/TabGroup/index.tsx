import { Button, Text } from "@mantine/core";
import typo from "@/styles/text.module.css";
import styles from "./index.module.css";
import { MasterProps } from "@/types";

type TabGroupProps = {
  listOrderStatus?: MasterProps[];
  currentTab: string;
  onTabClick: (tabKey: string) => void;
};

export function TabGroup({ listOrderStatus, currentTab, onTabClick }: TabGroupProps) {
  return (
    <div className={styles.container}>
      {listOrderStatus?.map((e, i) => {
        return (
          <Button
            key={i}
            onClick={() => onTabClick(e.id ?? "")}
            radius="0"
            className={currentTab === e.id ? styles.greenButton : styles.grayButton}
          >
            <Text className={`${typo.size_14_600} ${currentTab === e.id ? styles.isChoseText : ""}`}>{e.name}</Text>
          </Button>
        );
      })}
    </div>
  );
}
