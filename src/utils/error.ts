import { OrderForm } from "@/pages/main/cart/order";
import { z } from "zod";

export function checkErrorOrder(input: OrderForm):
  | boolean
  | {
      deliveryAddress: string;
      deliveryName: string;
      deliveryPhone: string;
    } {
  const schema = z
    .object({
      deliveryAddress: z.string().nonempty({ message: "" }),
      deliveryName: z.string().nonempty({ message: "This field cannot be blank" }),
      deliveryPhone: z
        .string()
        .nonempty({ message: "This field cannot be blank" })
        .refine((value) => /^\+?[0-9]\d{9,11}$/.test(value), { message: "Phone number is incorrect" }),
    })
    .partial();
  const res = schema.safeParse({
    deliveryAddress: input.deliveryAddress,
    deliveryName: input.deliveryName,
    deliveryPhone: input.deliveryPhone.toString(),
  });
  if (res.success) {
    return false;
  }
  const fieldErrors = res.error.formErrors.fieldErrors;
  const updatedError = {
    deliveryAddress: fieldErrors.deliveryAddress ? fieldErrors.deliveryAddress[0] : "",
    deliveryName: fieldErrors.deliveryName ? fieldErrors.deliveryName[0] : "",
    deliveryPhone: fieldErrors.deliveryPhone ? fieldErrors.deliveryPhone[0] : "",
  };
  return updatedError;
}

type ChangePasswordProps = {
  currentPassword: string;
  newPassword: string;
  newPassword2: string;
};

export function checkErrorChangePassWord(input: ChangePasswordProps):
  | boolean
  | {
      currentPassword: string;
      newPassword: string;
      newPassword2: string;
    } {
  const schema = z
    .object({
      currentPassword: z.string().min(8, { message: "Password must be at least 8 characters long" }),
      newPassword: z.string().min(8, { message: "Password must be at least 8 characters long" }),
      newPassword2: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    })
    .refine((data) => data.newPassword === data.newPassword2, {
      message: "Not match!",
      path: ["newPassword2"],
    });
  const res = schema.safeParse({
    currentPassword: input.currentPassword,
    newPassword: input.newPassword,
    newPassword2: input.newPassword2,
  });
  if (res.success) {
    return false;
  }
  const fieldErrors = res.error.formErrors.fieldErrors;
  const updatedError = {
    currentPassword: fieldErrors.currentPassword ? fieldErrors.currentPassword[0] : "",
    newPassword: fieldErrors.newPassword ? fieldErrors.newPassword[0] : "",
    newPassword2: fieldErrors.newPassword2 ? fieldErrors.newPassword2[0] : "",
  };
  return updatedError;
}
