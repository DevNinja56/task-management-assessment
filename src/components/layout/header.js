import React, { useState } from "react";
import { useRouter } from "next/router";
import { GoBellFill } from "react-icons/go";
import Button from "../common/button";
import { FiPlus } from "react-icons/fi";
import { IoChevronDown } from "react-icons/io5";
import SortByIcon from "../icon/sortByIcon";
import Input from "../common/input";
import { CiSearch } from "react-icons/ci";
import { useUi } from "@/hooks/useUserInterface";
import { modalType } from "@/store/slices/ui.slice";

const Header = () => {
  const { pathname } = useRouter();
  const { updateModal } = useUi();

  return (
    <div
      className={`bg-white flex flex-wrap md:flex-nowrap gap-5 justify-between py-7 md:py-6 xl:px-12 md:px-6 lg:px-8 px-2 items-center z-40 sticky top-0`}
    >
      <div className="flex gap-3 items-center">
        <h1 className="capitalize md:text-2xl text-xl font-medium text-black lexend-deca-font">
          {pathname.replace(`/`, "")}
        </h1>
      </div>

      <div className="flex items-center gap-2 md:gap-3 xl:gap-4 justify-end w-auto md:w-full">
        <Input
          padding="py-2.5 pl-11"
          className="rounded-3xl bg-primary/10 border border-primary/20 text-lightBlack font-light lexend-deca-font w-full"
          placeHolder="Search"
          width="w-4/12 xl:w-[45%] hidden md:flex"
          icon={CiSearch}
        />
        <Button
          radius="rounded-3xl"
          icon={<SortByIcon />}
          iconAfterText={<IoChevronDown />}
          text="Sort by"
          className="lexend-deca-font border border-primary/20 font-light hover:shadow-md text-xs md:text-sm xl:text-base"
          padding="py-2.5 px-3 xl:px-4"
          buttonColor="white"
          color="text-lightBlack"
          animation
        />
        <Button
          onClick={() =>
            updateModal({
              type: modalType.CREATE_TASK,
              state: "",
            })
          }
          radius="rounded-3xl"
          icon={<FiPlus className="lg:text-xl" />}
          text="Create Task"
          className="lexend-deca-font font-light text-xs md:text-sm xl:text-base"
          padding="py-2.5 px-3 xl:px-4"
          animation
        />
        <div
          onClick={() =>
            updateModal({
              type: modalType.NOTIFICATION,
              state: "",
            })
          }
          className="h-8 w-8 md:h-9 md:w-9 lg:h-11 lg:w-11 border border-primary/20 rounded-full flex items-center justify-center relative cursor-pointer"
        >
          <div className="h-1.5 w-1.5 lg:h-2 lg:w-2 rounded-full bg-red-500 border border-white absolute top-1.5 md:top-2 right-2.5 md:right-3"></div>
          <GoBellFill className="h-5 w-5 lg:h-6 lg:w-6 text-primary" />
        </div>
      </div>
    </div>
  );
};

export default Header;
