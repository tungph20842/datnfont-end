import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartItem } from "../context/ShoppingCartContext";
import { IColor } from "../interfaces/color";
import { ISize } from "../interfaces/size";
interface TokenPayload {
  id: string;
  username: string;
  email: string
  // Bạn cần thêm các trường khác từ payload token nếu cần
}

const PayPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [sizes, setSizes] = useState<ISize[]>([]); // Add your size data
  const [colors, setColors] = useState<IColor[]>([]);
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<string>("cashOnDelivery");
  const isLoggedIn = !!localStorage.getItem("token");
  const [formData, setFormData] = useState({
    fullname: "",
    phonenumber: "",
    email: "",
    address: "",

  });
  useEffect(() => {
    // Fetch cart information from local storage
    const storedCart: string | null = localStorage.getItem("shopping_cart");
    if (storedCart !== null) {
      const parsedCart: CartItem[] = JSON.parse(storedCart);
      setCartItems(parsedCart);
    }
    axios
      .get<ISize[]>("http://localhost:8080/api/size")
      .then((response) => setSizes(response.data))
      .catch((error) => console.error("Error fetching size data:", error));

    // Fetch color data from your API
    axios
      .get<IColor[]>("http://localhost:8080/api/color")
      .then((response) => setColors(response.data))
      .catch((error) => console.error("Error fetching color data:", error));
    console.log(storedCart);
    const storedDiscount: string | null = localStorage.getItem("Discount_Type");
    if (storedDiscount !== null) {
      const discountValue: number = parseFloat(storedDiscount);
      setDiscount(discountValue);
    }
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        const { username, email } = decoded;
        setFormData({
          ...formData,
          fullname: username || "",
          email: email || "",
        });
      } catch (error) {

      }
    }

  }, []);
  const voucherId = localStorage.getItem("id");
  console.log("voucher:", voucherId);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const getSizeNameById = (sizeId: string) => {
    const size = sizes.find((s) => s._id === sizeId);
    return size ? size.name : "Unknown Size";
  };
  const getColorNameById = (colorId: string) => {
    const color = colors.find((c) => c._id === colorId);
    return color ? color.name : "Unknown Color";
  };

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not found in localStorage.");
      return null;
    }

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      console.log("id", decoded); // Kiểm tra xem decoded token có đúng không
      return decoded.id;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };
  const id = getUserIdFromToken();
  console.log(id);


  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userId = getUserIdFromToken() || ""
      // Kiểm tra trạng thái của người dùng trước khi đặt hàng
      const userStatusResponse = await axios.get(`http://localhost:8080/api/user/${userId}`);
      const userStatus = userStatusResponse.data.status;

      if (userStatus === "block") {
        // Người dùng bị chặn, không thể đặt hàng
        toast.error("Tài khoản của bạn đã bị chặn và không thể đặt hàng.", { autoClose: 2000 });
        return;
      }
      const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
      if (!formData.email.match(emailRegex)) {
        toast.error('Định dạng email không hợp lệ', { autoClose: 2000 });
        return;
      }

      const phoneRegex = /^0\d{9}$/;
      if (!formData.phonenumber.match(phoneRegex)) {
        toast.error('Số điện thoại không hợp lệ', { autoClose: 2000 });
        return;
      }
      if (!userId) {
        const dataFormNoId = {
          fullname: formData.fullname,
          phonenumber: formData.phonenumber,
          email: formData.email,
          address: formData.address,
          Discount: discount,
          isPaid: paymentMethod === "vnpay" ? true : false,
          orderTotal: totalPrice - discount,
          orderDetails: cartItems.map((item) => ({
            productId: item._id,
            name: item.name,
            img: item.img[0],
            quantity: item.quantity,
            price: item.price,
            sizeId: item.sizeId,
            colorId: item.colorId,
            voucherId: voucherId,
          })),
        };
        const createOrder = await axios.post(
          "http://localhost:8080/api/orderNoId",
          dataFormNoId
        )
        localStorage.removeItem('Discount_Type')
        localStorage.removeItem('Quantity')
        localStorage.removeItem('id')
        localStorage.removeItem('shopping_cart')
        toast.success("Đặt hàng thành công", { autoClose: 2000 });

        setTimeout(() => {
          navigate("/successful");
        }, 3000);
        return;
      }
      const dataForm = {
        userId: userId,
        fullname: formData.fullname,
        phonenumber: formData.phonenumber,
        email: formData.email,
        address: formData.address,
        Discount: discount,
        isPaid: paymentMethod === "vnpay" ? true : false,
        orderTotal: totalPrice - discount,
        orderDetails: cartItems.map((item) => ({
          name: item.name,
          img: item.img[0],
          productId: item._id,
          quantity: item.quantity,
          price: item.price,
          sizeId: item.sizeId,
          colorId: item.colorId,
          voucherId: voucherId,
        })),
      };
      if (paymentMethod === "cashOnDelivery") {
        const createOrder = await axios.post(
          "http://localhost:8080/api/order",
          dataForm
        )
        localStorage.removeItem('Discount_Type')
        localStorage.removeItem('Quantity')
        localStorage.removeItem('id')
        localStorage.removeItem('shopping_cart')
        setTimeout(() => {
          navigate("/successful");
        }, 3000);
        toast.success("Đặt hàng thành công", { autoClose: 2000 });

      } else if (paymentMethod === "vnpay") {
        const vnPay = await axios.post(
          "http://localhost:8080/api/createVnpay",
          dataForm
        );
        if (vnPay.data) {
          window.location.href = vnPay.data;
        }
      }


      // Send order data to your server
      // const response = await axios.post("http://localhost:8080/api/order", );
      // localStorage.removeItem("Discount_Type");



      // console.log("Order created:", response.data);
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Hãy điền đầy đủ thông tin", { autoClose: 2000 });
      // Handle error, e.g., show an error message to the user
    }
  };

  return (

    <div className="mt-5">
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 ">
          <div className=" space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {cartItems.map((item) => (
              <div key={item._id} className="flex flex-col rounded-lg bg-white sm:flex-row">
                <img className="m-2 h-[103px] w-28 rounded-md border object-cover object-center" src={item.img[0]} alt="" />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">{item.name}</span>
                  <p className="font-semibold">{`Số lượng: ${item.quantity}`}</p>
                  <span className="float-right text-gray-400">{`Size: ${item.sizeId !== null ? getSizeNameById(String(item.sizeId)) : "N/A"}`}</span>
                  <p className="float-right text-gray-400">{`Color: ${item.colorId !== null ? getColorNameById(String(item.colorId)) : "N/A"}`}</p>

                  <p className="text-lg font-bold text-red-500">{(item.price * item.quantity).toLocaleString()}đ</p>
                </div>
              </div>
            ))}


          </div>

          <p className="mt-8 text-lg font-medium">Hình thức thanh toán</p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input className="peer hidden" id="radio_1" type="radio" name="radio" value="cashOnDelivery" checked={paymentMethod === "cashOnDelivery"} onChange={() => setPaymentMethod("cashOnDelivery")} />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_1">
                <img className="w-14 h-6 object-contain" src="/icons8-cash-48.png" alt="" />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Thanh toán khi nhận hàng</span>
                </div>
              </label>
            </div>

            <div className={`relative ${isLoggedIn ? '' : 'opacity-50 pointer-events-none'}`}>
              <input className="peer hidden" id="radio_2" type="radio" name="radio" value="vnpay" checked={paymentMethod === "vnpay"}
                onChange={() => setPaymentMethod("vnpay")}
                disabled={!isLoggedIn} />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_2">
                <img className="w-14 object-contain" src="/vnpay-seeklogo.com.svg" alt="" />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Thanh toán bằng VnPay</span>
                </div>
              </label>
            </div>
            {!isLoggedIn && (
              <p className="text-sm text-gray-500 mt-2">
                <span className="text-sky-500 underline"> <a href="/signin">Đăng nhập</a></span> để sử dụng thanh toán bằng VnPay
              </p>
            )}

          </form>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">

            <div className="relative">
              <label htmlFor="fullname" className="mt-4 mb-2 block text-sm font-medium">Họ Và Tên</label>
              <div className="">
                <input onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                  value={formData.fullname}
                  disabled={!!localStorage.getItem("token")}
                  type="text" id="fullname" name="fullname" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Họ Và Tên" />

              </div>
              <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">Email</label>
              <div className="">
                <input onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  value={formData.email}
                  disabled={!!localStorage.getItem("token")}
                  type="text" id="email" name="email" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="your.email@gmail.com" />
              </div>
              <label htmlFor="phonenumber" className="mt-4 mb-2 block text-sm font-medium">Số Điện Thoại</label>
              <div className="relative">
                <input onChange={(e) => setFormData({ ...formData, phonenumber: e.target.value })}
                  value={formData.phonenumber}
                  type="text" id="phonenumber" name="phonenumber" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-3 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="0123456789" />
              </div>
              <label htmlFor="Address" className="mt-4 mb-2 block text-sm font-medium">Địa chỉ</label>
              <div className="flex">
                <div className="relative w-full flex-shrink-0">
                  <input onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    value={formData.address} type="text" id="Address" name="address" className="w-full rounded-md border border-gray-200 px-2 py-3 pl-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Địa chỉ" />
                </div>
              </div>
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Tổng tiền hàng</p>
                  <p className="font-semibold text-gray-900"> {`${totalPrice.toLocaleString()}`}đ</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Voucher</p>
                  <p className="font-semibold text-gray-900">{` ${(discount).toLocaleString()} đ`}</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Tổng thanh toán</p>
                <p className="text-2xl font-semibold text-gray-900">{`${(totalPrice - discount).toLocaleString()}đ`}</p>
              </div>
            </div>
            <button type="submit" className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Đặt Hàng</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PayPage;
