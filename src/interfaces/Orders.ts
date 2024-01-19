import { PathString } from 'react-hook-form'
import { IOrderDetail } from './orderDetail'

export interface IOrders {
  _id?: string | number
  userId: string
  fullname: string
  email: string
  isPaid?:boolean
  status?: string
  phonenumber: string
  address: string
  orderTotal: number
  orderDate:Date;
  orderDetails: IOrderDetail[]
}

export interface IFilterOrderProduct {
  _id: string
  userId: string
  fullname: string
  email: string
  phonenumber: string
  status: string
  address: string
  orderTotal: 11555
  orderDetails: []
  orderDate: string
  __v: number
}
