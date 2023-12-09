import { FnType, wrapper } from "@/utils/misc";
import axios, { AxiosRequestConfig } from "@/services/axios";
import { ProductProps, Response, StatusCode } from "@/types";

function _wrapper<T>(fn: FnType<ProductProps[], T, unknown, unknown>) {
  return wrapper(fn, { __default: [] });
}

export const getNewProducts = _wrapper(async () => {
  const res = await axios.get<AxiosRequestConfig, Response<ProductProps[]>>("/customer/home/new-products");
  return res.code === StatusCode.Success ? res.data : [];
});

export const getSellingProducts = _wrapper(async () => {
  const res = await axios.get<AxiosRequestConfig, Response<ProductProps[]>>("/customer/home/best-selling-products");
  return res.code === StatusCode.Success ? res.data : [];
});
