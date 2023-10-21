import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import MainLayout from "./Layouts/MainLayout";
import CreateAccount from "./Pages/CreateAccount";
import RegisterUser from "./Components/RegisterUser";
import LoginPage from "./Pages/LoginPage";
import LoginUser from "./Components/LoginUser";
import { useEffect, useState } from "react";
import { supabase } from "./SupabaseConfig";
import DashBoardConsumer from "./Pages/DashBoardConsumer";
import ManageBusiness from "./Pages/ManageBusiness";
import { AuthProvider } from "./context/AuthProvider";
import Calender from "./Components/Calender";
import SomeComponent from "./Components/SomeComponent";
import ProviderDashboard from "./ProviderDashboard/ProviderDashboard";
import MyServices from "./ProviderDashboard/MyServices";
import AddServcie from "./ProviderDashboard/AddServcie";
import Appointments from "./ProviderDashboard/Appointments";
import BookTimingComponent from "./Components/BookingTimingComponent";
import BookAppointment from "./Components/BookAppointment";
import CustomerAppointments from "./Components/CustomerAppointments";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/bookAppointment" element={<BookAppointment />} />
      <Route path="/customer/myAppointments" element={<CustomerAppointments />} />

      <Route path="/createuser" element={<CreateAccount />}>
        <Route index element={<RegisterUser />} />
      </Route>
      <Route path="/login" element={<LoginPage />}>
        <Route path="user" element={<LoginUser />} />
      </Route>
      <Route path="/manage/business" element={<ManageBusiness />} />
      <Route path="/dashboard/user" element={<DashBoardConsumer />} />
      <Route path="/dashboard/provider" element={<ProviderDashboard />}>
        <Route index element={<MyServices />} />
        <Route path="myServices" element={<MyServices />} />
        <Route path="addService" element={<AddServcie />} />
        <Route path="myAppointments" element={<Appointments />} />
      </Route>
      <Route path="timeSlot" element={<BookTimingComponent />} />
      <Route path="/calender" element={<Calender />} />
    </Route>
  )
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
