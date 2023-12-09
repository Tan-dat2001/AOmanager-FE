import { LoadingOverlay } from "@mantine/core";

export function Loading() {
  return <LoadingOverlay visible={true} overlayProps={{ radius: "sm", blur: 2 }} zIndex={10000} />;
}
