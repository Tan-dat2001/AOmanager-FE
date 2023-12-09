import { HeaderTable } from "@/Components/Main/Cart/HeaderTable";
import styles from "./index.module.css";
import { CartItem } from "@/Components/Main/Cart/CartItem";
import { CartFooter } from "@/Components/Main/Cart/CartFooter";
import useSWR, { mutate } from "swr";
import { changeQuantity, getCarts } from "@/services";
import { Loader } from "@/Components/Common/Loader";
import { useEffect, useState } from "react";
import { CartProps } from "@/types";
import { Loading } from "@/Components/Common/Loading";
import { useRouter } from "next/router";

const key = "CART";

export default function Cart() {
  const router = useRouter();
  const { data, isLoading } = useSWR(key, () => getCarts());
  const [cartList, setCartList] = useState<CartProps[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    !localStorage.getItem("userId") && router.push("/login");
  });

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
      setTotal(total);
      setCartList(updatedCartList);
    }
  }, [data]);

  const handleChangeQuantity = async (id?: string, quantity?: string) => {
    setLoading(true);
    const res = await changeQuantity({ id: id, quantity: quantity });
    res ? reload() : console.log("fail");
  };

  const reload = async () => {
    const carts = await getCarts();
    mutate(key, carts);
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <HeaderTable />
      {isLoading && <Loader />}
      {loading && <Loading />}
      {(cartList || []).map((e, i) => (
        <CartItem key={i} cart={e} onChangeQuantity={handleChangeQuantity} reload={reload} />
      ))}
      <CartFooter total={total} />
    </div>
  );
}

Cart.layout = "Menu";
