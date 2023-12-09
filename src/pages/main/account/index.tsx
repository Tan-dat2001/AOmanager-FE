import { Avatar } from "@/Components/Common/Icons/Avatar";
import styles from "./index.module.css";
import { AccountForm } from "@/Components/Main/Account/AccountForm";
import { AccountButton } from "@/Components/Main/Account/AccountButton";
import { getUserById, updateUser } from "@/services";
import useSWR from "swr";
import { useForm } from "@mantine/form";
import { Response, StatusCode, UserProps } from "@/types";
import { useEffect } from "react";
import { Loading } from "@/Components/Common/Loading";
import { showFailNotification, showSuccessNotification } from "@/utils/notifications";
import { useRouter } from "next/router";

const key = "ACCOUNT";

export default function Account() {
  const router = useRouter();
  const { data, isLoading } = useSWR(key, () => getUserById());
  const form = useForm<UserProps>({
    initialValues: {
      id: "",
      avatar: "",
      email: "",
      firstName: "",
      lastName: "",
      birthday: undefined,
      gender: "",
      address: "",
      phone: "",
      status: undefined,
    },
  });

  useEffect(() => {
    !localStorage.getItem("userId") && router.push("/login");
  });

  useEffect(() => {
    const user = data as UserProps;
    if (user?.id) {
      form.setValues(user);
    }
  }, [data]);

  const handleChangeForm = (key: string, value: string | number | boolean | undefined) => {
    form.setFieldValue(key, value);
  };

  const updateUserInformation = async () => {
    const res = (await updateUser(form.values)) as Response<null>;
    if (res.code === StatusCode.Success) {
      showSuccessNotification(res.message);
    } else {
      showFailNotification(res.message);
    }
  };

  return (
    <div className={styles.container}>
      {isLoading && <Loading />}

      <div className={styles.containerCenter}>
        <Avatar src={form.values.avatar} width={295} height={295} className={styles.avatar} />
        <div className={styles.detail}>
          <AccountForm form={form} onChangeForm={handleChangeForm} />
          <AccountButton onUpdateUser={updateUserInformation} />
        </div>
      </div>
    </div>
  );
}

Account.layout = "Menu";
