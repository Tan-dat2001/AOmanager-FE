import { notifications } from "@mantine/notifications";
import { NOTIFICATION_TIME_OUT } from "@/config/constants";

export function showSuccessNotification(message?: string) {
  notifications.show({
    message: message ?? "Success",
    autoClose: NOTIFICATION_TIME_OUT,
    withBorder: true,
  });
}

export function showFailNotification(message?: string) {
  notifications.show({
    message: message ?? "Fail",
    color: "red",
    autoClose: NOTIFICATION_TIME_OUT,
    withBorder: true,
  });
}
