import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import BoardCard from "./boardCard";

const BoardContainer = ({ boardName }) => {
  return (
    <div className="rounded-lg p-4 flex flex-col gap-2.5 bg-primary/10 border border-primary/20 min-w-[270px]">
      <h1 className="lexend-deca-font text-lightBlack w-full">{boardName}</h1>
      <BoardCard />
    </div>
  );
};

export default BoardContainer;
