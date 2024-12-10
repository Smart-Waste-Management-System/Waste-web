import React, { useEffect, useState } from "react";
import { useAction } from "./ActionContext";
import { Input } from "./Input";
import { useDispatch } from "react-redux";
import {
  addArea,
  removeAreaWithID,
  editArea,
} from "../../../store/areaManagerSlice";

const BoxWindow = ({ dataArea }) => {
  const { action, setActionDefault, setAction } = useAction();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });

  const elementModify = dataArea.find((item) => item.id === action.id) || {};

  useEffect(() => {
    if (action.isEdit || action.isRead) {
      setFormData(elementModify);
    } else if (action.isAdd) {
      setFormData({ name: "", address: "" });
    }
  }, [action, elementModify]);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key.toLowerCase()]: value }));
  };

  // const handleSubmit = async () => {
  //   const url = action.isAdd
  //     ? "/wastebin/reports/create"
  //     : `/wastebin/reports/${action.id}`;
  //   const method = action.isAdd ? "POST" : "PUT";

  //   try {
  //     const response = await fetch(url, {
  //       method,
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //     });

  //     if (response.ok) {
  //       action.isAdd
  //         ? dispatch(addArea(formData))
  //         : dispatch(editArea({ ...formData, id: action.id }));
  //       setActionDefault();
  //       console.log("Operation succeeded.");
  //     } else {
  //       console.error(`Failed operation. Status: ${response.status}`);
  //     }
  //   } catch (error) {
  //     console.error("Error occurred during operation:", error);
  //   }
  // };

  const handleRemove = async () => {
    try {
      const response = await fetch(`/api/reports/${action.id}/remove`, {
        method: "DELETE",
      });
      if (response.ok) {
        dispatch(removeAreaWithID(action.id));
        setActionDefault();
        console.log("Successfully removed report.");
      } else {
        console.error("Failed to remove area. Status:", response.status);
      }
    } catch (error) {
      console.error("Error occurred while removing area:", error);
    }
  };

  const renderInputs = () => {
    const inputs = [
      { title: "ID", name: "id", type: "text" },
      { title: "Cân nặng(kg)", name: "Weight", type: "text" },
      { title: "Phần còn trống(%)", name: "RemainingFill", type: "text" },
      { title: "Nồng độ khí thối", name: "AirQuality", type: "text" },
      { title: "Địa chỉ", name: "Address", type: "text" },
      { title: "Kinh độ", name: "Latitude", type: "text" },
      { title: "Vĩ độ", name: "Longitude", type: "text" },
      { title: "Mô tả của báo cáo", name: "description", type: "text" },
      { title: "Thời điểm tạo báo cáo", name: "created_at", type: "text" },
      { title: "Ảnh minh chứng", name: "image", type: "text" },
      
    ];

    return inputs.map((input) => (
      <Input
        key={input.name}
        title={input.title}
        placeholder={formData[input.name] || `Enter ${input.name}`}
        type={input.type}
        status={action.isRead ? "read" : "edit"}
        name={input.name}
        onChange={handleInputChange}
      />
    ));
  };

  return (
    <div
      className={`absolute left-0 top-0 z-10 ${
        action.isRead || action.isEdit || action.isRemove || action.isAdd ? "" : "hidden"
      } h-full w-full`}
    >
      <div className="h-full w-full bg-black opacity-30"></div>
      <div className="fixed left-2/4 top-2/4 z-20 w-2/5 -translate-x-2/4 -translate-y-2/4 rounded-xl bg-white p-5">
      <div className="p-6">
          <div className="mb-4 text-xl font-bold text-gray-700">
            {action.isAdd && "Tạo báo cáo mới"}
            {action.isEdit && "Chỉnh sửa báo cáo"}
            {action.isRead && "Xem chi tiết báo cáo"}
            {action.isRemove}
          </div>
        {action.isRead || action.isEdit || action.isAdd ? (
          <div className="flex flex-col gap-4">
            {renderInputs()}
            <div className="flex justify-center gap-4">
              <button
                className="rounded-lg bg-gray-200 px-4 py-2"
                onClick={setActionDefault}
              >
                Cancel
              </button>
              {(action.isAdd || action.isEdit) && (
                <button
                  className="rounded-lg bg-green-500 px-4 py-2 text-white"
                >
                  {action.isAdd ? "Add" : "Save"}
                </button>
              )}
            </div>
          </div>
        ) : null}
        {action.isRemove && (
          <div className="text-center">
              <h4 className="mb-4 text-xl font-bold text-gray-700">Xác nhận xóa</h4>
              <p className="mt-2 text-gray-600">
                Bạn có chắc chắn muốn xóa báo cáo này không?
              </p>            
              <div className="mt-4 flex justify-center gap-4">
              <button
                className="rounded-lg bg-gray-200 px-4 py-2"
                onClick={setActionDefault}
              >
                No
              </button>
              <button
                className="rounded-lg bg-red-500 px-4 py-2 text-white"
                onClick={handleRemove}
              >
                Yes
              </button>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default React.memo(BoxWindow);
