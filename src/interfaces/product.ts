import {ICategories} from "./categories"
export interface IProduct {
    _id?: string | number;
    name: string;
    price: number
    sizeAndcolor:Array<{ sizeId: string;colorId: string; quantity: number }>;
    img: string[]
    categoryId : string
    description: string
    
}