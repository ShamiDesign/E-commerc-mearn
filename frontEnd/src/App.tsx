import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/auth/AuthProvider";
import HomePage from "./pages/Home";
import Navbar from "./compotent/Navbar";
import RegisterPage from "./pages/RegisterPage";
import Login from "./pages/Login";
import "./App.css";


const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;
