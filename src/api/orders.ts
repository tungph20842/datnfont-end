import { IOrders } from "../interfaces/Orders";
import instance from "./instance";
export const getAllOrder = ()=>{
    const uri = '/order';
    return instance.get(uri);
}
export const getAllOrderDetail = (id:string)=>{
    const uri = '/purchase/'+id;
    return instance.get(uri);
}
export const getByIdOrderDetail = (id:string)=>{
    const uri = '/order/'+id;
    return instance.get(uri);
}
export const updateStatusOrder = (id:string | number, status:IOrders)=>{
    const uri = '/order/'+id;
    return instance.put(uri,status);
}