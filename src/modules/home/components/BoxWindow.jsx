import React, { useEffect, useState } from "react";
import { useAction } from "./ActionContext";
import Example_bg_local from "../assets/Example_bg_local.png";
import Example_icon_local from "../assets/Example_icon_local.svg";
import { Input } from "./Input";
import { useDispatch } from "react-redux";
import {
  addEmployee,
  removeEmployeeWithID,
  editEmployee,
} from "../../../store/employeeManagerSlice";
import { countryOptions } from "../assets/DataCountry";
function BoxWindow(props) {
  const { action, setActionDefault, setAction } = useAction();
  const { dataEmployee } = props;
  const elementModify = dataEmployee.filter((item) => item.id === action.id)[0];
  const [newEmployee, setNewEmployee] = useState({
    date_of_birth: "",
    category: "",
    gender: "",
    cin: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    nationality: "",
    phone: "",
    poo: "",
    por: "",
    role_name: "",
    password: "",
    email: ""
  });
  const [updatedElementModify, setUpdatedElementModify] = useState({});

  const handleInputChangeCreate = (key, value) => {
    setNewEmployee((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleInputChangeEdit = (key, value) => {
    setUpdatedElementModify((prevState) => ({
      ...prevState,
      [key.toLowerCase()]: value,
    }));
  };

  const dispatch = useDispatch();
  const handleRemoveWithID = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/users/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        dispatch(removeEmployeeWithID(id));
        setActionDefault();
        console.log(`Employee with ID ${id} has been successfully removed.`);
      } else {
        console.error("Failed to remove employee. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error occurred while removing employee:", error);
    }
  };

  const handleAddEmployee = async (employeeData) => {
    if (!employeeData.first_name || !employeeData.last_name || !employeeData.gender || !employeeData.cin || !employeeData.nationality || !employeeData.por || !employeeData.poo || !employeeData.role_name || !employeeData.phone || !employeeData.password || !employeeData.category || !employeeData.email) {
      console.log(employeeData)
      console.error("Missing required fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      if (response.ok) {
        console.log("Employee has been successfully registered.");
        setNewEmployee({
          first_name: "",
          middle_name: "",
          last_name: "",
          gender: "",
          cin: "",
          nationality: "",
          por: "",
          poo: "",
          role_name: "",
          phone: "",
          password: "",
          category: "",
          email: ""
        });
        setActionDefault();
      } else {
        console.error("Failed to register employee. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error occurred while registering employee:", error);
    }
  };

  const handleEditEmployee = async (newE) => {
    const newEWithId = {
      ...newE,
      id: action.id,
    };

    try {
      const response = await fetch(`http://localhost:8080/users/${newEWithId.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEWithId),
      });

      if (!response.ok) {
        throw new Error('Failed to update employee');
      }

      dispatch(editEmployee(newEWithId));

      setUpdatedElementModify({});
      setActionDefault();
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div
      className={`absolute left-0 top-0 z-10 ${action.isRead || action.isEdit || action.isRemove || action.isAdd ? "" : "hidden"} h-full w-full rounded-xl`}
    >
      <div className="h-full w-full bg-black opacity-30"></div>
      {action.isRead || action.isEdit ? (
          <div className="absolute left-2/4 top-2/4 z-20 block w-2/5 -translate-x-2/4 -translate-y-2/4 overflow-hidden rounded-xl bg-white pb-4">
            <div className="relative w-full">
              <div className="w-full overflow-hidden rounded-b-3xl">
                <img src={Example_bg_local} alt="" className="" />
              </div>
              <div className="absolute left-2/4 top-1/3 h-28 w-28 -translate-x-2/4 rounded-full bg-center">
                <img src={Example_icon_local} alt="" />
              </div>
            </div>
            <div className="flex flex-col gap-7">
              <div id="formInput" className="mt-5 flex flex-col gap-1 px-10">
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col">
                    <Input
                      title="First Name"
                      placeholder={elementModify.first_name}
                      type="text"
                      status={`${action.isRead ? "read" : "edit"}`}
                      name="first_name"
                      onChange={handleInputChangeEdit}
                    />
                  </div>
                  <div className="flex flex-col"> 
                    <Input
                      title="Middle Name"
                      placeholder={elementModify.middle_name}
                      type="text"
                      status={`${action.isRead ? "read" : "edit"}`}
                      name="middle_name"
                      onChange={handleInputChangeEdit}
                    />
                  </div>
                  <div className="flex flex-col">
                    <Input
                      title="Last Name"
                      placeholder={elementModify.last_name}
                      type="text"
                      status={`${action.isRead ? "read" : "edit"}`}
                      name="last_name"
                      onChange={handleInputChangeEdit}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col">
                    <Input
                      title="Date of birth"
                      type="date"
                      placeholder={elementModify.date_of_birth}
                      status={`${action.isRead ? "read" : "edit"}`}
                      name="date_of_birth"
                      onChange={handleInputChangeEdit}
                    />
                  </div>
                  <div className="flex flex-col">
                    <Input
                      title="Role"
                      type="text"
                      placeholder={elementModify.role_name}
                      status={`${action.isRead ? "read" : "edit"}`}
                      name="role_name"
                      onChange={handleInputChangeEdit}
                    />
                  </div>
                </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                    <Input
                      title="Gender"
                      type="radio"
                      value={elementModify.gender}
                      status={`${action.isRead ? "read" : "edit"}`}
                      name="gender"
                      onChange={handleInputChangeEdit}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div>
                      <label
                        htmlFor="national"
                        className="ml-1 text-sm font-light text-gray-600"
                      >
                        Nationality:
                      </label>
                      <div className="flex h-8 w-full rounded-lg bg-[#E3EDF9] px-3 text-start text-xs text-gray-500">
                        <select
                          name="national"
                          id="national"
                          className="h-full w-full cursor-pointer bg-[#E3EDF9] focus:outline-none"
                          onChange={(event) => {
                            handleInputChangeEdit("national", event.target.value);
                          }}
                          defaultValue={elementModify.nationality}
                          disabled={action.isRead}
                        >
                          <option value="default">{elementModify.nationality}</option>
                          {countryOptions.map((item) => (
                            <option key={item.value} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col">
                    <Input
                      title="Phone number"
                      placeholder={elementModify.phone}
                      type="tel"
                      status={`${action.isRead ? "read" : "edit"}`}
                      name="phone"
                      onChange={handleInputChangeEdit}
                    />
                  </div>
                  <Input
                    title="Email"
                    placeholder={elementModify.email}
                    type="email"
                    status={`${action.isRead ? "read" : "edit"}`}
                    name="email"
                    onChange={handleInputChangeEdit}
                  />
                </div>
                <Input
                  title="Citizen identification number"
                  placeholder={elementModify.cin}
                  type="password"
                  status={`${action.isRead ? "read" : "edit"}`}
                  name="cin"
                  value={newEmployee.cin}
                  onChange={handleInputChangeEdit}
                />
                <Input
                  title="Place of origin"
                  placeholder={elementModify.poo}
                  type="text"
                  status={`${action.isRead ? "read" : "edit"}`}
                  name="poo"
                  value={newEmployee.poo}
                  onChange={handleInputChangeEdit}
                />
                <Input
                  title="Place of residence"
                  placeholder={elementModify.por}
                  type="text"
                  status={`${action.isRead ? "read" : "edit"}`}
                  name="por"
                  value={newEmployee.por}
                  onChange={handleInputChangeEdit}
                />
                <Input
                  title="Category"
                  placeholder={elementModify.category}
                  type="text"
                  status={`${action.isRead ? "read" : "edit"}`}
                  name="category"
                  value={newEmployee.category}
                  onChange={handleInputChangeEdit}
                />
              </div>
            </div>
            <div className="flex flex-row justify-center gap-2">
            </div>
            <div className="flex flex-row justify-center gap-2 pt-4">
                <button
                  className="w-[20%] rounded-lg bg-[#FAFAFA] px-4 py-3 text-center text-xs font-extralight uppercase text-black shadow-lg"
                  onClick={setActionDefault}
                >
                  cancel
                </button>
                {action.isEdit ? (
                  <button
                    className="w-[20%]  rounded-lg bg-[#57A75A] px-4 py-3 text-center text-xs font-extralight uppercase text-white shadow-lg"
                    onClick={() => handleEditEmployee(updatedElementModify)}
                  >
                    save
                  </button>
                ) : (
                  <button
                    className="w-[20%]  rounded-lg bg-[#57A75A] px-4 py-3 text-center text-xs font-extralight uppercase text-white shadow-lg"
                    onClick={() => {
                      setAction({
                        ...action,
                        isEdit: true,
                        isRead: false,
                      });
                    }}
                  >
                    edit
                  </button>
                )}
            </div>
          </div>
      ) : null}
      {action.isRemove && (
        <div className="fixed left-2/4 top-2/4 z-20 block w-2/5 -translate-x-2/4 -translate-y-2/4 rounded-xl bg-white ">
          <div className="relative flex w-full flex-col justify-between pb-4 pt-5">
            <div className="flex flex-col items-center gap-1 text-center">
              <h4></h4>
              <p className="w-3/4">
                Are you sure you want to remove from the list.
                <br />
              </p>
            </div>
            <div className="mt-8 flex w-full flex-row justify-center gap-2">
              <button
                className="w-[22%] rounded-lg bg-[#57A75A] px-4 py-3 text-center text-xs font-extralight uppercase text-white shadow-lg"
                onClick={setActionDefault}
              >
                NO
              </button>
              <button
                className="w-[22%] rounded-lg bg-[#FAFAFA] px-4 py-3 text-center text-xs font-extralight uppercase text-black shadow-lg"
                onClick={() => {
                  handleRemoveWithID(action.id);
                }}
              >
                YES
              </button>
            </div>
          </div>
        </div>
      )}
      {action.isAdd && (
        <div className="absolute left-2/4 top-2/4 z-20 block w-2/5 -translate-x-2/4 -translate-y-2/4 overflow-hidden rounded-xl bg-white pb-4">
          <div className="relative w-full">
            <div className="w-full overflow-hidden rounded-b-3xl">
              <img src={Example_bg_local} alt="" className="" />
            </div>
            <div className="absolute left-2/4 top-1/3 h-28 w-28 -translate-x-2/4 rounded-full bg-center">
              <img src={Example_icon_local} alt="" />
            </div>
          </div>
          <div className="flex flex-col gap-7">
            <div id="formInput" className="mt-5 flex flex-col gap-1 px-10">
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col">
                  <Input
                    title="First Name"
                    placeholder="Enter your first name"
                    type="text"
                    status="add"
                    name="first_name"
                    value={newEmployee.first_name}
                    onChange={handleInputChangeCreate}
                  />
                </div>
                <div className="flex flex-col"> 
                  <Input
                    title="Middle Name"
                    placeholder=""
                    type="text"
                    status="add"
                    name="middle_name"
                    value={newEmployee.middle_name}
                    onChange={handleInputChangeCreate}
                  />
                </div>
                <div className="flex flex-col">
                  <Input
                    title="Last Name"
                    placeholder=""
                    type="text"
                    status="add"
                    name="last_name"
                    value={newEmployee.last_name}
                    onChange={handleInputChangeCreate}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col">
                  <Input
                    title="Date of birth"
                    type="date"
                    placeholder=""
                    status="add"
                    name="date_of_birth"
                    value={newEmployee.date_of_birth}
                    onChange={handleInputChangeCreate}
                  />
                </div>
                <div className="flex flex-col">
                  <Input
                    title="Role"
                    type="text"
                    placeholder=""
                    status="add"
                    name="role_name"
                    value={newEmployee.role_name}
                    onChange={handleInputChangeCreate}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col">
                  <Input
                    title="Gender"
                    type="radio"
                    placeholder=""
                    status="add"
                    name="gender"
                    value={newEmployee.gender}
                    onChange={handleInputChangeCreate}
                  />
                </div>
                <div className="flex flex-col">
                  <div>
                    <label htmlFor="national" className="ml-1 text-sm font-light text-gray-600">
                      Nationality:
                    </label>
                    <div className="flex h-8 w-full rounded-lg bg-[#E3EDF9] px-3 text-start text-xs text-gray-500">
                      <select
                        name="national"
                        id="national"
                        className="h-full w-full cursor-pointer bg-[#E3EDF9] focus:outline-none"
                        onChange={(e) => {
                          handleInputChangeCreate("nationality", e.target.value);
                        }}
                      >
                        <option value="default">Your national</option>
                        {countryOptions.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col">
                  <Input
                    title="Phone number"
                    placeholder=""
                    type="tel"
                    status="add"
                    name="phone"
                    value={newEmployee.phone}
                    onChange={handleInputChangeCreate}
                  />
                </div>
                <Input
                  title="Email"
                  placeholder=""
                  type="email"
                  status="add"
                  name="email"
                  value={newEmployee.email}
                  onChange={handleInputChangeCreate}
                />
              </div>
              <Input
                title="Citizen identification number"
                placeholder=""
                type="password"
                status="add"
                name="cin"
                value={newEmployee.cin}
                onChange={handleInputChangeCreate}
              />
              <Input
                title="Place of origin"
                placeholder=""
                type="text"
                status="add"
                name="poo"
                value={newEmployee.poo}
                onChange={handleInputChangeCreate}
              />
              <Input
                title="Place of residence"
                placeholder=""
                type="text"
                status="add"
                name="por"
                value={newEmployee.por}
                onChange={handleInputChangeCreate}
              />
              
              <Input
                title="Password"
                placeholder=""
                type="password"
                status="add"
                name="password"
                value={newEmployee.password}
                onChange={handleInputChangeCreate}
              />
              <Input
                title="Category"
                placeholder=""
                type="text"
                status="add"
                name="category"
                value={newEmployee.category}
                onChange={handleInputChangeCreate}
              />
            </div>
            <div className="flex flex-row justify-center gap-2">
              <button
                className="w-[20%] rounded-lg bg-[#FAFAFA] px-4 py-3 text-center text-xs font-extralight uppercase text-black shadow-lg"
                onClick={setActionDefault}
              >
                cancel
              </button>
              <button
                className=" w-[20%] rounded-lg bg-[#57A75A] px-4 py-3 text-center text-xs font-extralight uppercase text-white shadow-lg"
                onClick={() => {
                  handleAddEmployee(newEmployee);
                }}
              >
                save
              </button>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
}

export default React.memo(BoxWindow);
