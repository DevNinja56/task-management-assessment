import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Logo from "@/components/icon/logo";
import { ROUTES } from "@/config/routes";
import { SIDE_ROUTES } from "@/config/side_routes";
import { GoChevronRight } from "react-icons/go";

const SideBar = () => {
  const { pathname } = useRouter();
  const [isFullWidth, setIsFullWidth] = useState(true);

  const isActive = (path) => path === pathname;

  return (
    <div
      className={`admin-sidebar ${
        isFullWidth ? "min-w-[298px]" : "w-auto"
      }  bg-primary shadow-inner flex flex-col h-screen pb-8 relative z-50`}
    >
      <div
        onClick={() => setIsFullWidth(!isFullWidth)}
        className="h-6 w-6 rounded-full bg-white absolute top-9 -right-3 flex items-center justify-center border border-primary cursor-pointer z-[60]"
      >
        <GoChevronRight
          className={`text-xl text-primary ${isFullWidth && "rotate-180"}`}
        />
      </div>

      <div
        className={`flex items-center ${
          isFullWidth ? "pl-6" : "px-6"
        } gap-2 py-7 sticky top-0 border-b border-white/20`}
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
          <h1 className="text-xl font-extrabold lexend-deca-font text-white">
            Taskmaster Pro
          </h1>
        )}
      </div>
      <div className="pt-7 px-6 flex flex-col gap-4 w-full">
        {SIDE_ROUTES.map(({ path, Icon, title }, i) =>
          Icon ? (
            <Link href={path} key={"side-nav-links--" + path + i}>
              <button
                className={`flex items-center gap-2.5 text-white w-full justify-start lexend-deca-font font-medium rounded-[43px] ${
                  isFullWidth && isActive(path) && "bg-lightBlue"
                } ${isFullWidth && "py-2.5 px-4 hover:bg-lightBlue"}`}
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
    </div>
  );
};

export default SideBar;
