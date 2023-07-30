import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
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
        <p>"ConsumerDashBoard"</p>
        <button onClick={loggOut}>loggOut</button>
      </div>
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

  return <div>{currentUser ? renderData() : null}</div>;
};

export default DashBoardConsumer;
