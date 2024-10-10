import { useUi } from "@/hooks/useUserInterface";
import Image from "next/image";
import React from "react";
import { RxCross2 } from "react-icons/rx";

const Notification = () => {
  const notificationData = [
    {
      name: "John",
      title: "Moved to to-do",
      image: "/images/Wave.svg",
      date: "10/10/2024",
    },
    {
      name: "Harry",
      title: "Moved to in-progress",
      image: "/images/Wave.svg",
      date: "10/10/2024",
    },
    {
      name: "Kevin",
      title: "Create new board",
      image: "/images/Wave.svg",
      date: "6/10/2024",
    },
    {
      name: "Angle",
      title: "Moved to to-do",
      image: "/images/Wave.svg",
      date: "5/10/2024",
    },
    {
      name: "Kevin",
      title: "Create new board",
      image: "/images/Wave.svg",
      date: "6/10/2024",
    },
    {
      name: "Angle",
      title: "Moved to to-do",
      image: "/images/Wave.svg",
      date: "5/10/2024",
    },
    {
      name: "Kevin",
      title: "Create new board",
      image: "/images/Wave.svg",
      date: "6/10/2024",
    },
    {
      name: "Angle",
      title: "Moved to to-do",
      image: "/images/Wave.svg",
      date: "5/10/2024",
    },
  ];

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-64 md:w-[300px] bg-white rounded-md absolute top-20 right-2 md:right-6 lg:right-8 xl:right-12"
    >
      <div className="p-4 md:p-5 border-b border-lightBlue/20 w-full flex items-center justify-between bg-primary rounded-t-md">
        <h1 className="text-white text-base md:text-xl font-medium lexend-deca-font">
          Notifications
        </h1>
        <p className="text-white roboto-font text-xs md:text-sm cursor-pointer transition-all duration-300 hover:opacity-70">
          Clear All
        </p>
      </div>
      <div className="h-[450px] lg:h-[500px] overflow-y-scroll notification-scroll">
        {notificationData?.map((item, index) => (
          <div
            className="flex gap-1.5 p-4 md:p-5"
            key={"notifications--" + index}
          >
            <Image
              height={30}
              width={30}
              className="rounded-full"
              alt="notification-img"
              src={item.image}
            />
            <div className="flex flex-col gap-2.5 w-full">
              <div className="w-full flex items-center">
                <h1 className="text-xs lexend-deca-font text-black">
                  {item?.name} {""}{" "}
                  <span className="text-gray">{item?.title}</span>
                </h1>
              </div>
              <p className="text-xs text-gray">{item?.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
