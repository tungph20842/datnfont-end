import { IProduct } from "./product";

export interface IOrderDetail {
  _id?: string;
  orderId?: string;
  productId: string | number;
  quantity: number;
  productInfo: IProduct
  price: number;
  sizeId: string | null;
  colorId: string;
  voucherId: string | null;
}