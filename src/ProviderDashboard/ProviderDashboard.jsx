import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Typography } from "@mui/material";
const ProviderDashboard = () => {
  const navigate = useNavigate();
  const { signOutUser, currentUser, updateCurrentUser } =
    useContext(AuthContext);
  const loggOut = async () => {
    await signOutUser();
    navigate("/login/user");
  };

  const renderData = () => {
    return (
      <>
        <div className="flex justify-between m-3 p-2">
          <Typography>Provider Dashboard</Typography>
          
          <button onClick={loggOut}>loggOut</button>
        </div>
        <nav className="flex justify-evenly m-5">
          <Link to="manageBusiness">Manage Buisness</Link>
          <Link to="addService">My Services</Link>
          <Link to="myAppointments">My Appointments</Link>
          <Link to="/">My Services</Link>
          <Link to="/dashboard/user">Go to User Dashboard</Link>

        </nav>
        <Outlet/>
      </>
    );
  };
  useEffect(() => {
    const tempUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!tempUser) {
      navigate("/login/user");
    } else {
      if(tempUser.user_metadata.role != "service_provider")
      {
        navigate("/dashboard/user");
      }
      updateCurrentUser(tempUser);
    }
  }, []);

  return <>{currentUser ? renderData() : null}</>;
};

export default ProviderDashboard;
