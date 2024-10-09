import Logo from "@/components/icon/logo";
import Image from "next/image";
import React from "react";

const AuthContent = () => {
  return (
    <div className="py-28 pl-20 xl:pl-36 hidden lg:flex flex-col gap-6 2xl:gap-12 w-6/12 relative">
      <div className="flex items-center gap-1 2xl:gap-3">
        <Logo />
        <h1 className="text-white font-extrabold text-3xl 2xl:text-4xl lexend-deca-font">
          Taskmaster Pro
        </h1>
      </div>
      <Image
        height={352}
        width={416}
        className="mix-blend-luminosity 2xl:h-8/12 2xl:w-8/12"
        alt="mainImage"
        src="/images/AuthMainImage.svg"
      />
      <div className="flex flex-col text-white gap-1 2xl:gap-3">
        <h1 className="text-3xl 2xl:text-4xl font-extrabold">
          Welcome to TaskMaster Pro!
        </h1>
        <p className="text-sm 2xl:text-lg leading-normal opacity-80">
          Effortlessly manage your tasks and projects with TaskMaster Pro.
          Whether you're working on personal to-do lists or managing team
          workflows, our intuitive platform helps you stay organized, meet
          deadlines, and achieve your goals. Log in to get started on your
          journey to productivity!
        </p>
      </div>
    </div>
  );
};

export default AuthContent;
