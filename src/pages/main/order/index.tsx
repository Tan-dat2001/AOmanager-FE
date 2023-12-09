import { TabGroup } from "@/Components/Main/Order/TabGroup";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import styles from "./index.module.css";
import { HeaderTable } from "@/Components/Main/Order/HeaderTable";
import { Scroll } from "@/Components/Common/Scroll";
import { OrderItem } from "@/Components/Main/Order/OrderItem";
import useSWR, { mutate } from "swr";
import { getOrderStatus, getOrders } from "@/services";
import { OrderProps } from "@/types";
import { LIMIT_PAGE } from "@/config/constants";

const keyOrderStatus = "ORDER_STATUS";
const keyOrder = "ORDER";

export default function Order() {
  const { data: orderStatus } = useSWR(keyOrderStatus, () => getOrderStatus());
  const { data: listOrder, isLoading: loadingOrder } = useSWR(keyOrder, () => getData({}));
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState("");
  const [index, setIndex] = useState(1);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [orders, setOrders] = useState<OrderProps[]>([]);

  useEffect(() => {
    !localStorage.getItem("userId") && router.push("/login");
  });

  useEffect(() => {
    if (listOrder) {
      setTotal(listOrder.totalResult ?? 0);
      setOrders(listOrder.data ?? []);
    }
  }, [listOrder]);

  const getData = useCallback(
    async ({ tabKey }: { tabKey?: string }) => {
      return await getOrders({
        orderStatusId: tabKey ?? currentTab,
        page: page,
      });
    },
    [currentTab, page],
  );

  const onFilter = useCallback(
    async ({ tabKey }: { tabKey?: string }) => {
      const products = await getData({ tabKey: tabKey });
      mutate(keyOrder, products);
    },
    [getData],
  );

  const handleTabClick = useCallback(
    (tabKey: string) => {
      setCurrentTab(tabKey);
      setIndex((orderStatus?.findIndex((e) => e.id === tabKey) ?? 0) + 1);
      router.push("/main/order?tab=" + tabKey);
      onFilter({ tabKey: tabKey });
    },
    [onFilter, orderStatus, router],
  );

  useEffect(() => {
    if (orderStatus?.length ?? 0 > 0) {
      orderStatus && handleTabClick(orderStatus[0].id ?? "");
    }
  }, [orderStatus]);

  const fetchMoreData = async () => {
    if (page * LIMIT_PAGE < total) {
      setPage(page + 1);
      onFilter({});
    }
  };

  return (
    <div className={styles.container}>
      <TabGroup listOrderStatus={orderStatus} currentTab={currentTab} onTabClick={handleTabClick} />

      <HeaderTable />

      <Scroll
        loading={loadingOrder}
        data={orders}
        fetchMoreData={fetchMoreData}
        hasMore={page * LIMIT_PAGE < total}
        emptyMessage="There's no data!"
        renderComponent={(i: number, order: OrderProps) => (
          <OrderItem key={i} order={order} index={index} reload={onFilter} />
        )}
      />
    </div>
  );
}

Order.layout = "Menu";
