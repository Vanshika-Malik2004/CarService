import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
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
        <nav>
          <Link to="addService">My Services</Link>
          <Link to="myAppointments">My Appointments</Link>
          <Link to="/">My Services</Link>
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
      updateCurrentUser(tempUser);
    }
  }, []);

  return <>{currentUser ? renderData() : null}</>;
};

export default ProviderDashboard;
