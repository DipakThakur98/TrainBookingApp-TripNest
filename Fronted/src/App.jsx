import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Train from "./pages/Train";
import Flight from "./pages/Flight";
import MyHotel from "./pages/MyHotel";
import Pnrstatus from "./pages/PnrStatus";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import LoginForm from "./login/Loginform";

import RegisterForm from "./login/RegisterForm";
import ProtectedRoute from "./login/ProtectedRoute";
import DashboardCharts from "./AdminPanel/components/Charts/DashboardCharts";
import Payment from "./PaymentGetWay/Payment";
import UserManagement from "./AdminPanel/components/managements/UserManagement";
import TrainManagement from "./AdminPanel/components/managements/TrainManagement";
import BookingManagement from "./AdminPanel/components/managements/BookingManagement";
// import BookingConfirmation from "./PassengerForms/BookingConfirmation";
import PassengerForm from "./PassengerForms/PassengerForm";
import axios from "axios";

const token = localStorage.getItem("token");

if (token) {
  axios.defaults.headers.common["Authorization"] = token;
}


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/train" element={<Train />} />
        <Route path="/passengerform" element={<PassengerForm />} />
        {/* <Route path="/booking-confirmation" element={<BookingConfirmation/>}/> */}
        <Route path="/payment" element={<Payment />} />
        <Route path="/flight" element={<Flight />} />
        <Route path="/myhotel" element={<MyHotel />} />
        <Route path="/loginform" element={<LoginForm />} />
        <Route path="/registerform" element={<RegisterForm />} />
        <Route path="/pnrstatus" element={<Pnrstatus />} />

        {/* Dashboard Routes */}
        <Route
          path="/dashboardchart"
          element={
            <ProtectedRoute adminOnly={true}>
              <DashboardCharts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute adminOnly={true}>
              <UserManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trains"
          element={<ProtectedRoute adminOnly={true}><TrainManagement /></ProtectedRoute>}
        />

        <Route
          path="/bookings"
          element={
            <ProtectedRoute adminOnly={true}>
              <BookingManagement />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Layout>
  );
}

export default App;
