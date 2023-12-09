import { Button, Text } from "@mantine/core";
import styles from "./index.module.css";
import typo from "@/styles/text.module.css";
import { useRouter } from "next/router";

type AccountButtonProps = {
  onUpdateUser: () => void;
};

export function AccountButton({ onUpdateUser }: AccountButtonProps) {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Button
        radius="xl"
        className={styles.changePasswordButton}
        onClick={() => router.push("/main/account/change-password")}
      >
        <Text className={`${typo.size_14_600} ${styles.textButton}`}>Change Password</Text>
      </Button>

      <Button onClick={onUpdateUser} radius="xl" className={styles.updateUserButton}>
        <Text className={`${typo.size_14_600} ${styles.textButton}`}>Save Information</Text>
      </Button>
    </div>
  );
}
