import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import dayjs from "dayjs";
const Calendar = ({workingDaysOfWeek}) => {
  // const workingDaysOfWeek = [1, 2, 3, 4, 5];
  const [dateValue, setDateValue] = useState(null);
  const [timeValue, setTimeValue] = useState(null);
  const [conbinedValue, setCombinedValue] = useState();
  const handleBookingDate = (e) => {
    if (e.$H == 0) {
      console.log("not complete date");
      return;
    }
    console.log(e);
    setCombinedValue(e);
    const dateObj = e.$d;
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1; // Months are zero-based, so we add 1
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    // Convert to string with leading zeros if necessary
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    // Construct the formatted date string in the "dd/mm/yyyy" format
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    // Convert to string with leading zeros if necessary
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Construct the formatted time string in the "hh:mm:ss" format
    const formattedTime = `${formattedHours}:${formattedMinutes}`;
    console.log(formattedDate);
    console.log(formattedTime);
  };
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {
          <StaticDateTimePicker
            orientation="landscape"
            defaultValue={dayjs("2022-04-17T15:30")}
            showDaysOutsideCurrentMonth
            value={dateValue}
            onChange={(newValue) => handleBookingDate(newValue)}
            fixedWeekNumber={6}
            shouldDisableDate={(date) => {
              return !workingDaysOfWeek.includes(date.day() + 1);
            }}
          />
        }
      </LocalizationProvider>
      <button>Book The Appointment</button>
    </div>
  );
};

export default Calendar;
