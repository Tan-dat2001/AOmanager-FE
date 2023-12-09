import { FnType, wrapper } from "@/utils/misc";
import axios, { AxiosRequestConfig } from "@/services/axios";
import { ListOrderProps, Response, StatusCode } from "@/types";
import { stringifyQueryString } from "@/utils/stringifyQueryString";
import { LIMIT_PAGE } from "@/config/constants";

function _wrapper<T>(fn: FnType<ListOrderProps, T, unknown, unknown>) {
  return wrapper(fn, { __default: {} });
}

type GetOrdersProps = {
  orderStatusId: string;
  page: number;
};

export const getOrders = _wrapper(async (input?: GetOrdersProps) => {
  const urlObject = {
    customerId: localStorage.getItem("userId") || "",
    orderStatusId: input?.orderStatusId,
    limit: (input?.page || 1) * LIMIT_PAGE,
  };
  const parsedQuery = stringifyQueryString(urlObject);
  const res = await axios.get<AxiosRequestConfig, Response<ListOrderProps>>(`/customer/order?${parsedQuery}`);
  return res.code === StatusCode.Success ? res.data : {};
});
