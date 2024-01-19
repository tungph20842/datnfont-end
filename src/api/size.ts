import { ISize } from "../interfaces/size";
import instance from "./instance";

export const getSize = () => {
    return instance.get('/size')
}
export const getBySizeId = (id:string | number) => {
    const uri = "/size/" +id
    return instance.get(uri)
}
 export const deleteSize = (id: string | number) => {
     const uri = "/size/" + id
     return instance.delete(uri)
 }
export const addSize = (body: ISize) => {
    const uri = "/size";
    return instance.post(uri, body)
}
export const updateSize = (size: ISize,id:string | number) => {
    const uri = "/size/" + id
    return instance.put(uri, size)
}