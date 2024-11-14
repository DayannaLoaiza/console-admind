import { Types } from "mongoose";

export type Customer = {
    name: string;
    email: string;
}
  
export type ProductDetail = {
    productName: string;
    quantity: number;
    unitPrice: number;
    _id?: string;
  }
  
export type OrderInfo = {
    _id?: string;
    amount: number;
    currentState: OrderState;
    creationDate?: Date;
    customer: Customer;
    productDetails: ProductDetail[];
    notes?: string;
}

export type OrderState =
  | "Pending"
  | "In Review"
  | "In Preparation"
  | "Shipped"
  | "Delivered"
  | "Cancelled";


export type TransitionLogs =  {
    _id?: string,
    orderId: string | Types.ObjectId;
    previousState: OrderState,
    newState: OrderState,
    transitionDate?: Date,
    actionTaken: string
}
  