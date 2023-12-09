import { Button, PasswordInput, Text } from "@mantine/core";
import styles from "./index.module.css";
import typo from "@/styles/text.module.css";
import { useForm } from "@mantine/form";
import { checkErrorChangePassWord } from "@/utils/error";
import { changePassword } from "@/services/auth";
import { Response, StatusCode } from "@/types";
import { showFailNotification, showSuccessNotification } from "@/utils/notifications";
import { useRouter } from "next/router";

export default function ChangePassword() {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      newPassword2: "",
    },
  });

  const onButtonClick = async () => {
    const error = checkErrorChangePassWord(form.values);
    if (error) {
      typeof error === "object" ? form.setErrors(error) : form.clearErrors();
      return;
    }
    const res = (await changePassword({
      oldPassword: form.values.currentPassword,
      newPassword: form.values.newPassword,
      newPasswordConfirm: form.values.newPassword2,
    })) as Response<null>;
    if (res.code === StatusCode.Success) {
      showSuccessNotification(res.message);
      router.push("/main/account");
    } else {
      showFailNotification(res.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.centerContainer}>
        <Text className={`${typo.size_24_600} ${styles.title}`}>Change Password</Text>

        <PasswordInput
          label="Current Password"
          {...form.getInputProps("currentPassword")}
          className={styles.passwordInput}
        />
        <PasswordInput label="New Password" {...form.getInputProps("newPassword")} className={styles.passwordInput} />
        <PasswordInput
          label="Confirm Password"
          {...form.getInputProps("newPassword2")}
          className={styles.passwordInput}
        />

        <Button radius={0} className={styles.button} onClick={onButtonClick}>
          Change
        </Button>
      </div>
    </div>
  );
}

ChangePassword.layout = "Menu";
