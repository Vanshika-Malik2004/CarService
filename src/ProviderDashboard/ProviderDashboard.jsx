import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import NavbarForProviderDashboard from "./NavbarForProviderDashboard";
const ProviderDashboard = () => {
  const navigate = useNavigate();
  const { signOutUser, currentUser, updateCurrentUser } =
    useContext(AuthContext);
  const loggOut = async () => {
    await signOutUser();
    toast.success('Logged out successfully !', {
      toastId:'Logout',
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

  const renderData = () => {
    return (
      <>
        <div className="flex justify-center items-center w-full px-20 pt-16 h-full bg-slate-100 pb-10">
        {<NavbarForProviderDashboard/>}
        {/* <div className="flex justify-between m-3 p-2">
          <Typography>Provider Dashboard</Typography>

          <button
            onClick={loggOut}><Typography>Logout</Typography>
          </button>
        </div> */}
        {/* <nav className="flex justify-evenly m-5">
          <Link to="update">Update Profile</Link>
          <Link to="myServices">My Services</Link>
          <Link to="myAppointments">My Appointments</Link>
        </nav> */}
        <Outlet />
        </div>
      </>
    );
  };
  useEffect(() => {
    const tempUser = JSON.parse(sessionStorage.getItem("currentUser"));
      if (!tempUser) {
        toast.error('First Login !', {
          toastId:'FirstLogin',
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
    } else {
      if (tempUser.user_metadata.role != "service_provider") {
        toast.info('Only Service providers can access this page', {
          toastId:'InfoToastProvidersOnly',
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        navigate("/dashboard/user");
      }
      updateCurrentUser(tempUser);
    }
  }, []);

  return <>{currentUser ? renderData() : null}</>;
};

export default ProviderDashboard;
