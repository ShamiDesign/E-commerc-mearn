import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/auth/AuthProvider";
import CartProvider from "./context/cart/CartProvider";
import HomePage from "./pages/Home";
import Navbar from "./compotent/Navbar";
import RegisterPage from "./pages/RegisterPage";
import Login from "./pages/Login";
import CartPage from "./pages/CartPage";
import  Checkout  from "./pages/Checkout";
import  SuccessOrder  from "./pages/SuccessOrder";
import ProtectedRout from "./compotent/ProtectedRout";
import "./App.css";

const App = () => {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRout />}>
                <Route path="/CartPage" element={<CartPage />} />
                <Route path="/Checkout" element={<Checkout />} />
                <Route path="/SuccessOrder" element={<SuccessOrder />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </>
  );
};

export default App;
