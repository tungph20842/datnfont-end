import { IProduct } from "../interfaces/product"
import instance from "./instance"

export const getProduct = () => {
    return instance.get('/products')
}
export const getById = (id: string) => {
    const uri = "/products/" + id
    return instance.get(uri)
}
export const addproduct =(product:IProduct)=>{
    const uri = "/products";
    return instance.post(uri, product,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}
export const updateproduct =(product:IProduct, id:string |number)=>{
    const uri = "/products/"+ id;
    return instance.patch(uri,product,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}
export const deleteproduct =(product:string | number)=>{
    const uri = "/products/" +product
    return instance.delete(uri,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}