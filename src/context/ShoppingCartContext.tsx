import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify"

type ShoppingContextProviderProps = {
    children: ReactNode
}
export type CartItem = {
    _id: number | string
    name: string
    price: number
    quantity: number,
    img: string[]
    sizeId: string | null
    colorId: string | null
    warehouse: { sizeId: string; colorId: string; quantity: number }[];
}

interface ShoppingContextType {
    cartQty: number
    totalPrice: number
    cartItem: CartItem[]
    increaseQty: (id: string, sizeId: string, colorId: string) => void;
    decreaseQty: (id: string, sizeId: string, colorId: string) => void;
    addCartItem: (item: CartItem) => void
    removeCartItem: (id: string, sizeId: string, colorId: string) => void;
    clearCart: () => void
}
export const useShoppingContext = () => {
    return useContext(ShoppingContext)
}
//useContext có chứa Consumer để giúp chúng ta có thể nhận được dữ liệu
//từ Provider bằng cách chuyền shoppingContext vào useContext 
//Bây giờ ShoppingContext.Provider có value là gì thì useShoppingContext
//sẽ nhận được nó ở đây
const ShoppingContext = createContext<ShoppingContextType>({} as ShoppingContextType)
//createContext tạo ra một cái object chứa Provider,Consumer để giúp chúng ta 
//có thể cung cấp gữ liệu và nhận giữ liệu (Provider,Consumer nó là react component)
export const ShoppingContextProvider = ({ children }: ShoppingContextProviderProps) => {
    const [cartItem, setCartItem] = useState<CartItem[]>(() => {
        const jsonCartData = localStorage.getItem('shopping_cart')
        // localStorage.setItem('Quantity', )
        return jsonCartData ? JSON.parse(jsonCartData) : []
    })

    useEffect(() => {
        localStorage.setItem('shopping_cart', JSON.stringify(cartItem))
    }, [cartItem])
    console.log(cartItem)
    const cartQty = cartItem.length
    const totalPrice = cartItem.reduce((total, item) => total + item.quantity * item.price, 0)
   
    const increaseQty = (id: string, sizeId: string, colorId: string) => {
        console.log("increaseQty => ", id);
        const currentCartItem = cartItem.find(item =>
            item._id === id &&
            item.colorId === colorId &&
            item.sizeId === sizeId
        );
    
        if (currentCartItem) {
            const warehouseQuantity = getWarehouseQuantity(sizeId, colorId, currentCartItem.warehouse);
            if (currentCartItem.quantity < warehouseQuantity) {
                const newItems = cartItem.map((item) => {
                    if (
                        item._id === id &&
                        item.colorId === colorId &&
                        item.sizeId === sizeId
                    ) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
                setCartItem(newItems);
                
            } else {
                // toast.error("Kho hàng không đủ!", { autoClose: 2000 });
                toast.error("Số lượng bạn chọn đã đạt mức tối đa của sản phẩm này!", { autoClose: 2000 });

            }
        }
    };
    
    const getWarehouseQuantity = (sizeId: string, colorId: string, warehouse: any[]): number => {
        // Tìm kiếm dữ liệu kho hàng dựa trên sizeId và colorId
        const warehouseItem = warehouse.find(
            (item) => item.sizeId === sizeId && item.colorId === colorId
        );
        console.log(warehouseItem);
    
        // Trả về số lượng hàng tồn kho hoặc 0 nếu không tìm thấy
        return warehouseItem ? warehouseItem.quantity : 0;
    };
    
    const decreaseQty = (id: string , sizeId:string , colorId:string) => {
        console.log("increaseQty => ", id);
        const currentCartItem = cartItem.find(item =>  
            item._id === id && 
            item.colorId ===colorId &&
            item.sizeId === sizeId)
        if (currentCartItem?.quantity == 1) {
            removeCartItem(id,sizeId,colorId);
        } else {
            const newItems = cartItem.map((item) => {
                if (item._id === id &&
                    item.colorId ===colorId &&
                    item.sizeId === sizeId) {
                    return { ...item, quantity: item.quantity - 1 }

                } else {
                    return item
                }
            })
            setCartItem(newItems)
        }
    }
    const addCartItem = (product: CartItem) => {
        console.log("product", product)
        if (product) {
            const currentCartItem = cartItem.find(
                (item) =>
                    item._id === product._id &&
                    item.sizeId === product.sizeId &&
                    item.colorId === product.colorId
            );   
            const warehouseQuantity = getWarehouseQuantity(product.sizeId, product.colorId, product.warehouse);
            if (currentCartItem) {
                const newItems = cartItem.map((item) => {
                    if (
                        item._id === product._id &&
                        item.sizeId === product.sizeId &&
                        item.colorId === product.colorId
                    ) {
                        console.log(item.quantity);
                        console.log(product.quantity)
                        const newQuantity = item.quantity + product.quantity;
 
                        // Kiểm tra số lượng tồn kho trước khi cập nhật giỏ hàng
                        if (newQuantity <= warehouseQuantity && product.quantity > 0) {
                            toast.success(`Thêm ${product.quantity} sản phẩm vào giỏ hàng thành công `, { autoClose: 2000 })
                            return { ...item, quantity: newQuantity };
                        } else {
                            toast.error(`Bạn đã có ${item.quantity} sản phẩm này trong giỏ hàng. Bạn chỉ có thể thêm ${warehouseQuantity-item.quantity} sản phẩm`, { autoClose: 2000 });
                            // console.log(error)
                            return {...item};
                        }
                    } else {
                        return item;
                    }
                });
                setCartItem(newItems);
            } else {
                if (product.quantity <= warehouseQuantity) {
                    const newItem = { ...product };
                    setCartItem([...cartItem, newItem]);
                    toast.success(`Thêm ${product.quantity} sản phẩm vào giỏ hàng thành công `, { autoClose: 2000 });
                } else {
                    toast.error("Kho hàng không đủ!", { autoClose: 2000 });
                }
            }
        }
    };
    
    const removeCartItem = (id: string , sizeId:string , colorId:string) => {
        console.log("removeCartItem =>", id);
        const currentCartItemIndex = cartItem.findIndex((item) => 
            item._id === id &&
            item.colorId ===colorId &&
            item.sizeId === sizeId)
        const newItem = [...cartItem]
        newItem.splice(currentCartItemIndex, 1)
        setCartItem(newItem)
    }
    const clearCart = () => {
        console.log("clearCart =>");
        setCartItem([])

    }
    localStorage.setItem('cartItem', cartItem)

    return (
        <ShoppingContext.Provider value={{ cartItem, cartQty, totalPrice, increaseQty, decreaseQty, addCartItem, clearCart, removeCartItem }}>
            {children}
        </ShoppingContext.Provider>
    )

}
//Tạo ta một cái Provider có props tên là value nó nhận một cái dữ liệu gì đó,
//Tất cả những cái children của cái Provider đều có thể nhận được dữ liệu trong value
//
export default ShoppingContext