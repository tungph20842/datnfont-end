
import React from 'react'
import { useShoppingContext } from '../context/ShoppingCartContext'
type cartPayProps = {
    _id: number | string
    name: string
    price: number
    quantity: number,
    img: string

}
const CartPay = ({ name, quantity, img }: cartPayProps) => {

    const { totalPrice } = useShoppingContext()
    return (
        <div>
            <table className="table-auto w-full ">
                <thead className="pb-10 ">
                </thead>
                <tbody className="w-full ">
                    <tr className="border-t-2">
                        <td className="flex py-10  gap-8">
                            <img src={img} className="w-20"></img>
                            <div className="pt-7">
                                <p>{name}</p>
                            </div>
                        </td>
                        <td className="w-40">{quantity} </td>
                        <td className="w-40">{totalPrice} </td>
                    </tr>
                </tbody>


            </table></div >
    )
}

export default CartPay