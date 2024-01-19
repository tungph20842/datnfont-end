import { IFilterOrderProduct } from './Orders'

export interface IFilter {
  startDate: string
  endDate: string
}

export interface IAnalyticYear {
  _id: string
  count: number
}

export interface IFilterOrder {
  totalMoney: number
  orders: IFilterOrderProduct[]
}

export interface IAnalyticStatusYear {
  _id: 'CANCELLED' | 'COMPLETED' | 'PENDING' | 'PROCESSING' | 'ONDELIVERY'
  count: number
  totalAmount: number
}

export interface IOrder {
  _id: string | null
  userId: string
  fullname: string
  email: string
  phonenumber: string
  status: string
  address: string
  orderTotal: number
  orderDetails: []
  orderDate: string
  __v: number
}

export interface TimeFrame {
  _id: null
  totalAmount: number
  count: number
  orders: IOrder[]
}

export interface IData {
  day: TimeFrame[]
  week: TimeFrame[]
  month: TimeFrame[]
  year: TimeFrame[]
}

export interface ICountNumber {
  title: string
  value: number
}

export interface ITopProduct {
  _id: string
  name: string
  img: string[]
  totalQuantity: number
}

export interface IProductTop {
  completed: ITopProduct[]
  cancelled: ITopProduct[]
}
