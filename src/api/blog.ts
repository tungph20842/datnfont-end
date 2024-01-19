
import { IBlog } from "../interfaces/blog";
import instance from "./instance";

export const getAllBlog = () => {
    return instance.get("/blog")
}
export const getByIdBlog = (id: string) => {
    const uri = "/blog/" + id
    return instance.get(uri)
}
export const addBlog = (body: IBlog) => {
    const uri = "/blog";
    return instance.post(uri, body)
}
export const deleteBlog = (id: string | number) => {
    const uri = "/blog/" + id
    return instance.delete(uri)
}
export const updateBlog = (blog: IBlog,id:string | number) => {
    const uri = "/blog/" + id
    return instance.put(uri, blog)
}
