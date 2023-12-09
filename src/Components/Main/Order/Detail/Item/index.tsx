import { ProductOrderDetail } from "@/types";
import { Box, Text, Image } from "@mantine/core";
import typo from "@/styles/text.module.css";

const OrderDetailItem = ({ item }: { item?: ProductOrderDetail }) => {
  return (
    <Box px={10} style={style}>
      <Image w="8rem" h="4rem" src={item?.productImage || ""} alt={item?.name} />
      <Text className={`${typo.size_16_500} `}>{item?.name}</Text>
      <Text className={`${typo.size_16_500} `}>{item?.quantity}</Text>
      <Text className={`${typo.size_16_500} `}>{item?.unitPrice}</Text>
      <Text className={`${typo.size_16_500} `}>{item?.totalPrice}</Text>
    </Box>
  );
};
export default OrderDetailItem;
const style = {
  display: "grid",
  alignItems: "center",
  gridTemplateColumns: " 1fr 1fr 1fr 0.5fr 0.5fr",
  backgroundColor: "#e8e8e8",
  marginTop: ".4rem",
};
