import { ProductI } from "./product";

export interface CartItemI{
    product: ProductI;
    count: number;
}