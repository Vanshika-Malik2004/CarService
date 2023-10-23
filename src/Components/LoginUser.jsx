import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ServiceImg from "../assets/service.svg";
import { supabase } from "../SupabaseConfig";
import { AuthContext } from "../context/AuthProvider";
const LoginUser = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    if (email == null || password == null) {
      console.log("Email and Password can't be null")
      return;
    }
    const { data, error } = await loginUser(email, password);
    if(error)
    {
      console.log('Error in Login :\n',error);
    }
    if (data) {
      console.log("Login data :\n",data)
      if (data.user.user_metadata.role == "service_provider") {
        navigate("/dashboard/provider");
      } else {
        navigate("/dashboard/user");
      }
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-12">
      <h1 className="text-center bold text-5xl  p">Login</h1>
      <div className="flex flex-row justify-center items-center gap-12">
        <div>
          <form
            className="p-6 custom_shadows  flex flex-col justify-center items-center gap-5"
            onSubmit={(e) => {
              login(e);
            }}
          >
            <div>
              <label>Email</label>
              <br />
              <input
                type="text"
                placeholder="enter email"
                value={email}
                className="border border-black-100 p-2"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div>
              <label>Password</label>
              <br />
              <input
                type="password"
                placeholder="enter password"
                className="border border-black-100 p-2"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button className="bg-red-500 py-2 px-11 text-white">login</button>
          </form>
        </div>
        {/*the image*/}
        <img src={ServiceImg} />
      </div>
    </div>
  );
};

export default LoginUser;
