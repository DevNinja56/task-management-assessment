import Button from "@/components/common/button";
import DateIcon from "@/components/icon/dateIcon";
import Image from "next/image";
import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import BoardCardUser from "./boardCardUser";

const BoardCard = () => {
  return (
    <div className="bg-white rounded-lg border border-primary/20 px-2.5 py-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Button
          padding="px-2.5 py-[3px]"
          radius="rounded-[32px]"
          buttonColor="yellow/30"
          className="text-[10px] lexend-deca-font"
          color="yellow"
          text="Highest"
        />
        <BiDotsVerticalRounded className="text-xl text-primary cursor-pointer" />
      </div>
      <div className="flex flex-col gap-[2px] lexend-deca-font">
        <h1 className="text-lightBlack font-medium ">Product UI design</h1>
        <p className="text-gray text-[10px]">by John Wick</p>
      </div>
      <div className="flex items-center gap-2 text-xs lexend-deca-font text-[#797979]">
        <DateIcon />
        Due Date 24 Oct 2024
      </div>
      <div className="flex items-center relative">
        <BoardCardUser />
        <BoardCardUser className="absolute left-3" />
        <BoardCardUser className="absolute left-6" />
        <BoardCardUser className="absolute left-10" />
      </div>
    </div>
  );
};

export default BoardCard;
