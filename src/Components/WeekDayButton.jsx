import React, { useState } from "react";

const WeekDayButton = ({ weekDay, setWorkingDays, workingDays }) => {
  const notSelectedDay =
    "bg-slate-100 font-semibold py-3  w-9 rounded-3xl w-12  text-center";
  const selectedDay =
    "bg-red-500 font-semibold py-3 w-9 rounded-3xl w-12 text-center";
  const [isSelected, setIsSelected] = useState(weekDay.isSelected);

  const handleClick = () => {
    let temp = workingDays;
    if (isSelected) {
      temp = temp.filter((e) => {
        return e != weekDay.value;
      });
      setIsSelected(false);
    } else {
      temp.push(weekDay.value);
      setIsSelected(true);
    }
    setWorkingDays(temp);
  };

  return (
    <div
      className={isSelected ? selectedDay : notSelectedDay}
      onClick={() => {
        handleClick();
      }}
    >
      {weekDay.tag}
    </div>
  );
};

export default WeekDayButton;
