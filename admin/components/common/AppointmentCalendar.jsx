'use client'

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AppointmentCalendar({ onDateChange }) {
  const [startDate, setStartDate] = useState(null);

  const handleChange = (date) => {
    setStartDate(date);
    onDateChange(date);
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      showTimeSelect
      dateFormat="MMMM d, yyyy h:mm aa"
      placeholderText="Choose a date and time for your meeting"
      minDate={new Date()} // disables past dates
      timeIntervals={15} // disables past dates
      className="border p-2 rounded"
    />
  );
}
