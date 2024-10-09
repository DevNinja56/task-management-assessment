import React from "react";
import { useRouter } from "next/router";
import { GoBellFill } from "react-icons/go";
import Button from "../common/button";
import { FiPlus } from "react-icons/fi";
import { IoChevronDown } from "react-icons/io5";
import SortByIcon from "../icon/sortByIcon";
import Input from "../common/input";
import { CiSearch } from "react-icons/ci";

const Header = () => {
  const { pathname } = useRouter();

  return (
    <div
      className={`bg-white flex justify-between shadow-md py-6 lg:px-12 md:px-5 px-2 items-center z-40`}
    >
      <div className="flex gap-3 items-center">
        <h1 className="capitalize md:text-2xl text-xl font-medium text-black lexend-deca-font">
          {pathname.replace(`/`, "")}
        </h1>
      </div>

      <div className="flex items-center gap-4 lg:gap-3 xl:gap-4 justify-end w-full">
        <Input
          padding="py-2.5 pl-11"
          className="rounded-3xl bg-primary/10 border border-primary/20 text-lightBlack font-light lexend-deca-font w-full"
          placeHolder="Search"
          width="w-[45%] lg:w-4/12 xl:w-[45%]"
          icon={CiSearch}
        />
        <Button
          radius="rounded-3xl"
          icon={<SortByIcon />}
          iconAfterText={<IoChevronDown />}
          text="Sort by"
          className="lexend-deca-font border border-primary/20 text-lightBlack font-light hover:shadow-md"
          padding="py-2.5 px-4 lg:px-3 xl:px-4"
          buttonColor="white"
          animation
        />
        <Button
          radius="rounded-3xl"
          icon={<FiPlus className="text-xl" />}
          text="Create Task"
          className="lexend-deca-font font-light"
          padding="py-2.5 px-4 lg:px-3 xl:px-4"
          animation
        />
        <div className="h-11 w-11 border border-primary/20 rounded-full flex items-center justify-center relative cursor-pointer">
          <div className="h-2 w-2 rounded-full bg-red-500 border border-white absolute top-2 right-3"></div>
          <GoBellFill className="h-6 w-6 text-primary" />
        </div>
      </div>
    </div>
  );
};

export default Header;
