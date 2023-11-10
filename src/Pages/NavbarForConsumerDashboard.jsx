import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
const NavbarForConsumerDashboard = () => {
  const loggOut = async () => {
    await signOutUser();
    toast.success("Logged out successfully !", {
      toastId: "Logout",
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    navigate("/login/user");
  };

  return (
    <nav className="flex backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200 justify-evenly fixed px-5 right-0 left-0 top-0 mb-20 bg-white z-10">
      <div className="flex justify-between w-full">
        <h3 className="text-lg font-bold py-3">Logo</h3>
        <div className="flex w-auto space-x-4 text-gray-900 gap-4">
          <Link
            to="bookAppointment"
            className="font-semibold py-3 hover:border-b-2 hover:border-red-600"
          >
            Book Appointment
          </Link>
          <Link
            to="allServices"
            className="font-semibold py-3 hover:border-b-2 hover:border-red-600"
          >
            Browse
          </Link>
          <Link
            to="myAppointments"
            className="font-semibold py-3 hover:border-b-2 hover:border-red-600"
          >
            My Appointments
          </Link>
          <button
            onClick={loggOut}
            className=" my-2 align-middle text-white w-auto bg-gradient-to-r py-3 from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 text-center"
          >
            <p>Logout</p>
          </button>
        </div>
      </div>

      {/* {(currentUser.user_metadata.role == 'service_provider') &&
          <Link to="/dashboard/provider">Provider Dashboard</Link>}*/}
    </nav>
  );
};

export default NavbarForConsumerDashboard;
