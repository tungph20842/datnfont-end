import { IChangePassword, IUser } from "../interfaces/cart"
import instance from "./instance"

export const signin = (data: { email: string, password: string }) => {
    return instance.post('/signin', data)
}
export const getUser = () => {
    return instance.get('/user')
}
export const getUserById = (id: string | number)=>{
    const uri = '/user/'+id
    return instance.get(uri)
}
export const signup = (data: IUser) => {
   const uri = "/signup"
    return instance.post(uri, data)
}
export const deleteUser =(userId:string | number)=>{
    const uri = "/user/" +userId
    return instance.delete(uri)
}
export const updateUser = (user:IUser,id:string | number)=>{
    const uri = '/user/'+id
    return instance.put(uri,user)
}
export const changepassword = (user:IChangePassword,id:string | number)=>{
    const uri = '/changePassword/'+id
    return instance.post(uri,user)
}