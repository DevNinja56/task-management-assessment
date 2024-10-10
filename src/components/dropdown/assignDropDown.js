import React from "react";
import { motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";

const AssignDropDown = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute top-9 left-0 bg-white rounded-lg w-[200px] md:w-[273px] border border-lightBlue/20 z-10"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="py-3 px-2 md:px-5 flex items-center gap-2.5 border-b border-lightBlue/20 w-full">
        <CiSearch />
        <input
          className="outline-none text-xs md:text-sm font-light lexend-deca-font text-lightBlue"
          placeholder="Search or enter email"
        />
      </div>
      <div className="px-2.5 pt-4 pb-5 flex flex-col gap-2.5 w-full">
        <div className="bg-lightBlue/15 px-2.5 py-1.5 flex items-center gap-1.5 w-full rounded-md relative group">
          <Image
            height={26}
            width={26}
            src="/images/Wave.svg"
            className="border border-white rounded-full h-5 w-5 md:h-auto md:w-auto"
            alt="assign-user-image"
          />
          <h2 className="font-light text-xs md:text-sm lexend-deca-font text-lightBlue">
            Me
          </h2>
          <div className="hidden group-hover:flex absolute top-2 right-2.5 rounded-md bg-zinc-100 items-center justify-center py-1 px-2 text-primary z-10 text-[10px] cursor-pointer">
            Profile
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AssignDropDown;
