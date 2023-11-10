import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import NavbarForConsumerDashboard from "./NavbarForConsumerDashboard";
const DashBoardConsumer = () => {
  const navigate = useNavigate();
  const { signOutUser, currentUser, updateCurrentUser } =
    useContext(AuthContext);
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

  const renderData = () => {
    return (
      <div className="flex justify-center items-center w-full px-20 h-full bg-slate-100">
        {<NavbarForConsumerDashboard />}
        <Outlet />
      </div>
    );
  };
  useEffect(() => {
    const tempUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!tempUser) {
      toast.error("First Login !", {
        toastId: "FirstLogin",
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
      console.log(tempUser);
      updateCurrentUser(tempUser);
    }
  }, []);

  return <div>{currentUser ? renderData() : null}</div>;
};

export default DashBoardConsumer;
