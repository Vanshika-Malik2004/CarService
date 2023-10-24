import React, { useContext, useEffect, useState } from "react";
import WeekDayButton from "../Components/WeekDayButton";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { supabase } from "../SupabaseConfig";
import { toast } from "react-toastify";
const weekDays = [
  { value: "monday", tag: "M", isSelected: false },
  { value: "tuesday", tag: "T", isSelected: false },
  { value: "wednesday", tag: "W", isSelected: false },
  { value: "thursday", tag: "Th", isSelected: false },
  { value: "friday", tag: "F", isSelected: false },
  { value: "saturday", tag: "Sat", isSelected: false },
  { value: "Sunday", tag: "S", isSelected: false },
];
const lableClass = "font-sans	font-medium font text-lg m-4";
const inputClass = "border border-black-200 py-0.5 m-2 w-60 max-w-fit ";
const ManageBusiness = () => {
  const navigate = useNavigate();
  const { signOutUser, currentUser, updateCurrentUser } =
    useContext(AuthContext);
  const [businessName, setBusinessName] = useState(null);
  const [ownerName, setOwnerName] = useState(null);
  const [contactNumber, setContactNumber] = useState(null);
  const [city, setCity] = useState(null);
  const [pin, setPin] = useState(null);
  const [address, setAddress] = useState(null);
  const [workingDays, setWorkingDays] = useState([]);
  const [openTime, setOpenTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [email, setEmail] = useState();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sendData = {
      name: businessName,
      email: email,
      address: address,
      pincode: pin,
      city: city,
      OwnerName: ownerName,
      ContactNumber: contactNumber,
    };
    const { data, error } = await supabase
      .from("ServiceProvider")
      .insert([sendData])
      .select();
    if (data) {
      console.log("data", data);
      const timeSlotData = {
        StartTime: openTime,
        EndTime: endTime,
        WorkingDays: workingDays,
        ProviderId: data[0].id,
      };
      const t = await supabase
        .from("TimeSlotTable")
        .insert([timeSlotData])
        .select();
      if (t.data) {
        toast.success('Successfully registered busiess !', {
          toastId:'SuccessfullyRegisteredBusiness',
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        console.log(t.data);
      } else {
        toast.error('Error !\n'+t.error, {
          toastId:'ManageBusinessRegisterError',
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
          console.log(t.error);
        }
        navigate("dashboard/provider/");
      } else {
      toast.error('Error !\n'+error, {
        toastId:'ManageBusinessSecondError',
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
  };
  const renderWeekDays = () => {
    return (
      <div className="grid-container-weekDays w-full">
        {weekDays.map((day,ind) => {
          return (
            <WeekDayButton
              key={ind}
              weekDay={day}
              setWorkingDays={setWorkingDays}
              workingDays={workingDays}
            />
          );
        })}
      </div>
    );
  };
  const renderData = () => {
    return (
      <>
        <div className="m-4">
          <h1 className="custom_font text-rose-700">
            let's register your business
          </h1>
        </div>
        <form
          className="flex flex-row gap-6"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <section className="flex flex-col w-full gap-4 items-start justify-start">
            {/*BUSINESS NAME */}
            <label className={lableClass}>
              Business Name
              <input
                className={inputClass}
                type="text"
                value={businessName}
                onChange={(e) => {
                  setBusinessName(e.target.value);
                }}
              />
            </label>
            {/*OWNER'S NAME */}
            <label className={lableClass}>
              Owner's name
              <input
                className={inputClass}
                type="text"
                value={ownerName}
                onChange={(e) => {
                  setOwnerName(e.target.value);
                }}
              />
            </label>
            {/*CONTACT NUMBER */}
            <label className={lableClass}>
              contactNumber
              <input
                className={inputClass}
                type="text"
                value={contactNumber}
                onChange={(e) => {
                  setContactNumber(e.target.value);
                }}
              />
            </label>
            {/*ADDRESS FIELD*/}
            <label className={lableClass}>
              Business Address
              <input
                type="text"
                className={inputClass}
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </label>
            {/*PINCODE */}
            <label className={lableClass}>
              PinCode
              <input
                type="number"
                className={inputClass}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                }}
              />
            </label>
          </section>

          <section className="flex flex-col w-full">
            <label className={lableClass}>
              Email
              <input
                className={inputClass}
                type="email"
                value={email}
                disabled
                onChange={(e) => {
                  setEmail(e.target);
                }}
              />
            </label>
            {/*CITY TIME */}
            <label className={lableClass}>
              City
              <input
                type="text"
                className={inputClass}
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </label>
            {/*sTART TIME */}
            <label className={lableClass}>
              Start Time
              <input
                type="time"
                className={inputClass}
                value={openTime}
                onChange={(e) => {
                  setOpenTime(e.target.value);
                }}
              />
            </label>
            {/*END TIME */}
            <label className={lableClass}>
              End Time
              <input
                type="time"
                className={inputClass}
                value={endTime}
                onChange={(e) => {
                  setEndTime(e.target.value);
                }}
              />
            </label>
            <label className={lableClass}>
              Workig days
              {renderWeekDays()}
            </label>
            <button className="bg-red-600 py-2 px-20 m-6 text-white text-xl w-fit font-semibold hover:-">
              Submit
            </button>
          </section>
          <div onClick={loggOut}>logg Out</div>
        </form>
      </>
    );
  };

  useEffect(() => {
    const tempUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!tempUser) {
      navigate("/createuser");
    } else {
      updateCurrentUser(tempUser);
      console.log(tempUser.email);
      setEmail(tempUser.email);
    }
  }, []);
  return (
    <div className=" m-10 custom_shadows h-fit flex flex-col gap-0">
      {currentUser ? renderData() : null}
    </div>
  );
};

export default ManageBusiness;
