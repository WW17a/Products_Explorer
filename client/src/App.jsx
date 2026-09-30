import "./App.css";

import { Suspense, lazy } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SuspenseLoader from "./components/common/SuspenseLoader";
import About from "./pages/About";
import AppLayout from "./components/layout/AppLayout";
import { Toaster } from "sonner";

const Products = lazy(() => import("./pages/products"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Cart = lazy(() => import("./pages/Cart"));
const CheckOut = lazy(() => import("./pages/Checkout"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        richColors
        closeButton
      />

      <Suspense fallback={<SuspenseLoader />} >
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />


          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/payment-success/:orderId" element={<PaymentSuccess />} />

            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

