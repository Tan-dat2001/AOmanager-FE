import { FnType, wrapper } from "@/utils/misc";
import axios, { AxiosRequestConfig } from "@/services/axios";
import { OrderDetail, Response, StatusCode } from "@/types";
import { OrderForm } from "@/pages/main/cart/order";

function _wrapper<T>(fn: FnType<boolean | Response<null> | OrderDetail, T, unknown, unknown>) {
  return wrapper(fn, { __default: false });
}

export const cancelOrder = _wrapper(async (id?: string) => {
  return await axios.put<AxiosRequestConfig, Response<null>>("/customer/order/" + id);
});

export const order = _wrapper(async (input?: OrderForm) => {
  return await axios.post<AxiosRequestConfig, Response<null>>("/customer/order", {
    customerId: localStorage.getItem("userId"),
    ...input,
  });
});
export const orderDetail = _wrapper(async (id?: string) => {
  const res = await axios.get<AxiosRequestConfig, Response<null>>("/order-customers/" + id);
  return res.code === StatusCode.Success ? (res.data as unknown as OrderDetail) : false;
});
