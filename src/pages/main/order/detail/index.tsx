import OrderDetailHeader from "@/Components/Main/Order/Detail/Header";
import { orderDetail } from "@/services/order";
import { Box, Text, ScrollArea, Stack, Title, Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { OrderDetail } from "@/types";
import OrderDetailItem from "@/Components/Main/Order/Detail/Item";
import { formatDate } from "@/utils/date";

export default function OrderDetail() {
  const router = useRouter();
  const [data, setData] = useState<OrderDetail | null>(null);

  const param = router.query.id as string;
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (param) {
          const res = await orderDetail(param);
          setData(res as OrderDetail);
        } else return;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [param]);
  return (
    <Stack gap=".5rem" px="5rem">
      <Title fz={24}>Order Detail</Title>
      <Stack px={20} py={5} bg="#e8e8e8">
        <Flex pl={10}>
          <Text fw="bold" pr={10}>
            Order ID:{" "}
          </Text>
          {data?.id}
        </Flex>
        <Flex pl={10}>
          <Text fw="bold" pr={10}>
            Address Delivery:
          </Text>{" "}
          {data?.deliveryAddress}
        </Flex>
        <Flex pl={10}>
          <Text fw="bold" pr={10}>
            Order Date:
          </Text>
          {formatDate(data?.orderDate)}
        </Flex>
        <Flex pl={10}>
          <Text fw="bold" pr={10}>
            Phone:
          </Text>
          {data?.deliveryPhone}
        </Flex>
        <Flex pl={10}>
          <Text fw="bold" pr={10}>
            Payment:
          </Text>
          Cash On Delivery
        </Flex>
        <Flex pl={10}>
          <Text fw="bold" pr={10}>
            Customer Name :
          </Text>
          {data?.customerName}
        </Flex>
        <Flex pl={10}>
          <Text fw="bold" pr={10}>
            Delivery Date:
          </Text>
          {formatDate(data?.deliveryDate)}
        </Flex>
      </Stack>
      <Box>
        <OrderDetailHeader />
        <ScrollArea h="25vh" mt={10}>
          {data &&
            data.productsList.map((item, index: number) => (
              <div key={index}>
                <OrderDetailItem item={item} />
              </div>
            ))}
        </ScrollArea>
      </Box>
      <Flex align="center" justify="flex-end ">
        TOTAL:
        <Title px={10} c="#CC1111">
          {data?.totalPriceOrder}
        </Title>
        VND
      </Flex>
    </Stack>
  );
}

OrderDetail.layout = "Menu";
