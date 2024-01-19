import { IFilter, IFilterOrder } from '../../../../../interfaces'

import { analyticApi } from '../../../../../api/analytic.api'

export const getOrderStatus = async () => {
  const response = await analyticApi.analyticYear()
  return response.data
}

export const filterOrder = async (body: IFilter): Promise<IFilterOrder> => {
  const response = await analyticApi.filterOrder(body)
  return response.data
}

export const getOrderStatusYear = async () => {
  const response = await analyticApi.analyticStatusYear()
  return response.data
}
