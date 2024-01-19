import { IFilterOrder } from '../../../../../interfaces'

export const convertMoney = (data: IFilterOrder, status: string): { totalMoney: number; countOrders: number } => {
  const totalMoney = data.orders
    .filter((item) => item.status === status)
    .reduce((total, item) => {
      return total + item.orderTotal
    }, 0)
  const countOrders = data.orders.filter((item) => item.status === status).length
  return { totalMoney, countOrders }
}

export const convertMoneyOrder = (money: number): string => {
  const result = money.toLocaleString('vi', { style: 'currency', currency: 'VND' })
  return result
}
