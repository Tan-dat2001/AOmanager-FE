import { ImageAndCountForm } from "@/Components/Main/Products/ProductDetail/ImageAndCountForm";
import styles from "./index.module.css";
import { ProductInformation } from "@/Components/Main/Products/ProductDetail/ProductInformation";
import { useRouter } from "next/router";
import { addProductToCart, getProductDetail } from "@/services";
import useSWR, { mutate } from "swr";
import { useEffect, useState } from "react";
import { Loading } from "@/Components/Common/Loading";
import { showFailNotification, showSuccessNotification } from "@/utils/notifications";
import { Response, StatusCode } from "@/types";

const key = "PRODUCT_DETAIL";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useSWR(key, () => getProductDetail(id as string));
  const [count, setCount] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const productDetail = await getProductDetail(id as string);
      mutate(key, productDetail);
    };
    fetchData();
  }, [id]);

  const handleChangeCount = (value: number) => {
    setCount(value);
  };

  const addToCart = async () => {
    if (!localStorage.getItem("userId")) {
      router.push("/login");
    } else {
      const res = (await addProductToCart({
        quantity: count,
        unitPrice: data?.price,
        productId: data?.id,
      })) as Response<null>;
      res.code === StatusCode.Success ? showSuccessNotification(res.message) : showFailNotification(res.message);
    }
  };

  return (
    <div className={styles.container}>
      {isLoading && <Loading />}

      <div className={styles.containerCenter}>
        <ImageAndCountForm product={data} count={count} onChangeCount={handleChangeCount} onAddToCart={addToCart} />
        <ProductInformation product={data} />
      </div>
    </div>
  );
}

ProductDetail.layout = "Menu";
