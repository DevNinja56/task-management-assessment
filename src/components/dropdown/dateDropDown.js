import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/common/button";
import DateIcon from "@/components/icon/dateIcon";
import { Calendar } from "primereact/calendar";

const DateDropDown = ({ onSelectDate }) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [showCalendar, setShowCalendar] = useState("startDate");

  const handleDateChange = (date, type) => {
    if (type === "startDate") {
      setStartDate(date);
      onSelectDate({ startDate: date, endDate }); // Pass the selected startDate
    } else {
      setEndDate(date);
      onSelectDate({ startDate, endDate: date }); // Pass the selected endDate
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute top-9 left-0 bg-white rounded-lg w-[298px] border border-lightBlue/20 z-10"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-5 flex flex-col gap-4">
        <div className="pb-4 flex items-center gap-2.5 border-b border-lightBlue/20 w-full justify-between">
          <Button
            onClick={() => setShowCalendar("startDate")}
            padding="py-2 pr-7 pl-2.5"
            buttonColor={`${
              showCalendar === "startDate" ? "lightBlue" : "white"
            }`}
            color="bg-lightBlue"
            className="text-xs font-light lexent-deca-font bg-opacity-15 w-full border border-lightBlue/15"
            radius="rounded-lg"
            text="Start Date"
            icon={<DateIcon />}
          />
          <Button
            onClick={() => setShowCalendar("endDate")}
            padding="py-2 pr-7 pl-2.5"
            buttonColor={`${
              showCalendar === "endDate" ? "lightBlue" : "white"
            }`}
            color="bg-lightBlue"
            className="text-xs font-light lexent-deca-font bg-opacity-15 w-full border border-lightBlue/15"
            radius="rounded-lg"
            text="End Date"
            icon={<DateIcon />}
          />
        </div>
        {showCalendar === "startDate" ? (
          <Calendar
            value={startDate}
            onChange={(e) => handleDateChange(e.value, "startDate")}
            inline
          />
        ) : (
          <Calendar
            value={endDate}
            onChange={(e) => handleDateChange(e.value, "endDate")}
            inline
          />
        )}
      </div>
    </motion.div>
  );
};

export default DateDropDown;
