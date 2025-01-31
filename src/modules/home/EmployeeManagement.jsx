import React, { useEffect, useState } from "react";
import { IconPlus, IconSearch } from "./assets/Icon";
import TableManager from "./components/TableManager";
import BoxWindow from "./components/BoxWindow";  
import { useDispatch, useSelector } from "react-redux";
import { loadEmployee } from "../../store/employeeManagerSlice";
import { useAction } from "./components/ActionContext";

function EmployeeManagement() {
  const { dataEmployee } = useSelector((state) => state.employee_manager);
  const { action, setAction } = useAction();
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const [reload, setReload] = useState(false);  // State to trigger re-render

  const handleReload = () => {
    setReload((prev) => !prev);  // Toggle reload state to trigger re-render
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/users/all");
        const result = await response.json();
        if (result && result.success && Array.isArray(result.data)) {
          dispatch(loadEmployee(result.data));
        } else {
          console.error("Unexpected response format:", result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    return () => {
      dispatch(loadEmployee([])); // Xóa dữ liệu khi component unmount
    };
  }, [dispatch, reload]);  // Re-run effect when reload changes

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
          onClick={() => setAction({ ...action, isAdd: true })}
        >
          <IconPlus />
        </button>
      </div>
      <div className="h-full w-full flex-1 rounded-xl bg-white p-4">
        <div className="flex flex-row justify-between">
          <h1 className="ml-1 font-bold">Bảng Nhân Sự</h1>
          <div className="App">
            <button onClick={handleReload}>Tải lại</button>
          </div>
        </div>
        <div className="relative mt-5 h-[calc(100vh-200px)] overflow-auto">
          <TableManager
            dataEmployee={Array.isArray(dataEmployee) ? dataEmployee : []}
            query={query}
            setReload={setReload}  // Pass setReload to TableManager if needed
          />
        </div>
      </div>
      <BoxWindow dataEmployee={Array.isArray(dataEmployee) ? dataEmployee : []} />
    </div>
  );
}

export default EmployeeManagement;
