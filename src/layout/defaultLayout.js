import Header from "@/components/layout/header";
import SideBar from "@/components/layout/sideBar";
import React from "react";

const DefaultLayout = ({ header, children }) => {
  return (
    <div className="flex">
      <SideBar />
      <main className="h-screen w-full lg:w-11/12 overflow-y-auto overflow-x-hidden z-10 flex flex-col bg-gray-100">
        {header && <Header />}
        <div className="w-full h-full overflow-y-auto overflow-x-hidden flex justify-between">
          <div className="grow max-w-full">
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default DefaultLayout;
