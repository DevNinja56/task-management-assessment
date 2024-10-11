import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Logo from "@/components/icon/logo";
import { ROUTES } from "@/config/routes";
import { SIDE_ROUTES } from "@/config/side_routes";
import { GoChevronRight } from "react-icons/go";
import { HiBars3 } from "react-icons/hi2";
import { motion } from "framer-motion";

const SideBar = ({ isFullWidth, setIsFullWidth }) => {
  const { pathname } = useRouter();
  const [showSideBar, setShowSideBar] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  const isActive = (path) => path === pathname;

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const currentWidth = window.innerWidth;
        setScreenWidth(currentWidth);
        setIsFullWidth(currentWidth >= 1024);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getSidebarWidth = () => {
    if (screenWidth < 1280) {
      return isFullWidth ? 270 : 100;
    }
    return isFullWidth ? 311 : 100;
  };

  return (
    <motion.div
      key="sidebar"
      style={{
        width: getSidebarWidth(),
        minWidth: getSidebarWidth(),
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`admin-sidebar bg-primary shadow-inner flex flex-col pb-8 transition-all duration-300 fixed lg:sticky lg:top-0 lg:left-0 h-full lg:h-screen ${
        showSideBar ? "left-0 lg:left-auto" : "-left-[101px] lg:left-auto"
      } z-50`}
    >
      <div
        onClick={() => setIsFullWidth(!isFullWidth)}
        className="h-6 w-6 rounded-full bg-white absolute top-9 -right-3 hidden lg:flex items-center justify-center border border-primary cursor-pointer z-[60]"
      >
        <GoChevronRight
          className={`text-xl text-primary ${isFullWidth && "rotate-180"}`}
        />
      </div>
      <div
        onClick={() => {
          setShowSideBar(!showSideBar);
          setIsFullWidth(false);
        }}
        className="h-6 w-6 rounded-sm rounded-l-none bg-white absolute top-0 border-l-none -right-6 flex lg:hidden items-center justify-center border border-primary cursor-pointer z-[60] transition-all duration-300"
      >
        <HiBars3
          className={`text-xl text-primary ${isFullWidth && "rotate-180"}`}
        />
      </div>

      <div
        className={`flex items-center ${
          isFullWidth ? "pl-6" : "px-6"
        } gap-2 py-7 border-b border-white/20 transition-all duration-300`}
      >
        <Link
          href={ROUTES.DASHBOARD}
          className={`${isFullWidth ? "p-2" : "p-2"} bg-white rounded-[10px]`}
        >
          <Logo
            height={isFullWidth ? 25 : 30}
            width={isFullWidth ? 25 : 30}
            color="primary"
          />
        </Link>
        {isFullWidth && (
          <h1 className="text-xl font-extrabold lexend-deca-font text-white min-w-[188px]">
            Taskmaster Pro
          </h1>
        )}
      </div>
      <div className="pt-7 px-6 flex flex-col gap-4 w-full overflow-hidden">
        {SIDE_ROUTES.map(({ path, Icon, title }, i) =>
          Icon ? (
            <Link href={path} key={"side-nav-links--" + path + i}>
              <button
                className={`flex items-center gap-2.5 text-white w-full justify-start lexend-deca-font font-medium rounded-[43px] min-w-[222px] ${
                  isFullWidth && isActive(path) && "bg-[#394B6A]"
                } ${isFullWidth && "py-2.5 px-4 hover:bg-[#394B6A]"}`}
              >
                <Icon
                  isFullWidth={isFullWidth}
                  isActive={isActive}
                  path={path}
                  height="22"
                  width="22"
                />
                {isFullWidth && title}
              </button>
            </Link>
          ) : null
        )}
      </div>
    </motion.div>
  );
};

export default SideBar;
