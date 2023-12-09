import { FnType, wrapper } from "@/utils/misc";
import axios, { AxiosRequestConfig } from "@/services/axios";
import { ProductProps, Response, StatusCode } from "@/types";

function _wrapper<T>(fn: FnType<ProductProps, T, unknown, unknown>) {
  return wrapper(fn, { __default: {} });
}

export const getProductDetail = _wrapper(async (productId?: string) => {
  if (!productId) {
    return;
  }
  const res = await axios.get<AxiosRequestConfig, Response<ProductProps>>(`/customer/products/${productId}`);
  return res.code === StatusCode.Success ? res.data : {};
});
