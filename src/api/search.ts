import instance from "./instance"

export const searchProduct = (data:any) => {
    return instance.get('/search/product',{params:{name:data}})
}
export const searchBlog = (data:any) => {
    return instance.get('/search/blog',{params:{title:data}})
}