import { Box, Button } from "@mui/material";
import { DatePicker, LocalizationProvider, TimeField, TimePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const SelectDateTime = ({book}) => {
    const [date,setDate] = useState();
    const [time,setTime] = useState();
    const handleSubmit = ()=>
    {
        // console.log("handle submit from select data and time")

        // console.log(time)
        
        book(date,time);
    }
  return (
    <div>
      <Box sx={style} flexDirection={'column'}>
      <form onSubmit={handleSubmit}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box>
        <DatePicker
          label="Select Date"
          onChange={(newValue) => {setDate(newValue)}}
        />
        <TimePicker
          label="Secect Time"
          onChange={(newValue) => {setTime((new Date(newValue)).toLocaleTimeString('en-US'));}}
        />

        </Box>
    </LocalizationProvider>
       
        {date && time && <Button variant="outlined" color="success" onClick={handleSubmit}>
         Book
        </Button>}
        </form>
        </Box>
    </div>
  );
};

export default SelectDateTime;
