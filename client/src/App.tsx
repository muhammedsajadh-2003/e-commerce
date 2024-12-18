import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import HomePage from "./pages/Home"
import LoginPage from "./pages/Login"
import RegistrationPage from "./pages/Registration"
import { CartDrawer } from "./pages/Cart"
import Dashboard from "./pages/Dashboard"
import ProductListing from "./pages/Products"
import ProductPage from "./pages/Aproduct"
import AddProductPage from "./pages/AddProduct"
import PaymentPage from "./pages/Payment"
import PaymentConfirmationPage from "./pages/AfterPyment"


function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegistrationPage/>} />
      <Route path="/cart" element={<CartDrawer/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/products" element={<ProductListing/>} />
      <Route path="/aproduct/:productId" element={<ProductPage/>} />
      <Route path="/addProduct" element={<AddProductPage/>} />
      <Route path="/payment" element={<PaymentPage/>} />
      <Route path="/afterPayment" element={<PaymentConfirmationPage/>} />
    </Routes>
      <Footer/>
    </BrowserRouter>
      </>
       
  )
}

export default App
