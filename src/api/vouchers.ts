import { IVouchers } from "../interfaces/vouchers";
import instance from "./instance";
export const getVoucher = () => {
    const uri = "/vouchers";
    return instance.get(uri)
}
export const getVoucherById = (id: string | number) => {
    const uri = "/vouchers/" + id;
    return instance.get(uri)
}
export const addVoucher = (voucher: IVouchers) => {
    const uri = "/vouchers";
    return instance.post(uri, voucher)
}
export const updateVoucher = (voucher: IVouchers, id: string) => {
    const uri = "/vouchers/" + id;
    return instance.put(uri, voucher)
}
export const deleteVoucher = (voucherId: string | number) => {
    const uri = "/vouchers/" + voucherId
    return instance.delete(uri)
}