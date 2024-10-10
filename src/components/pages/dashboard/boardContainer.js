import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import BoardCard from "./boardCard";

const BoardContainer = ({ boardName }) => {
  return (
    <div className="rounded-lg p-4 flex flex-col gap-2.5 bg-primary/10 border border-primary/20 min-w-[270px]">
      <div className="flex items-center justify-between lexend-deca-font text-lightBlack w-full">
        {boardName}
        <BiDotsVerticalRounded className="text-xl text-primary cursor-pointer" />
      </div>
      <BoardCard />
    </div>
  );
};

export default BoardContainer;
