import { ProductOrderDetail } from ".";

export type ListOrderProps = {
  totalResult?: number;
  data?: OrderProps[];
};

export type OrderProps = {
  id?: string;
  customerName?: string;
  orderDate?: string;
};
export type OrderDetail = {
  id: string;
  orderDate: number;
  customerName: string;
  deliveryAddress: string;
  deliveryEmail: string;
  deliveryPhone: string;
  deliveryDate: number;
  totalPriceOrder: number;
  orderStatusId: string;
  orderStatusName: string;
  productsList: ProductOrderDetail[];
  createAt: number;
  updateAt: number;
};
