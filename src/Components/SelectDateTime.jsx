import { Box, Button } from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimeField,
  TimePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FaCar } from "react-icons/fa";
import { supabase } from "../SupabaseConfig";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow:
    "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
  p: 4,
};
const weekDays = {
  "monday":0,
  "tuesday":1,
  "wednesday":2,
  "thursday":3,
  "friday":4,
  "saturday":5,
  "sunday":6
};
const SelectDateTime = ({ children,providerId,setDate,setTime }) => {

  console.log("reached select date time")
  const [workingDays, setWorkingDays] = useState([]);
  const [minTime, setMin] = useState([]);
  const [maxTime, setMax] = useState([]);

  useEffect(() => {

    const getData = async () => {
      const { data, error } = await supabase.from("TimeSlotTable").select("*").eq('ProviderId',providerId);
      // console.log(data);
      let list = []
      data[0].WorkingDays.forEach(element => {
        list+=((weekDays[element]+1)%7)
      });
      // console.log(list);
      setWorkingDays(list);

      setMin(data[0].StartTime.split(":"))
      setMax(data[0].EndTime.split(":"))
    };
    getData();
  },[]);


  return (
    <div>
      <Box
        sx={style}
        flexDirection={"column"}
        className="max-w-4xl flex flex-col gap-5 justify-start shadow-2xl rounded-xl p-10"
      >
        <div className="flex gap-2 justify-around">
          <h1 className="font-semibold text-xl">Book your Appointment</h1>
          <FaCar size={30} color="#DC143C" />
        </div>
        
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box className="flex flex-col gap-4">
              <DatePicker
                label="Select Date"
                shouldDisableDate={(date) => {
                  return !workingDays.includes(date.day());
                }}
                minDate={dayjs()}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
              />
              <TimePicker
                label="Select Time"
                ampm={false}
                minTime={dayjs().set("hour",Number(minTime[0])).set("minute", Number(minTime[1]))}
                maxTime={dayjs().set("hour", Number(maxTime[0])).set("minute", Number(maxTime[1]))}

                onChange={(newValue) => {
                  setTime(new Date(newValue).toLocaleTimeString("en-US"));
                }}
              />
            </Box>
          </LocalizationProvider>
              {children}       
      </Box>
    </div>
  );
};

export default SelectDateTime;
