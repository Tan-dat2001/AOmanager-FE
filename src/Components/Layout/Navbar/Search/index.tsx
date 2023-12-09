import { IconSearchGray } from "@/Components/Common/Icons/IconSearchGray";
import { Button, Text, TextInput } from "@mantine/core";
import { useState } from "react";
import styles from "./index.module.css";
import typo from "@/styles/text.module.css";
import { useRouter } from "next/router";

export function Search() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  return (
    <>
      <TextInput
        value={value}
        placeholder="Search..."
        onChange={onChange}
        radius={4}
        rightSection={<IconSearchGray />}
        className={styles.textInput}
      />
      <Button className={styles.button} onClick={() => router.push("/main/products?tab=all&keyword=" + value)}>
        <Text className={`${typo.size_14_600} ${styles.textButton}`}>Search</Text>
      </Button>
    </>
  );
}
