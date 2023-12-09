import { FnType, wrapper } from "@/utils/misc";
import axios, { AxiosRequestConfig } from "@/services/axios";
import { Response, StatusCode, UserProps } from "@/types";

function _wrapper<T>(fn: FnType<UserProps | Response<null>, T, unknown, unknown>) {
  return wrapper(fn, { __default: {} });
}

export const getUserById = _wrapper(async () => {
  const res = await axios.get<AxiosRequestConfig, Response<UserProps>>(
    `/customer/user-infor/${localStorage.getItem("userId")}`,
  );
  return res.code === StatusCode.Success ? res.data : {};
});

export const updateUser = _wrapper(async (input?: UserProps) => {
  if (input) {
    const { updateAt, createAt, avatar, email, status, ...user } = input;
    console.log(updateAt, createAt, avatar, email, status);
    return await axios.put<AxiosRequestConfig, Response<null>>(`/customer/user-infor`, user);
  }
});
