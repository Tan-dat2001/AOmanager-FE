export type ListProductProps = {
  totalResult?: number;
  data?: ProductProps[];
};

export type ProductProps = {
  id?: string;
  name?: string;
  description?: string;
  habitat?: string;
  temperature?: number;
  ph?: number;
  position?: string;
  reproductionMethod?: string;
  foodType?: string;
  maxSize?: number;
  inventoryQuantity?: number;
  status?: boolean;
  categoryId?: string;
  categoryName?: string;
  imageList?: string[];
  avatar?: string;
  price?: number;
  soldQuantity?: number;
};
export type ProductOrderDetail = {
  productId: string;
  productImage: string;
  name: string;
  quantity: number;
  inventoryQuantity: number;
  unitPrice: number;
  totalPrice: number;
};
