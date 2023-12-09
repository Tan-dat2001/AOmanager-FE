import { FnType, wrapper } from "@/utils/misc";
import axios, { AxiosRequestConfig } from "@/services/axios";
import { MasterProps, Response, StatusCode } from "@/types";

function _wrapper<T>(fn: FnType<MasterProps[], T, unknown, unknown>) {
  return wrapper(fn, { __default: [] });
}

export const getCategories = _wrapper(async () => {
  const res = await axios.get<AxiosRequestConfig, Response<MasterProps[]>>("/master/categories");
  return res.code === StatusCode.Success ? res.data : [];
});

export const getOrderStatus = _wrapper(async () => {
  const res = await axios.get<AxiosRequestConfig, Response<MasterProps[]>>("/master/order-status");
  return res.code === StatusCode.Success ? res.data : [];
});
