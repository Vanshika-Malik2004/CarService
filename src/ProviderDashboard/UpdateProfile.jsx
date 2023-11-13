import React, { useContext, useEffect, useState } from "react";
import WeekDayButton from "../Components/WeekDayButton";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { supabase } from "../SupabaseConfig";
import { toast } from "react-toastify";
import { GetState } from "react-country-state-city";
import { GetCity } from "react-country-state-city";
import ProfileImage from "./ProfileImage";
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
const UpdateProfile = () => {
  const navigate = useNavigate();
  const { signOutUser, currentUser, updateCurrentUser } =
    useContext(AuthContext);
  const [businessName, setBusinessName] = useState(null);
  const [ownerName, setOwnerName] = useState(null);
  const [contactNumber, setContactNumber] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [pin, setPin] = useState(null);
  const [address, setAddress] = useState(null);
  const [workingDays, setWorkingDays] = useState([]);
  const [openTime, setOpenTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [email, setEmail] = useState();

  const [countryid, setCountryid] = useState(101); // setting defalut country to india
  const [stateid, setStateid] = useState(null);
  const [cityid, setCityid] = useState(null);

  const [stateIndex, setStateIndex] = useState(null);
  const [cityIndex, setCityIndex] = useState(null);

  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [pid, setPid] = useState(null);

  useEffect(() => {
    const tempUser = JSON.parse(sessionStorage.getItem("currentUser"));
    const getData = async () => {
      //   console.log("email", currentUser.email);
      const { data, error } = await supabase
        .from("ServiceProvider")
        .select("*")
        .eq("email", tempUser.email);
      setPid(data[0].id);
      // console.log("sdfds")

      console.log(data);
      if (error) {
        console.log("error: ", error);
      } else {
        console.log(data);
      }
    };
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
      updateCurrentUser(tempUser);

      // console.log(tempUser.email);
      // console.log(currentUser);
    }
    getData();
  }, []);

  //   const loggOut = async () => {
  //     await signOutUser();
  //     toast.success("Logged out successfully !", {
  //       toastId: "Logout",
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //     });
  //     navigate("/login/user");
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sendData = {
      //   name: businessName,
      //   email: email,
      //   address: address,
      //   pincode: pin,
      //   state: state,
      //   city: city,
      //   OwnerName: ownerName,
      //   ContactNumber: contactNumber,
    };
    if (businessName) sendData["name"] = businessName;
    if (address) sendData["address"] = address;
    if (pin) sendData["pincode"] = pin;
    if (ownerName) sendData["OwnerName"] = ownerName;
    if (contactNumber) sendData["ContactNumber"] = contactNumber;
    console.log(sendData);
    const { data, error } = await supabase
      .from("ServiceProvider")
      .update([sendData])
      .eq("email", currentUser.email)
      .select();
    if (data) {
      console.log("data", data);

      if (openTime || endTime || workingDays) {
        const timeSlotData = {
          // StartTime: openTime,
          // EndTime: endTime,
          // WorkingDays: workingDays,
          // ProviderId: data[0].id,
        };
        if (openTime) timeSlotData["StartTime"] = openTime;
        if (endTime) timeSlotData["EndTime"] = endTime;
        if (workingDays.length) timeSlotData["WorkingDays"] = workingDays;

        const t = await supabase
          .from("TimeSlotTable")
          .update([timeSlotData])
          .eq("ProviderId", data[0].id)
          .select();
        if (!t.error) {
          console.log(t.data);
        } else {
          toast.error("Error !\n" + t.error, {
            toastId: "UpdateTimeError",
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
          return;
        }
      }
      toast.success("Successfully Updated !", {
        toastId: "SuccessfullyUpdatedProfile",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/dashboard/provider/");
    } else {
      toast.error("Error !\n" + error, {
        toastId: "UpdateProfileSecondError",
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
        {weekDays.map((day, ind) => {
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
          <h1 className="custom_font text-rose-700">Update Your Profile</h1>
        </div>
        <form
          className="flex flex-row gap-6"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <section className="flex flex-col w-full gap-4 items-start justify-start">
            {pid && <ProfileImage providerId={pid} />}
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
            {/*STATE  */}
            <label className={lableClass}>
              State
              <select
                onChange={(e) => {
                  const state = stateList[e.target.value]; //here you will get full state object.
                  setStateid(state.id);
                  setState(state.name);
                  setStateIndex(e.target.value);
                  GetCity(countryid, state.id).then((result) => {
                    setCityList(result);
                  });
                }}
                value={stateIndex}
              >
                {stateList.map((item, index) => {
                  return (
                    <option key={index} value={index}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </label>
            {/*CITY TIME */}
            <label className={lableClass}>
              City
              <select
                onChange={(e) => {
                  const city = cityList[e.target.value]; //here you will get full city object.
                  setCity(city.name);
                  setCityid(city.id);
                  setCityIndex(e.target.value);
                }}
                value={cityIndex}
              >
                {cityList.map((item, index) => (
                  <option key={index} value={index}>
                    {item.name}
                  </option>
                ))}
              </select>
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
            <button className="bg-red-600 py-2 px-20 m-6 text-white text-xl w-fit font-semibold hover:-" type="reset"
              onClick={()=>
              {
                    setBusinessName(null);
                    setOwnerName(null);
                    setContactNumber(null);
                    setCity(null);
                    setState(null);
                    setPin(null);
                    setAddress(null);
                    setWorkingDays([]);
                    setOpenTime(null);
                    setEndTime(null);

                    setStateid(null);
                    setCityid(null);

                    setStateIndex(null);
                    setCityIndex(null);

                    setCityList([]);
          
              }}
            >
              Reset Form
            </button>
          </section>
          {/* <div onClick={loggOut}>logg Out</div> */}
        </form>
      </>
    );
  };

  useEffect(() => {
    // GetCountries().then((result) => {
    //   setCountriesList(result);
    // });

    GetState(countryid).then((result) => {
      setStateList(result);
    });
    GetCity(countryid, stateid).then((result) => {
      setCityList(result);
    });

    const tempUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!tempUser) {
      navigate("/createuser");
    } else {
      updateCurrentUser(tempUser);
      // console.log(tempUser.email);
      setEmail(tempUser.email);
    }
  }, []);
  return (
    <div className=" m-10 custom_shadows h-fit flex flex-col gap-0">
      {currentUser ? renderData() : null}
    </div>
  );
};

export default UpdateProfile;