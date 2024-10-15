import React, { useEffect, useState } from "react";
import { IconPlus, IconSearch } from "./assets/Icon";
import TableManager from "./components/TableManager";
import BoxWindow from "./components/BoxWindow";  
import { useDispatch, useSelector } from "react-redux";
import { loadEmployee } from "../../store/employeeManagerSlice";
import { useAction } from "./components/ActionContext";
// import UserUploader from "../../assets/fakedata/user/regisfake";

function EmployeeManagement() {
  const { dataEmployee } = useSelector((state) => state.employee_manager);
  const [filter, setFilter] = useState("all");
  const { action, setAction } = useAction();
  const [query, setQuery] = useState("");
  const handleReload = () => {
    window.location.reload();
  };
  const dispatch = useDispatch();

  const handleSelectChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/users/listUser");
        const data = await response.json();
        if (data && Array.isArray(data.info)) {
          dispatch(loadEmployee(data.info));
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    return () => {
      dispatch(loadEmployee([]));
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
          onClick={() => setAction({ ...action, isAdd: true })}
        >
          <IconPlus />
        </button>
      </div>
      <div className="h-full w-full flex-1 rounded-xl bg-white p-4">
        <div className="flex flex-row justify-between">
          <h1 className="ml-1 font-bold">Employee Management</h1>
          <div className="App">
            <button onClick={handleReload}>Reload</button>
          </div>
          {/* <div className="relative mr-3 flex flex-row">
            <UserUploader />
          </div> */}
        </div>
        <div className="relative mt-5 h-[calc(100vh-200px)] overflow-auto">
          <TableManager
            filter={filter}
            dataEmployee={Array.isArray(dataEmployee) ? dataEmployee : []}
            query={query}
          />
        </div>
      </div>
      <BoxWindow dataEmployee={Array.isArray(dataEmployee) ? dataEmployee : []} />
    </div>
  );
}

export default EmployeeManagement;
