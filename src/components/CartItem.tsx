
import React, { useEffect,useMemo, useState } from "react";
import { useShoppingContext } from '../context/ShoppingCartContext'
import { IColor } from '../interfaces/color'
import { ISize } from "../interfaces/size";
import { ToastContainer, toast } from "react-toastify";
import { getColor } from "../api/color";
import { getSize } from "../api/size";
type cartItemProps = {
    _id: number | string
    name: string
    price: number
    quantity: number,
    img: string[],
    sizeId:string,
    colorId: string
}

const CartItem = ({ _id, name, price,sizeId,colorId, quantity, img }: cartItemProps) => {
    const { increaseQty, decreaseQty, removeCartItem } = useShoppingContext()
const [colors, setColors] = useState<IColor[]>([]);
const [sizes, setSizes] = useState<ISize[]>([]);

useEffect(() => {
    async function fetchColors() {
      try {
        const { data } = await getColor();
        
        console.log(data);
        setColors(data);
        
      } catch (error) {
        console.log("Error fetching blogs:", error);
        // toast.error("Error fetching blogs!");
      }
    }
    fetchColors();
  }, []);
  useEffect(() => {
    async function fetchSizes() {
      try {
        const { data } = await getSize();
        
        console.log(data);
        setSizes(data);
        
      } catch (error) {
        console.log("Error fetching blogs:", error);
        // toast.error("Error fetching blogs!");
      }
    }
    fetchSizes();
  }, []);
    const size = sizes.find(s => s._id === sizeId)?.name || 'Unknown Size';
    const color = colors.find(c => c._id === colorId)?.name || 'Unknown Color';
    return (
    <div className="flex flex-col p-4 text-lg font-semibold shadow-md border rounded-sm mb-5">
            <div className="flex flex-col md:flex-row gap-3 justify-between">
              
                <div className="flex flex-row gap-6 items-center">
                    <div className="w-28 h-28">
                        <img className="w-full h-36" src={img.length > 0 ? img[0] : ''}/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-lg text-gray-800 font-semibold  overflow-hidden overflow-ellipsis max-w-[350px] whitespace-nowrap break-words">
                            {/* {name} */}
                            {name.length > 35 ? `${name.substring(0, 25)}...` : name}
                            </p>
                        <p className="text-xs text-gray-600 font-semibold">Color: <span className="font-normal">{color}</span></p>
                        <p className="text-xs text-gray-600 font-semibold">Size: <span className="font-normal">{size}</span></p>

                    </div>
                </div>
           
                <div className="self-center text-center">
                    <p className="text-gray-600 font-normal text-sm ">{price.toLocaleString()}đ
                        <span className="font-normal text-xl text-red-500 ml-20">{(price *quantity).toLocaleString()}đ</span>
                    </p>
                    <p className="  "></p>
                    {/* (item.price * item.quantity).toLocaleString() */}
                </div>

                <div className="self-center">
                    <button className="" onClick={() => removeCartItem(_id as string ,sizeId, colorId)}>
                        <svg className="" height="24px" width="24px" id="Layer_1" version="1.1" viewBox="0 0 512 512"  xmlSpace='preserve' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <g>
                            <path d="M400,113.3h-80v-20c0-16.2-13.1-29.3-29.3-29.3h-69.5C205.1,64,192,77.1,192,93.3v20h-80V128h21.1l23.6,290.7   c0,16.2,13.1,29.3,29.3,29.3h141c16.2,0,29.3-13.1,29.3-29.3L379.6,128H400V113.3z M206.6,93.3c0-8.1,6.6-14.7,14.6-14.7h69.5   c8.1,0,14.6,6.6,14.6,14.7v20h-98.7V93.3z M341.6,417.9l0,0.4v0.4c0,8.1-6.6,14.7-14.6,14.7H186c-8.1,0-14.6-6.6-14.6-14.7v-0.4   l0-0.4L147.7,128h217.2L341.6,417.9z"/>
                            <g>
                            <rect height="241" width="14" x="249" y="160"/>
                            <polygon points="320,160 305.4,160 294.7,401 309.3,401"/>
                            <polygon points="206.5,160 192,160 202.7,401 217.3,401"/>
                            </g>
                        </g>
                        </svg>
                    </button>
                </div>
            </div>
            
            <div className="flex flex-row self-center gap-1">
                <button onClick={() => decreaseQty(_id as string, sizeId, colorId)} className="w-5 h-5 self-center rounded-full border border-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14" />
                    </svg>
                </button>
                <input type="text" value={quantity} className="w-8 h-8 text-center text-gray-900 text-sm outline-none border border-gray-300 rounded-sm"/>
                <button  onClick={() => increaseQty(_id as string, sizeId, colorId)} className="w-5 h-5 self-center rounded-full border border-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                </button>
            </div>
        </div>
    )
    
}

export default CartItem