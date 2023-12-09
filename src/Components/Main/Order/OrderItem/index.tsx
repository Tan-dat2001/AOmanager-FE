import { Button, Text } from "@mantine/core";
import styles from "./index.module.css";
import typo from "@/styles/text.module.css";
import { useRouter } from "next/router";
import { OrderProps, Response, StatusCode } from "@/types";
import { ORDER_STATUS_INDEX } from "@/config/constants";
import { cancelOrder } from "@/services/order";
import { showFailNotification, showSuccessNotification } from "@/utils/notifications";
import { formatDate } from "@/utils/date";

type OrderItemProps = {
  order?: OrderProps;
  index: number;
  reload: ({ tabKey }: { tabKey?: string | undefined }) => Promise<void>;
};

export function OrderItem({ order, index, reload }: OrderItemProps) {
  const router = useRouter();

  const onClick = () => {
    router.push("/main/order/detail?id=" + order?.id);
  };

  const cancel = async () => {
    const res = (await cancelOrder(order?.id)) as Response<null>;
    if (res.code === StatusCode.Success) {
      showSuccessNotification(res.message);
      reload({});
    } else {
      showFailNotification(res.message);
    }
  };

  return (
    <div className={styles.container}>
      <Text className={`${typo.size_14_600} ${styles.text}`}>{order?.id}</Text>
      <Text className={`${typo.size_14_600} ${styles.text}`}>{order?.customerName}</Text>
      <Text className={`${typo.size_14_600} ${styles.text}`}>{formatDate(order?.orderDate)}</Text>
      <Button onClick={onClick} radius="xl" className={styles.detailButton}>
        <Text className={`${typo.size_14_600} ${styles.textButton}`}>Detail</Text>
      </Button>

      <Button
        onClick={cancel}
        radius="xl"
        className={styles.cancelButton}
        disabled={ORDER_STATUS_INDEX.includes(index)}
      >
        <Text className={`${styles.textButton} ${typo.size_14_600}`}>Cancel</Text>
      </Button>
      <div />
    </div>
  );
}
