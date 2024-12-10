import React, { useState } from "react";
import { useAction } from "./ActionContext";
import Example_bg_local from "../assets/Example_bg_local.png";
import Example_icon_local from "../assets/image.png";
import { Input } from "./Input";
import { useDispatch } from "react-redux";
import { removeEmployeeWithID } from "../../../store/employeeManagerSlice";

function BoxWindow({ dataEmployee }) {
  const { action, setActionDefault, setAction } = useAction();
  const dispatch = useDispatch();
  const [reload, setReload] = useState(false);  // State to trigger re-render

  const handleReload = () => {
    setReload((prev) => !prev);  // Toggle reload state to trigger re-render
  };


  const elementModify = dataEmployee.find(item => item.ID === action.id) || {};
  
  const [newEmployee, setNewEmployee] = useState({
    Category: "", Gender: "", First_Name: "", Last_Name: "", Phone: "", Role: "", Password: "", Email: ""
  });
 
  const handleInputChangeCreate = (key, value) => {
    setNewEmployee((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleRemoveWithID = async () => {
    if (!action.id) {
      console.error("ID is required for removing.");
      return;
    }
  
    try {
      const response = await fetch(`/api/users/${action.id}/remove`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        console.log("Employee removed successfully");
        dispatch(removeEmployeeWithID(action.id)); // Redux action to update global state
        setActionDefault(); // Đặt lại trạng thái action
        window.location.reload(); // Reload the page after removal
        alert("Employee removed successfully!"); // Hiển thị thông báo thành công
      } else {
        console.error("Failed to remove employee. Status:", response.status);
      }
    } catch (error) {
      console.error("Error removing employee:", error);
    }
  };
  
  const handleAddEmployee = async (employeeData) => {
    if (Object.values(employeeData).some(value => !value)) {
      console.error("Missing required fields");
      return;
    }

    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeData)
      });

      if (response.ok) {
        setNewEmployee({ First_Name: "", Last_Name: "", Gender: "", Role: "", Phone: "", Password: "", Category: "", Email: "" });
        setActionDefault();
      } else {
        console.error("Failed to register employee. Status:", response.status);
      }
    } catch (error) {
      console.error("Error registering employee:", error);
    }
  };

  const handleEditEmployee = async () => {
    if (!action.id) {
      console.error("ID is required for editing.");
      return;
    }
  
    // Trộn dữ liệu: nếu trường nào không được chỉnh sửa, giữ giá trị ban đầu từ elementModify
    const payload = {
      first_name: newEmployee.First_Name || elementModify.FirstName,
      last_name: newEmployee.Last_Name || elementModify.LastName,
      phone: newEmployee.Phone || elementModify.Phone,
      email: newEmployee.Email || elementModify.Email,
      gender: newEmployee.Gender || elementModify.Gender,
      role: newEmployee.Role || elementModify.Role,
      category: newEmployee.Category || elementModify.Category
    };
  
    try {
      const response = await fetch(`/api/users/${action.id}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
  
      if (response.ok) {
        console.log("Employee updated successfully");
        setNewEmployee({
          First_Name: "", Last_Name: "", Gender: "", Role: "", Phone: "", Password: "", Category: "", Email: ""
        });
        setActionDefault();
      } else {
        console.error('Failed to update employee. Status:', response.status);
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };
  
  
  

  const renderInputCreate = (title, name, placeholder, value, type = "text", status = "add") => (
    <Input
      title={title}
      placeholder={placeholder}
      type={type}
      status={status}
      name={name}
      value={value}
      onChange={handleInputChangeCreate}
    />
  );

  const renderInputEdit = (title, name, placeholder, value, type = "text", status = "edit") => (
    <Input
      title={title}
      placeholder={placeholder}
      type={type}
      status={status}
      name={name}
      value={value || elementModify[name]} 
      onChange={handleInputChangeCreate}
    />
  );

  return (
    <div className={`absolute left-0 top-0 z-10 ${action.isRead || action.isEdit || action.isRemove || action.isAdd ? "" : "hidden"} h-full w-full rounded-xl`}>
      <div className="h-full w-full bg-black opacity-30"></div>

      {action.isRead || action.isEdit ? (
        <div className="absolute left-2/4 top-2/4 z-20 w-2/5 -translate-x-2/4 -translate-y-2/4 overflow-hidden rounded-xl bg-white pb-4">
          <div className="relative w-full">
            <div className="w-full overflow-hidden rounded-b-3xl"><img src={Example_bg_local} alt="" /></div>
            <div className="absolute left-2/4 top-1/3 h-28 w-28 -translate-x-2/4 rounded-full bg-center">
              <img src={Example_icon_local} alt="" />
            </div>
          </div>
          <div className="flex flex-col gap-7 mt-5 px-10">
            <div id="formInput" className="flex flex-col gap-1">
              {renderInputEdit("Số điện thoại", "Phone", elementModify.Phone, newEmployee.Phone, "tel", action.isRead ? "read" : "edit")}
              {renderInputEdit("Email", "Email", elementModify.Email, newEmployee.Email, "email", action.isRead ? "read" : "edit")}
              <div className="grid grid-cols-2 gap-2">
                {renderInputEdit("Họ và tên đệm", "First_Name", elementModify.FirstName, newEmployee.First_Name, "text", action.isRead ? "read" : "edit")}
                {renderInputEdit("Tên", "Last_Name", elementModify.LastName, newEmployee.Last_Name, "text", action.isRead ? "read" : "edit")}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {renderInputEdit("Giới tính", "Gender", elementModify.Gender, newEmployee.Gender, "radio", action.isRead ? "read" : "edit")}
                {renderInputEdit("Vai trò", "Role", elementModify.Role, newEmployee.Role, "text", action.isRead ? "read" : "edit")}
              </div>
              {renderInputEdit("Hạng mục", "Category", elementModify.Category, newEmployee.Category, "text", action.isRead ? "read" : "edit")}
            </div>
            <div className="flex flex-row justify-center gap-2 pt-4">
              <button className="w-[20%] rounded-lg bg-[#FAFAFA] px-4 py-3 text-center text-xs font-extralight uppercase text-black shadow-lg" onClick={setActionDefault}>
                cancel
              </button>
              {action.isEdit ? (
                <button className="w-[20%] rounded-lg bg-[#57A75A] px-4 py-3 text-center text-xs font-extralight uppercase text-white shadow-lg" onClick={() => handleEditEmployee({ newEmployee, id: action.id })}>
                  save
                </button>
              ) : (
                <button className="w-[20%] rounded-lg bg-[#57A75A] px-4 py-3 text-center text-xs font-extralight uppercase text-white shadow-lg" onClick={() => setAction({ ...action, isEdit: true, isRead: false })}>
                  edit
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}

{action.isRemove && (
  <div className="fixed left-2/4 top-2/4 z-20 block w-2/5 -translate-x-2/4 -translate-y-2/4 rounded-xl bg-white">
    <div className="relative flex w-full flex-col justify-between pb-4 pt-5">
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="w-3/4">Are you sure you want to remove from the list?</p>
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
          onClick={handleRemoveWithID}
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
            <div className="w-full overflow-hidden rounded-b-3xl"><img src={Example_bg_local} alt="" /></div>
            <div className="absolute left-2/4 top-1/3 h-28 w-28 -translate-x-2/4 rounded-full bg-center">
              <img src={Example_icon_local} alt="" />
            </div>
          </div>
          <div className="flex flex-col gap-7 mt-5 px-10">
            <div id="formInput" className="flex flex-col gap-1">
              {renderInputCreate("Số điện thoại", "Phone", newEmployee.Phone, newEmployee.Phone, "tel")}
              {renderInputCreate("Email", "Email", newEmployee.Email, newEmployee.Email, "email")}
              {renderInputCreate("Mật khẩu", "Password", newEmployee.Password, newEmployee.Password, "password")}
              <div className="grid grid-cols-2 gap-2">
                {renderInputCreate("Họ và tên đệm", "First_Name", newEmployee.First_Name, newEmployee.First_Name)}
                {renderInputCreate("Tên", "Last_Name", newEmployee.Last_Name, newEmployee.Last_Name)}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {renderInputCreate("Giới tính", "Gender", newEmployee.Gender, newEmployee.Gender, "radio")}
                {renderInputCreate("Vai trò", "Role", newEmployee.Role, newEmployee.Role)}
              </div>
              {renderInputCreate("Hạng mục", "Category", newEmployee.Category, newEmployee.Category)}
            </div>
            <div className="flex flex-row justify-center gap-2 pt-4">
              <button className="w-[20%] rounded-lg bg-[#FAFAFA] px-4 py-3 text-center text-xs font-extralight uppercase text-black shadow-lg" onClick={setActionDefault}>
                cancel
              </button>
              <button className="w-[20%] rounded-lg bg-[#57A75A] px-4 py-3 text-center text-xs font-extralight uppercase text-white shadow-lg" onClick={() => handleAddEmployee(newEmployee)}>
                add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BoxWindow;
