import instance from "./instance";
import { IColor } from "../interfaces/color"; 

export const getColor = () => {
    return instance.get('/color')
}
export const getByColorId = (id:string | number) => {
    const uri = "/color/" +id
    return instance.get(uri)
}
 export const deleteColor = (id: string | number) => {
     const uri = "/color/" + id
     return instance.delete(uri)
 }
export const addColor = (body: IColor) => {
    const uri = "/color";
    return instance.post(uri, body)
}
export const updateColor = (color: IColor,id:string | number) => {
    const uri = "/color/" + id
    return instance.put(uri, color)
}