import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import Home from "./components/Home/Home";
import Menu from "./components/Menu/Menu";
import Order from "./components/Order/Order";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminMenu from "./components/Admin/AdminMenu";
import AdminPage from "./components/Admin/AdminDashboard";
import CustomerLogin from "./components/Customer/CustomerLogin";
import CustomerRegister from "./components/Customer/CustomerRegister";
import AdminOrders from "./components/Admin/AdminOrders";
import AdminReservations from "./components/Admin/AdminReservations";
import ReservationPage from "./components/Reservation/Reservation";
import AdminCustomers from "./components/Admin/AdminCustomer";
import CustomerReservations from "./components/Customer/CustomerReservation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mainhome" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/orders" element={<Order />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/menu" element={<AdminMenu />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
      <Route path="/admin/page" element={<AdminPage />} />
      <Route path="/customer/customerLogin" element={<CustomerLogin />} />
      <Route path="/customer/customerRegister" element={<CustomerRegister />} />
      <Route path="/admin/reservations" element={<AdminReservations />} />
      <Route path="/reservationpage" element={<ReservationPage />} />
      <Route path="/reservations" element={<ReservationPage />} />
      <Route path="/admin/customers" element={<AdminCustomers />} />
      <Route path="/customer/reservations" element={<CustomerReservations />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
