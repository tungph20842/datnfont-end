import { Comments } from "../interfaces/comment"
import instance from "./instance"
export const createComment = (comment:Comments)=>{
    const uri = "/comment";
    return instance.post(uri,comment)
}
export const getComment =(productId:string)=>{
    const uri = "/comment/" +productId
    return instance.get(uri)
}
export const deleteComment =(commentId:string)=>{
    const uri = "/comment/" +commentId
    return instance.delete(uri,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}
