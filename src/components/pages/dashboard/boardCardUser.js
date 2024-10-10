import Image from "next/image";
import React from "react";

const BoardCardUser = ({ className }) => {
  return (
    <div className={`h-6 w-6 rounded-full border-2 border-white ${className}`}>
      <Image height={24} width={24} alt="user-img" src="/images/google.svg" />
    </div>
  );
};

export default BoardCardUser;
