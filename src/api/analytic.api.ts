import {
  IAnalyticStatusYear,
  IAnalyticYear,
  ICountNumber,
  IData,
  IFilter,
  IFilterOrder,
  IProductTop,
  ITopProduct
} from '../interfaces'

import instance from './instance'

export const analyticApi = {
  /* filter order */
  filterOrder: async (body: IFilter) => {
    return instance.post<IFilterOrder>('/filter-order', body)
  },
  /* analytic year */
  analyticYear: async () => {
    return instance.get<IAnalyticYear[]>(`/analytic-year`)
  },
  /* analytic year */
  analyticStatusYear: async () => {
    return instance.get<IAnalyticStatusYear[]>(`/analytic-status-year`)
  },

  /* analytic pending */
  analyticPending: async () => {
    return instance.get<IData>(`/analytic-order-peding`)
  },

  /* analytic proccessing */
  analyticProccessing: async () => {
    return instance.get<IData>(`/analytic-order-processing`)
  },

  /* analytic delivery */
  analyticDelivery: async () => {
    return instance.get<IData>(`/analytic-order-delivery`)
  },

  /* analytic complete */
  analyticComplete: async () => {
    return instance.get<IData>(`/analytic-order-complete`)
  },

  /* analytic cancel */
  analyticCancel: async () => {
    return instance.get<IData>(`/analytic-order-cancelled`)
  },

  /* get count */
  getCounts: async () => {
    return instance.get<ICountNumber[]>('/analytic-numbes')
  },

  /* top 10 product */
  top10Product: async () => {
    return instance.get<IProductTop>('/top-product')
  }
}
