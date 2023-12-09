import { FnType, wrapper } from "@/utils/misc";
import axios, { AxiosRequestConfig } from "@/services/axios";
import { CartProps, Response, StatusCode } from "@/types";

function _wrapper<T>(fn: FnType<CartProps[] | Response<null> | boolean, T, unknown, unknown>) {
  return wrapper(fn, { __default: [] });
}

export const getCarts = _wrapper(async () => {
  const res = await axios.get<AxiosRequestConfig, Response<CartProps[]>>(
    `/customer/cart?customerId=${localStorage.getItem("userId")}`,
  );
  return res.code === StatusCode.Success ? res.data : [];
});

export const deleteCart = _wrapper(async (id?: string) => {
  return await axios.delete<AxiosRequestConfig, Response<null>>(`/customer/cart/${id}`);
});

type ChangeQuantityProps = {
  id?: string;
  quantity?: string;
};

export const changeQuantity = _wrapper(async (input?: ChangeQuantityProps) => {
  const res = await axios.put<AxiosRequestConfig, Response<null>>(`/customer/cart`, {
    cartDetailId: input?.id,
    quantity: input?.quantity,
  });
  return res.code === StatusCode.Success;
});

type AddProductToCartProps = {
  quantity?: number;
  unitPrice?: number;
  productId?: string;
};

export const addProductToCart = _wrapper(async (input?: AddProductToCartProps) => {
  return await axios.post<AxiosRequestConfig, Response<null>>(`/customer/cart`, {
    quantity: input?.quantity,
    unitPrice: input?.unitPrice,
    productId: input?.productId,
    customerId: localStorage.getItem("userId"),
  });
});
