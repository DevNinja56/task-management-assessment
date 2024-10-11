import { useUi } from "@/hooks/useUserInterface";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      socket = io("/", {
        path: "/api/socketio",
      });

      socket.on("connect", () => {
        console.log("Connected to Socket.IO server");

        socket.on(`notification-${session?.user?.id}`, (data) => {
          setNotifications((prevNotifications) => [...prevNotifications, data]);
          alert(data.message);
        });
      });

      socket.on("connect_error", (err) => {
        console.error("Connection failed:", err.message);
      });

      return () => {
        if (socket) {
          socket.disconnect();
        }
      };
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      const fetchInitialData = async () => {
        try {
          const [notificationRes] = await Promise.all([
            axios.get("/api/notifications"),
          ]);

          setNotifications(notificationRes.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data", error);
          setLoading(false);
        }
      };

      fetchInitialData();
    }
  }, [session]);

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
        {notifications?.map((item, index) => (
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
