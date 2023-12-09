import { FnType, wrapper } from "@/utils/misc";
import axios, { AxiosRequestConfig } from "@/services/axios";
import { Response, StatusCode } from "@/types";
import { LoginProps } from "@/pages/login";
import { ForgotPasswordProf } from "@/pages/forgot-password";
import { ResetPasswordProf } from "@/pages/reset-password/[id]";
import { RegisterProf } from "@/pages/register";

export type Auth = {
  id?: string;
  username?: string;
  roles?: string[];
  token?: string;
  tokenType?: string;
};

function _wrapper<T>(fn: FnType<Auth | string | boolean | Response<null>, T, unknown, unknown>) {
  return wrapper(fn, { __default: undefined });
}

export const login = _wrapper(async (input?: LoginProps) => {
  const res = await axios.post<AxiosRequestConfig, Response<Auth>>(`/auth/signin`, {
    email: input?.name,
    password: input?.password,
  });
  return res.code === StatusCode.Success ? (res.data.roles?.includes("ROLE_CUSTOMER") ? res.data : false) : false;
});

export const forgotPassword = _wrapper(async (input?: ForgotPasswordProf) => {
  const res = await axios.post<AxiosRequestConfig, Response<Auth>>(`/auth/forgot-password/send-email`, {
    email: input?.email,
  });
  return res.code === StatusCode.Success ? res.data : res.message;
});
export const resetPassword = _wrapper(async (input?: ResetPasswordProf) => {
  const res = await axios.put<AxiosRequestConfig, Response<Auth>>(`/auth/forgot-password/reset`, {
    token: input?.token,
    password: input?.newPassword,
  });
  return res.code === StatusCode.Success;
});

export const register = _wrapper(async (input?: RegisterProf) => {
  const birthdayTimestamp = input && new Date(input.birthday).getTime();
  const data = {
    ...input,
    birthday: birthdayTimestamp,
  };
  const res = await axios.post<AxiosRequestConfig, Response<Auth>>(`/auth/signup`, {
    ...data,
    roleId: "8255f34f-4bc8-4dc2-90da-9d3a35f65489",
  });
  return Number(res.code) === 201 ? true : res.message;
});

type ChangePasswordProps = {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
};

export const changePassword = _wrapper(async (input?: ChangePasswordProps) => {
  return await axios.put<AxiosRequestConfig, Response<null>>("/auth/change-password", {
    id: localStorage.getItem("userId"),
    ...input,
  });
});
