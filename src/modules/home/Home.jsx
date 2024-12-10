import React, { useState } from "react";
import TabBar from "./components/TabBar";
import { IconLogOut } from "./assets/Icon";
import HomeContent from "./HomeContent"; // Placeholder for other content components
import Equipment from "./Equipment"; // Placeholder
import DashBoard from "./Dashboard"; // Placeholder
import EmployeeManagement from "./EmployeeManagement"; // Import the new component
import Area from "./Area";

function Home() {
  const [activeTab, setActiveTab] = useState("employees");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeContent />;
      case "employees":
        return <EmployeeManagement />;
      case "equipment":
        return <Equipment />;
      case "transaction":
        return <DashBoard />;
      case "area":
        return <Area />;
      default:
        return null;
    }
  };

  return (
    <div className="relative h-screen min-w-[520px] items-center justify-center overflow-hidden bg-[#E3EDF9]">
      <div className="flex min-w-[520px] flex-col bg-[#E3EDF9] md:flex-row">
        <div className="relative h-[100px] w-full md:w-[70px] lg:w-[220px]">
          <div
            id="tab_nav"
            className="fixed flex h-[100px] w-full flex-row items-center overflow-hidden bg-[#67BC47] px-2 md:h-screen md:w-[70px] md:flex-col md:items-start md:pt-4 md:transition-[width] md:duration-75 md:ease-in-out lg:w-[220px]"
          >
            <div className="flex flex-row items-center pl-4 md:mx-auto md:pl-0 lg:gap-3">
              <div
                className="relative m-3 hidden h-9 w-10 cursor-pointer md:block md:h-7 md:w-7 lg:h-9 lg:w-10"
                onClick={() => expandTabNar()}
              >
                <span className="absolute left-2/4 top-1/4 block w-full -translate-x-2/4 bg-white md:h-[2px] lg:h-[3px]"></span>
                <span className="absolute left-2/4 top-2/4 block w-full -translate-x-2/4 bg-white md:h-[2px] lg:h-[3px]"></span>
                <span className="absolute left-2/4 top-3/4 block w-full -translate-x-2/4 bg-white md:h-[2px] lg:h-[3px]"></span>
              </div>
              <h1 className="block text-xl font-black italic text-white md:hidden lg:block">
                DashBoard KLTN ManhTu
              </h1>
            </div>

            <div className="flex w-full flex-row justify-between md:mt-8 md:h-full md:flex-col">
              <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
              <div className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#DF3333] px-6 py-2 text-white md:mb-4 md:p-2 xl:px-6 xl:py-2">
                <IconLogOut />
                <span className="hidden text-xs font-bold text-white lg:block">
                  Log Out
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 flex-1 p-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Home);
