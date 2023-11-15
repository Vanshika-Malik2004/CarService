import React, { useContext, useEffect, useState } from "react";
import WeekDayButton from "../Components/WeekDayButton";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { supabase } from "../SupabaseConfig";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { FaTimes, FaCar } from "react-icons/fa";
const lableClass = "font-sans	font-medium font text-lg m-4";
const inputClass = "border border-black-200 py-2 m-2 px-6";
const style = {
  bgcolor: "background.paper",
  boxShadow: 24,
  justifyContent: "center",
  alignItems: "center",
  p: 2,
};

const CreateNewService = ({ handleClose, pid, success }) => {
  const navigate = useNavigate();

  const [serviceName, setServiceName] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sendData = {
      "Service Name": serviceName,
      Price: price,
      Description: description,
      ProviderID: pid,
    };
    console.log("send data : ", sendData);
    const { data, error } = await supabase
      .from("ServicesTable")
      .insert([sendData])
      .select();
    if (data) {
      toast.success("Service added successfully !", {
        toastId: "ServiceAdded",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      success();
      //   console.log("data", data);
    } else {
      toast.error("Some thing went wrong !\n" + error, {
        toastId: "NewServiceError",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log("error", error);
    }

    handleClose();
  };

  return (
    <div className="w-full bg-white  backdrop-filter backdrop-blur-lg bg-opacity-30 flex flex-col justify-center items-center h-full">
      <button onClick={handleClose} className="absolute right-2 top-2">
        <FaTimes size={20} color="white" />
      </button>

      <Box sx={style} flexDirection={"column"} boxShadow={3} borderRadius={1}>
        <div className="flex justify-center items-center gap-4 w-full px-4">
          <span className="custom_font">Add Service</span>
          <span className="pt-2">
            {" "}
            <FaCar size={30} color="#DC2626" />
          </span>
        </div>
        <form
          className="flex flex-row gap-6 w-full justify-center items-center"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <section className="flex flex-col w-full gap-4 items-center justify-center">
            <input
              className={inputClass}
              type="text"
              value={serviceName}
              onChange={(e) => {
                setServiceName(e.target.value);
              }}
              placeholder="Service Name"
            />
            <input
              className={inputClass}
              type="number"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              placeholder="Set Price"
            />

            <textarea
              rows="4"
              cols="28"
              className={inputClass + "flex"}
              type="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Add Description"
            ></textarea>

            <button className="bg-red-700 w-3/4 my-2 py-3 rounded-sm text-white font-semibold text-xl transition-all duration-300 ease-in-out hover:scale-95">
              Submit
            </button>
          </section>
        </form>
      </Box>
    </div>
  );
};

export default CreateNewService;
