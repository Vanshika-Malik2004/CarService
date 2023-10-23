import React, { useContext, useEffect, useState } from "react";
import WeekDayButton from "../Components/WeekDayButton";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { supabase } from "../SupabaseConfig";
import { Box } from "@mui/material";


const lableClass = "font-sans	font-medium font text-lg m-4";
const inputClass = "border border-black-200 py-0.5 m-2 w-60 max-w-fit ";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    width: 'calc(100% - 150px)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const CreateNewService = ({handleClose,pid,success}) => {
  const navigate = useNavigate();

  const [serviceName, setServiceName] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sendData = {
      'Service Name': serviceName,
      Price: price,
      Description: description,
      ProviderID: pid,
    };
    console.log('send data : ',sendData);
    const { data, error } = await supabase
      .from("ServicesTable")
      .insert([sendData])
      .select();
    if (data) {
        success();
    //   console.log("data", data);
    } 
    // else {
    //   console.log("error", error);
    // }
    
    handleClose();
  };


  return (
    <Box sx={style} flexDirection={'column'}>
    <div className="flex flex-row-reverse" >
       <button onClick={handleClose}>X</button>
    </div>
    <div>
      <div className="m-4">
          <h1 className="custom_font text-rose-700">
            let's register your new service
          </h1>
        </div>
        <form
          className="flex flex-row gap-6"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <section className="flex flex-col w-full gap-4 items-start justify-start">
          
            <label className={lableClass}>
              Service Name
              <input
                className={inputClass}
                type="text"
                value={serviceName}
                onChange={(e) => {
                  setServiceName(e.target.value);
                }}
              />
            </label>
  
            <label className={lableClass} style={{flexDirection:'column'}}>
              Service Description
              <textarea
               className={inputClass + 'flex'} 
                type="text"
                
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              >

              </textarea>
              
            </label>
           
            <label className={lableClass}>
              Price
              <input
                className={inputClass}
                type="number"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </label>    
             
            <button className="bg-red-600 py-2 px-20 m-6 text-white text-xl w-fit font-semibold hover:-">
              Submit
            </button>
          </section>
        </form>
    </div>
    </Box>
  );
};

export default CreateNewService;
