import { Box, Text } from "@mantine/core";
import typo from "@/styles/text.module.css";

const OrderDetailHeader = () => {
  return (
    <Box px={20} style={style}>
      <Text className={`${typo.size_14_600} `} c="white">
        Image
      </Text>
      <Text className={`${typo.size_14_600} `} c="white">
        Product Name
      </Text>
      <Text className={`${typo.size_14_600} `} c="white">
        Quantity
      </Text>
      <Text className={`${typo.size_14_600} `} c="white">
        Price
      </Text>
      <Text className={`${typo.size_14_600} `} c="white">
        Total Price
      </Text>
    </Box>
  );
};
export default OrderDetailHeader;
const style = {
  display: "grid",
  gridTemplateColumns: " 1fr 1fr 1fr 0.5fr 0.5fr",
  backgroundColor: "#6E701F",
  padding: "0.8rem 0",
  marginTop: "1rem",
};
