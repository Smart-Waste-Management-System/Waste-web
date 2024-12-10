import React, { useEffect, useState } from "react";
import { IconPlus, IconArrowDown, IconSearch } from "./assets/Icon";
import TableManager from "./components/TbEquipmentManagement";
import BoxWindow from "./components/BWEquipment";  
import { useDispatch, useSelector } from "react-redux";
import { loadEquipment } from "../../store/equipmentManagerSlice";
import { useAction } from "./components/ActionContext";

function Equipment() {
  const { dataEquipment } = useSelector((state) => state.equipment_manager);
  const { action, setAction } = useAction();
  const [query, setQuery] = useState("");
  const handleReload = () => {
    window.location.reload();
  };
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/wastebin/all");
        const data = await response.json();
        if (data && data.success && Array.isArray(data.data)) {
          dispatch(loadEquipment(data.data));
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    return () => {
      dispatch(loadEquipment([]));
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between gap-2">
        <div className="flex flex-1 flex-row ">
          <button
            id="searchButton"
            className="block rounded-s-xl bg-green-500 px-4 text-white"
          >
            <IconSearch />
          </button>
          <input
            id="search"
            className="w-full rounded-e-xl border border-s-0 px-3 text-gray-700 focus:bg-slate-50 focus:outline-none"
            placeholder="Search..."
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          className="rounded-xl border bg-white p-3"
          // onClick={() => setAction({ ...action, isAdd: true })}
        >
          <IconPlus />
        </button>
      </div>
      <div className="h-full w-full flex-1 rounded-xl bg-white p-4">
        <div className="flex flex-row justify-between">
          <h1 className="ml-1 font-bold">Quản lý thiết bị</h1>
          <div className="App">
            <button onClick={handleReload}>Tải lại</button>
          </div>
        </div>
        <div className="relative mt-5 h-[calc(100vh-200px)] overflow-auto">
          <TableManager
            dataEquipment={Array.isArray(dataEquipment) ? dataEquipment : []}
            query={query} 
          />
        </div>
      </div>
      <BoxWindow dataEquipment={Array.isArray(dataEquipment) ? dataEquipment : []} />
    </div>
  );
}

export default Equipment;
