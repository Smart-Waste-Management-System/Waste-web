import React from "react";
import { IconDocument, IconHammer, IconHaHa, IconHome, IconUser, IconArea, IconRotten } from "../assets/Icon";

const tabs = [
  { id: "home", icon: <IconHome />, title: "Thống kê" },
  { id: "employees", icon: <IconUser />, title: "Nhân sự" },
  { id: "transaction", icon: <IconHaHa />, title: "Model" },
  { id: "equipment", icon: <IconHammer />, title: "Thiết Bị" },
  { id: "area", icon: <IconDocument />, title: "Báo Cáo" },
  { id: "test", icon: <IconRotten />, title: "Biểu đồ" },
];

function TabBar({ activeTab, setActiveTab }) {
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <ul className="flex w-full flex-row items-center justify-evenly text-white md:flex-col md:items-start md:gap-4">
      {tabs.map((item) => (
        <li
          key={item.id}
          id={item.id}
          className={`relative flex h-[40px] w-[70px] cursor-pointer rounded-lg md:w-full md:items-center ${activeTab === item.id ? " border bg-[#5DA646]" : ""}`}
          onClick={() => handleTabClick(item.id)}
        >
          <div className="relative flex h-full w-full items-center lg:pl-12">
            <span className="hidden text-xs lg:block lg:w-[200px]">
              {item.title}
            </span>
          </div>
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:left-[25px] md:top-[19px]">
            {item.icon}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default TabBar;
