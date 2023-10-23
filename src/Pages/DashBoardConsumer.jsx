import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
const DashBoardConsumer = () => {
  const navigate = useNavigate();
  const { signOutUser, currentUser, updateCurrentUser } =
    useContext(AuthContext);
  const loggOut = async () => {
    await signOutUser();
    navigate("/login/user");
  };

  const renderData = () => {
    return (
      <div>
      <div className="flex justify-between m-3 p-2">
          <Typography>Consumer Dashboard</Typography>
          
          <button onClick={loggOut}>loggOut</button>
        </div>
      <nav className="flex justify-evenly m-5">
          <Link to="bookAppointment">Book Appointment</Link>
          <Link to="myAppointments">My Appointments</Link>
          {(currentUser.user_metadata.role == 'service_provider') &&
          <Link to="/dashboard/provider">Provider Dashboard</Link>}
        </nav>
        <Outlet/>
      </div>
    );
  };
  useEffect(() => {
    const tempUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!tempUser) {
      navigate("/login/user");
    } else {
      console.log(tempUser);
      updateCurrentUser(tempUser);
    }
  }, []);

  return <div>{currentUser ? renderData() : null}</div>;
};

export default DashBoardConsumer;
