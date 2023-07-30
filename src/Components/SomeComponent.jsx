import React, { useState } from "react";
import { Scheduler } from "@aldabil/react-scheduler";

const SomeComponent = () => {
  const [workingDays, setWorkingDays] = useState([1, 2, 3, 4, 5]); // Initial enabled working days: Monday to Friday

  const events = [
    // Your events array
  ];

  const handleChangeWorkingDays = (newWorkingDays) => {
    setWorkingDays(newWorkingDays);
  };

  const isWorkingDay = (date) => {
    const dayOfWeek = date.getDay();
    return workingDays.includes(dayOfWeek);
  };

  const dayRender = (date, el) => {
    if (isWorkingDay(date)) {
      el.style.color = "black";
      el.disabled = false; // Enable working days
    } else {
      el.style.color = "grey";
      el.disabled = true; // Disable non-working days
    }
  };

  return (
    <div>
      <Scheduler
        events={events}
        view="week"
        workingDays={workingDays}
        dayRender={dayRender}
      />

      <div>
        <label>
          Enabled Working Days:
          <select
            value={workingDays}
            multiple
            onChange={(e) =>
              handleChangeWorkingDays(
                Array.from(e.target.selectedOptions, (option) =>
                  Number(option.value)
                )
              )
            }
          >
            <option value={0}>Sunday</option>
            <option value={1}>Monday</option>
            <option value={2}>Tuesday</option>
            <option value={3}>Wednesday</option>
            <option value={4}>Thursday</option>
            <option value={5}>Friday</option>
            <option value={6}>Saturday</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default SomeComponent;
