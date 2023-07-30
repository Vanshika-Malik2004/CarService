import React, { useState } from "react";

const BookTimingComponent = () => {
  const [startTime, setStartTime] = useState("09:00"); // Default starting time
  const [closingTime, setClosingTime] = useState("18:00"); // Default closing time
  const [timeSlots, setTimeSlots] = useState([]);
  const [disabledSlot, setDisabledSlot] = useState(["02:00", "10:00", "17:00"]);
  const generateTimeSlots = () => {
    const formatTime = (time) => {
      return time.split(":").map((t) => parseInt(t, 10));
    };

    const [startHour, startMinute] = formatTime(startTime);
    const [closeHour, closeMinute] = formatTime(closingTime);

    let currentHour = startHour;
    let currentMinute = startMinute;
    let slots = [];

    while (
      currentHour < closeHour ||
      (currentHour === closeHour && currentMinute <= closeMinute)
    ) {
      slots.push(
        `${currentHour.toString().padStart(2, "0")}:${currentMinute
          .toString()
          .padStart(2, "0")}`
      );

      currentMinute += 60;
      if (currentMinute >= 60) {
        currentHour += Math.floor(currentMinute / 60);
        currentMinute = currentMinute % 60;
      }
    }
    console.log(slots);
    slots = slots.filter((e) => {
      let f = true;
      for (let i of disabledSlot) {
        if (e == i) {
          f = false;
        }
      }
      return f;
    });
    console.log(slots);
    setTimeSlots(slots);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleClosingTimeChange = (event) => {
    setClosingTime(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    generateTimeSlots();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Starting Time:
          <input
            type="time"
            value={startTime}
            onChange={handleStartTimeChange}
          />
        </label>
        <label>
          Closing Time:
          <input
            type="time"
            value={closingTime}
            onChange={handleClosingTimeChange}
          />
        </label>
        <button type="submit">Generate Time Slots</button>
      </form>
      <ul>
        {timeSlots.map((slot, index) => (
          <li key={index}>{slot}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookTimingComponent;
