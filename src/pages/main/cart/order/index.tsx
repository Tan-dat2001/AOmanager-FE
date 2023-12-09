import { getCarts } from "@/services";
import useSWR from "swr";
import styles from "./index.module.css";
import { CartProps, Response, StatusCode } from "@/types";
import { useEffect, useState } from "react";
import { Loading } from "@/Components/Common/Loading";
import { CartItem } from "@/Components/Main/Cart/CartItem";
import { Text } from "@mantine/core";
import typo from "@/styles/text.module.css";
import { CartFooter } from "@/Components/Main/Cart/CartFooter";
import { useForm } from "@mantine/form";
import { OrderForm } from "@/Components/Main/Cart/Order/OrderForm";
import { checkErrorOrder } from "@/utils/error";
import useErrors from "@/hooks/useErrors";
import { order } from "@/services/order";
import { showFailNotification, showSuccessNotification } from "@/utils/notifications";
import { useRouter } from "next/router";
import { HeaderTable } from "@/Components/Main/Cart/HeaderTable";

const key = "CART_FOR_ORDER";

export default function Order() {
  const router = useRouter();
  const { data, isLoading } = useSWR(key, () => getCarts());
  const [cartList, setCartList] = useState<CartProps[]>([]);
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 3);

  useEffect(() => {
    !localStorage.getItem("userId") && router.push("/login");
  });

  const form = useForm<OrderForm>({
    initialValues: {
      deliveryAddress: "",
      orderDate: new Date().getTime(),
      deliveryDate: currentDate.getTime(),
      deliveryName: "",
      deliveryEmail: "",
      deliveryPhone: "",
      totalPrice: 0,
    },
  });

  const { errors, setErrors, clearErrors } = useErrors({
    deliveryAddress: "",
    deliveryName: "",
    deliveryPhone: "",
  });

  const handleChangeForm = (field: string, value: string | number) => {
    form.setFieldValue(field, value);
  };

  useEffect(() => {
    if (data) {
      let total = 0;
      const updatedCartList = (data as CartProps[]).map((item) => {
        const itemTotal = (item.quantity || 0) * (item.unitPrice || 0);
        total += itemTotal;
        return {
          ...item,
          total: itemTotal,
        };
      });
      form.setFieldValue("totalPrice", total);
      setCartList(updatedCartList);
    }
  }, [data]);

  const onButtonClick = async () => {
    const error = checkErrorOrder(form.values);
    if (error) {
      typeof error === "object" ? setErrors(error) : clearErrors();
      return;
    }
    const res = (await order(form.values)) as Response<null>;
    if (res.code === StatusCode.Success) {
      showSuccessNotification(res.message);
      router.push("/main/order");
    } else {
      showFailNotification(res.message);
    }
  };

  return (
    <div className={styles.container}>
      {isLoading && <Loading />}

      <Text className={`${typo.size_18_600} ${styles.title}`}>Enter information to order</Text>
      <HeaderTable />
      {(cartList || []).map((e, i) => (
        <CartItem key={i} cart={e} onChangeQuantity={() => null} reload={() => null} disabled={true} />
      ))}

      <CartFooter total={form.values.totalPrice} isShowButton={false} />

      <OrderForm values={form.values} onChangeValues={handleChangeForm} onButtonClick={onButtonClick} errors={errors} />
    </div>
  );
}

export type OrderForm = {
  deliveryAddress: string;
  orderDate: number;
  deliveryDate: number;
  deliveryName: string;
  deliveryEmail: string;
  deliveryPhone: string;
  totalPrice: number;
};

Order.layout = "Menu";
