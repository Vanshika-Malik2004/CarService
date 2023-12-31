import "./App.css";
import "react-country-state-city/dist/react-country-state-city.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
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
import Calendar from "./Components/Calendar";
import SomeComponent from "./Components/SomeComponent";
import ProviderDashboard from "./ProviderDashboard/ProviderDashboard";
import MyServices from "./ProviderDashboard/MyServices";
import AddServcie from "./ProviderDashboard/AddServcie";
import Appointments from "./ProviderDashboard/Appointments";
import BookTimingComponent from "./Components/BookingTimingComponent";
import BookAppointment from "./Components/BookAppointment";
import CustomerAppointments from "./Components/CustomerAppointments";
import AllServiceProviders from "./Pages/AllServiceProviders";
import AllServices from "./Pages/AllServices";
import ProfileImage from "./ProviderDashboard/ProfileImage";
import UpdateProfile from "./ProviderDashboard/UpdateProfile";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />

      <Route path="/createuser" element={<CreateAccount />}>
        <Route index element={<RegisterUser />} />
      </Route>
      <Route path="/login" element={<LoginPage />}>
        <Route path="user" element={<LoginUser />} />
      </Route>
      <Route path="/manage/business" element={<ManageBusiness />} />
      <Route path="/dashboard">
        <Route path="user" element={<DashBoardConsumer />}>
          <Route index element={<Navigate to="allServices" replace/>} />
          <Route path="services/:id" element={<BookAppointment />} />
          <Route path="allServices" element={<AllServiceProviders />} />
          <Route path="myAppointments" element={<CustomerAppointments />} />
        </Route>

        <Route path="provider" element={<ProviderDashboard />}>
          <Route index element={<Navigate to="myServices" replace/>} />
          <Route path="manageBusiness" element={<ManageBusiness />} />
          <Route path="myServices" element={<MyServices />} />
          {/* <Route path="addService" element={<AddServcie />} /> */}
          <Route path="myAppointments" element={<Appointments />} />
          <Route path="update" element={<UpdateProfile />} />
        </Route>
      </Route>
      <Route path="timeSlot" element={<BookTimingComponent />} />
      <Route path="calendar" element={<Calendar workingDaysOfWeek={[1,2,3,4]} />} />
      <Route path="test" element={<UpdateProfile/>}/>
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
