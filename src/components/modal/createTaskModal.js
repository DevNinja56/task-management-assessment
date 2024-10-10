import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Button from "../common/button";
import User from "../icon/userIcon";
import CalendarIcon from "../icon/calendarIcon";
import FlagIcon from "../icon/flagIcon";
import ClipBoardIcon from "../icon/clipBoardIcon";
import AssignDropDown from "../dropdown/assignDropDown";
import DateDropDown from "../dropdown/dateDropDown";
import PriorityDropDown from "../dropdown/priorityDropDown";
import { useUi } from "@/hooks/useUserInterface";

const CreateTaskModal = () => {
  const { hideModal } = useUi();
  const [showAssignDropdown, setShowAssignDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);

  const assignDropdownRef = useRef(null);
  const dateDropdownRef = useRef(null);
  const priorityDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickInsideAssign =
        assignDropdownRef.current &&
        assignDropdownRef.current.contains(event.target);
      const isClickInsideDate =
        dateDropdownRef.current &&
        dateDropdownRef.current.contains(event.target);
      const isClickInsidePriority =
        priorityDropdownRef.current &&
        priorityDropdownRef.current.contains(event.target);

      if (
        !isClickInsideAssign &&
        !isClickInsideDate &&
        !isClickInsidePriority
      ) {
        setShowAssignDropdown(false);
        setShowDateDropdown(false);
        setShowPriorityDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-screen w-screen grid place-items-center overflow-auto">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg w-11/12 md:w-[590px] mx-auto"
      >
        <div className="p-4 md:p-5 border-b border-lightBlue/20 w-full flex items-center justify-between">
          <h1 className="text-primary text-xl md:text-2xl font-medium lexend-deca-font">
            Create Task
          </h1>
          <RxCross2
            onClick={hideModal}
            className="text-xl text-primary cursor-pointer"
          />
        </div>
        <div className="p-5 md:p-6 flex flex-col w-full gap-6">
          <h1 className="text-base md:text-lg font-medium lexend-deca-font">
            Task Name
          </h1>
          <div className="relative">
            <div className="absolute top-2 left-2.5">
              <ClipBoardIcon />
            </div>
            <textarea
              className="w-full rounded-md min-h-36 bg-lightBlue/15 pt-1.5 pl-9 pr-2.5 text-lightBlue lexend-deca-font outline-none font-light resize-none text-sm md:text-base"
              placeholder="Add description"
            />
          </div>
          <div className="flex items-center flex-wrap gap-3">
            <div className="py-1 px-2.5 bg-lightBlue/25 flex items-center justify-center rounded-md lexend-deca-font text-xs md:text-sm text-lightBlue">
              To do
            </div>
            <div
              ref={assignDropdownRef}
              onClick={() => {
                setShowAssignDropdown(!showAssignDropdown);
                setShowDateDropdown(false);
                setShowPriorityDropdown(false);
              }}
              className="relative"
            >
              <Button
                padding="py-1 px-2.5"
                buttonColor="white"
                text="Assign"
                radius="rounded-md"
                className="lexend-deca-font text-xs md:text-sm border border-lightBlue hover:shadow-md"
                color="lightBlue"
                icon={<User />}
              />
              {showAssignDropdown && <AssignDropDown />}
            </div>
            <div
              ref={dateDropdownRef}
              onClick={() => {
                setShowDateDropdown(!showDateDropdown);
                setShowPriorityDropdown(false);
                setShowAssignDropdown(false);
              }}
              className="relative"
            >
              <Button
                padding="py-1 px-2.5"
                buttonColor="white"
                text="Due Date"
                radius="rounded-md"
                className="lexend-deca-font text-xs md:text-sm border border-lightBlue hover:shadow-md"
                color="lightBlue"
                icon={<CalendarIcon />}
              />
              {showDateDropdown && <DateDropDown />}
            </div>
            <div
              ref={priorityDropdownRef}
              onClick={() => {
                setShowPriorityDropdown(!showPriorityDropdown);
                setShowDateDropdown(false);
                setShowAssignDropdown(false);
              }}
              className="relative"
            >
              <Button
                padding="py-1 px-2.5"
                buttonColor="white"
                text="Priority"
                radius="rounded-md"
                className="lexend-deca-font text-xs md:text-sm border border-lightBlue hover:shadow-md"
                color="lightBlue"
                icon={<FlagIcon />}
              />
              {showPriorityDropdown && <PriorityDropDown />}
            </div>
          </div>
        </div>
        <div className="py-6 px-5 md:px-9 border-t border-zinc-300 flex justify-end">
          <Button
            padding="py-2.5 px-5"
            buttonColor="primary"
            radius="rounded-lg"
            color="white"
            className="lexend-deca-font font-light text-xs md:text-sm"
            text="Create Task"
            animation
          />
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
