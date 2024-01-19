import { Routes, Route } from "react-router-dom";
import "./App.css";
import UsersLayout from "./components/Layout/UsersLayout";
import HomePage from "./Pages/HomePage";
import DetailPage from "./Pages/DetailPage";
import PayPage from "./Pages/PayPage";
import CartPage from "./Pages/CartPage";
import BlogPage from "./Pages/BlogPage";
import Login from "./Pages/Login";
import Admin from "./components/Layout/Admin";
import Dashboard from "./Pages/Admin/dashboard";
import CommentManagement from "./Pages/Admin/Comment/CommentManagement";
import Message from "./Pages/Admin/Comment/Message";
import ListCategories from "./Pages/Admin/Categories/ListCategories";
import AddCategories from "./Pages/Admin/Categories/AddCategories";
import UpdateCategories from "./Pages/Admin/Categories/UpdateCategories";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import ListVouchers from "./Pages/Admin/Vouchers/ListVouchers";
import AddVouchers from "./Pages/Admin/Vouchers/AddVouchers";
import UpdateVouchers from "./Pages/Admin/Vouchers/UpdateVouchers";
import ProductPage from "./Pages/ProductPage";
import ListUsers from "./Pages/Admin/Users/ListUsers";
import ProductManager from "./Pages/Admin/Product/ProductManager";
import AddProduct from "./Pages/Admin/Product/AddProduct";
import UpdateProduct from "./Pages/Admin/Product/UpdateProduct";
import OrderHistory from "./Pages/OrderHistory";
import OrderDetails from "./Pages/OrderDetails";
import ListOrders from "./Pages/Admin/Order/ListOrders";
import InvoiceDetails from "./Pages/Admin/Order/InvoiceDetails";
import Contact from "./Pages/Contact";
import ListContact from "./Pages/Admin/Contact/ListContact";
import { addproduct } from "./api/product";
import { addBlog } from "./api/blog";

import UpdateUser from "./Pages/Admin/Users/Edituser";
import ListBlog from "./Pages/Admin/Blog/ListBlog";
import AddBlog from "./Pages/Admin/Blog/AddBLog";
import EditBlog from "./Pages/Admin/Blog/EditBlog";
import DetailBlogPage from "./Pages/DetailBlog";
import EditContact from "./Pages/Admin/Contact/EditContact";
import Successful from "./components/Successful";
import Information from "./components/Information";
import ListColors from "./Pages/Admin/Color/ListColors";
import ListSizes from "./Pages/Admin/Size/ListSizes";
import { addColor } from "./api/color";
import { addSize } from "./api/size";
import AddColor from "./Pages/Admin/Color/AddColors";
import AddSize from "./Pages/Admin/Size/AddSizes";
import UpdateColors from "./Pages/Admin/Color/UpdateColors";
import UpdateSizes from "./Pages/Admin/Size/UpdateSizes";
import { AnalyticPage } from './Pages/Admin/Analytics'
import ListSizeAndColor from "./Pages/Admin/SizeAndColor/ListSizeAndColor";
import UpdateSizeAndColor from "./Pages/Admin/SizeAndColor/UpdateSizeAndColor";
import ForgotPassword from "./Pages/ForgotPasswordForm";
import ResetPassword from "./Pages/ResetPassword";
import ChangePassword from "./components/ChangePassword";
function App() {
  
  const onHandleAddBlog = async (blog: any) => {
    try {
      const response = await addBlog(blog)
      console.log(response)
    } catch (error) {
      console.log(error)

    }
  }
  const onHandleAddColor = async (color: any) => {
    try {
      const response = await addColor(color)
      console.log(response)
    } catch (error) {
      console.log(error)

    }
  }
  const onHandleAddSize = async (size: any) => {
    try {
      const response = await addSize(size)
      console.log(response)
    } catch (error) {
      console.log(error)

    }
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<UsersLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/product/:productId" element={<DetailPage />} />
          <Route path="/categories/:categoryId" element={<ProductPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:blogId" element={<DetailBlogPage />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/purchase" element={<OrderHistory />} />
          <Route path="/purchase/order/:orderId" element={<OrderDetails />} />
          <Route path="/pay" element={<PayPage />} />
          <Route path="/cart" element={<CartPage />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/successful" element={<Successful />} />
          <Route path="/information/:id" element={<Information />} />
          <Route path="/ChangePassword/:id" element={<ChangePassword />} />
        </Route>
        <Route path="/admin" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path='analytics' element={<AnalyticPage />} />
          <Route path="messages" element={<CommentManagement />} />{" "}
          {/* Thêm đường dẫn mới tại đây */}
          <Route path="messages/comment/:productId" element={<Message />} />
          <Route path="color" element={<ListColors />} />
          <Route path="color/add" element={<AddColor onAdd={onHandleAddColor} />} />
          <Route path="color/update/:id" element={<UpdateColors />} />

          <Route path="size" element={<ListSizes />} />
          <Route path="size/add" element={<AddSize onAdd={onHandleAddSize} />} />
          <Route path="size/update/:id" element={<UpdateSizes />} />

          <Route path="productSize" element={<ListSizeAndColor />} />
          <Route path="productSize/update/:id" element={<UpdateSizeAndColor />} />

          <Route path="vouchers" element={<ListVouchers />} />
          <Route path="vouchers/add" element={<AddVouchers />} />
          <Route path="vouchers/update/:id" element={<UpdateVouchers />} />
          <Route path="Categories" element={<ListCategories />} />
          <Route path="Categories/add" element={<AddCategories />} />
          <Route path="Categories/update/:id" element={<UpdateCategories />} />
          <Route path="users" element={<ListUsers />} />
          <Route path="users/update/:id" element={<UpdateUser />} />

          <Route path="products" element={<ProductManager />} />
          <Route path="contact" element={<ListContact />} />
          <Route path="contact/update/:id" element={<EditContact />} />

          <Route path="products/add" element={<AddProduct />} />
          <Route path="blog" element={<ListBlog />} />
          <Route path="blog/add" element={<AddBlog onAdd={onHandleAddBlog} />} />
          <Route path="blog/update/:id" element={<EditBlog />} />
          <Route path="products/update/:id" element={<UpdateProduct />} />
          <Route path="orders" element={<ListOrders />} />
          <Route path="orders/orderdetail/:orderId" element={<InvoiceDetails />} />
        </Route>
      </Routes>
    </>
  );
}

export default App
