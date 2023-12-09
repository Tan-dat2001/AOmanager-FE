import { FnType, wrapper } from "@/utils/misc";
import axios, { AxiosRequestConfig } from "@/services/axios";
import { ListProductProps, Response, StatusCode } from "@/types";
import { stringifyQueryString } from "@/utils/stringifyQueryString";
import { sortProduct } from "@/config/sortProduct";
import { LIMIT_PAGE_PRODUCT } from "@/config/constants";

function _wrapper<T>(fn: FnType<ListProductProps, T, unknown, unknown>) {
  return wrapper(fn, { __default: {} });
}

type GetProductsProps = {
  categoryId: string;
  orderByPrice: string;
  page: number;
  keyWord: string;
};

export const getProducts = _wrapper(async (input?: GetProductsProps) => {
  const urlObject = {
    categoryId: input?.categoryId === "all" ? "" : input?.categoryId,
    limit: (input?.page || 1) * LIMIT_PAGE_PRODUCT,
    orderByPrice: sortProduct.find((e) => e.name === input?.orderByPrice)?.id,
    keyWord: input?.keyWord,
  };
  const parsedQuery = stringifyQueryString(urlObject);
  const res = await axios.get<AxiosRequestConfig, Response<ListProductProps>>(`/customer/products?${parsedQuery}`);
  return res.code === StatusCode.Success ? res.data : {};
});
