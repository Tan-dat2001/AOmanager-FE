import { Button, Select, Text } from "@mantine/core";
import typo from "@/styles/text.module.css";
import styles from "./index.module.css";
import { MasterProps } from "@/types";
import { sortProduct } from "@/config/sortProduct";

type TabGroupProps = {
  listCategory?: MasterProps[];
  currentTab: string;
  onTabClick: (tabKey: string) => void;
  sort: string;
  onChangeSort: (value: string | null) => void;
};

export function TabGroup({ listCategory, currentTab, onTabClick, sort, onChangeSort }: TabGroupProps) {
  return (
    <div className={styles.container}>
      <Button
        onClick={() => onTabClick("all")}
        radius="0"
        className={currentTab === "all" ? styles.greenButton : styles.grayButton}
      >
        <Text className={`${typo.size_14_600} ${currentTab === "all" ? styles.isChoseText : ""}`}>ALL</Text>
      </Button>
      {listCategory?.map((e, i) => {
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

      <Select
        placeholder="Sort by price"
        value={sort}
        onChange={onChangeSort}
        data={sortProduct.map((e) => e.name)}
        allowDeselect
      />
    </div>
  );
}
