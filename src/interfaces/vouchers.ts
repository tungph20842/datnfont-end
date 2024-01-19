export interface IVouchers {
    _id?: string | number
    Voucher_Code?: string
    Discount_Type?: string
    Quantity?: number
    Start_Date?:Date
    Expiration_Date?: Date
    IsActive?: boolean
    Description?: string
}