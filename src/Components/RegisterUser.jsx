import React, { useContext, useState } from "react";
import ServiceImg from "../assets/service.svg";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../SupabaseConfig";
import { AuthContext } from "../context/AuthProvider";
const RegisterUser = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [role, setRole] = useState(null);
  const { currentUser, signOutUser, signIn, loginUser } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const register = async (e) => {
    e.preventDefault();
    if (email == null || password == null) {
      return;
    }
    const { data, error } = await signIn(email, password, role);
    if(error){
      console.log("Error in signup : \n",error);
    }
    if (data) {
      console.log(data);
      if (data.user.user_metadata.role == "service_provider") {
        navigate("/manage/business");
      } else {
        navigate("/dashboard/user");
      }
    }
  };
  const handleChnage = (e) => {
    setRole(e.target.value);
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-12">
      <h1 className="text-center bold text-5xl  p">Create Account</h1>
      <div className="flex flex-row justify-center items-center gap-12">
        <div>
          <form
            className="p-12 custom_shadows  flex flex-col justify-center items-start gap-5 w-fit"
            onSubmit={(e) => register(e)}
          >
            <div>
              <label>Email</label>
              <br />
              <input
                required
                type="text"
                placeholder="enter email"
                value={email}
                className="border border-black-100 p-2 w-60"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div>
              <label>Password</label>
              <br />
              <input
                required
                type="password"
                placeholder="enter password"
                className="border border-black-100 p-2 w-60"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="text-start mt-0 flex flex-col justify-start items-start">
              <br />
              <label>
                <input
                  type="radio"
                  value="service_provider"
                  name="role"
                  onChange={handleChnage}
                />
                Service Provider
                <br />
              </label>
              <label>
                <input
                  type="radio"
                  value="customer"
                  name="role"
                  onChange={handleChnage}
                />
                Customer
              </label>
            </div>
            <button className="bg-red-500 py-2 px-11 text-white w-60 ">
              Create Account
            </button>
          </form>
        </div>
        {/*the image*/}
        <img src={ServiceImg} />
      </div>
    </div>
  );
};

export default RegisterUser;
