import React from "react";

const DayComponent = ({ day, workingDaysOfWeek }) => {
  const dayOfWeek = day.getDay(); // 0 (Sunday) to 6 (Saturday)

  // Disable the day if its index is not in the workingDaysOfWeek array
  const isDisabled = !workingDaysOfWeek.includes(dayOfWeek + 1); // Adding 1 to match the array index

  return (
    <button
      style={{ color: isDisabled ? "gray" : "black" }}
      disabled={isDisabled}
    >
      {day.getDate()}
    </button>
  );
};

export default DayComponent;
