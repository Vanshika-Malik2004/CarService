import { Link, Outlet, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
const NavbarForProviderDashboard = () => {
  const { signOutUser, currentUser, updateCurrentUser } =
    useContext(AuthContext);
  const navigate = useNavigate();
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
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={`fixed top-0 w-screen px-10 z-50 transition-all duration-500 flex justify-between  ${
        scrollY > 0
          ? "bg-white  backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200"
          : "bg-white border-b border-gray-200"
      }`}
    >
      <div className="flex justify-between w-full">
        <h3 className="text-lg font-bold py-3">Logo</h3>
        <div className="flex w-auto space-x-4 text-gray-900 gap-4">
          <Link
            to="update"
            className="font-semibold py-3 hover:border-b-2 hover:border-red-600"
          >
            Update Profile
          </Link>
          <Link
            to="myServices"
            className="font-semibold py-3 hover:border-b-2 hover:border-red-600"
          >
            My Services
          </Link>
          <Link
            to="myAppointments"
            className="font-semibold py-3 hover:border-b-2 hover:border-red-600"
          >
            My Appointments
          </Link>
          <button
            onClick={() => {
              loggOut();
            }}
            className=" my-2 align-middle text-white w-auto bg-gradient-to-r py-3 from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 text-center"
          >
            <p>Logout</p>
          </button>
        </div>
      </div>
      {/*   Required for testing
      {(currentUser.user_metadata.role == 'service_provider') &&
          <Link to="/dashboard/provider">Provider Dashboard</Link>} */}
    </nav>
  );
};

export default NavbarForProviderDashboard;
