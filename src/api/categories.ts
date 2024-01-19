import instance from "./instance";
import { ICategories } from "../interfaces/categories";
export const getCategory =()=>{
    const uri = "/categories";
    return instance.get(uri)
}
export const getByidCategory =(id:string| number)=>{
    const uri = "/categories/"+id;
    return instance.get(uri)
}
export const addCategory =(category:ICategories)=>{
    const uri = "/categories";
    return instance.post(uri, category)
}
export const updateCategory =(category:ICategories, id:string)=>{
    const uri = "/categories/"+ id;
    return instance.patch(uri,category)
}
export const deletecategory =(categoryId:string | number)=>{
    const uri = "/categories/" +categoryId
    return instance.delete(uri)
}