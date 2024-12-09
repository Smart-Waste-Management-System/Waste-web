import React, { useEffect, useState, useCallback } from "react";
import { useAction } from "./ActionContext";
import { Input } from "./Input";
import { useDispatch } from "react-redux";
import { removeEquipmentWithID, editEquipment } from "../../../store/equipmentManagerSlice";
import ReportDetail from "./ReportDetail"; // Giả sử bạn đã có component ReportDetail

const BoxWindow = ({ dataEquipment }) => {
  const { action, setActionDefault } = useAction();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    address: "",
    weight: "",
    remaining_fill: "",
    air_quality: "",
    water_level: "",
    latitude: "",
    longitude: "",
  });

  const [report, setReport] = useState(null); // State để lưu báo cáo gần nhất
  const [error, setError] = useState(""); // State để lưu thông báo lỗi

  const elementModify =
    dataEquipment.find((item) => item.id === action.id) || {};

  useEffect(() => {
    if (action.isEdit && elementModify) {
      setFormData((prev) => ({
        ...prev,
        ...elementModify,
      }));
    } else if (action.isRead) {
      setFormData({ ...elementModify });
    } else if (action.isAdd) {
      setFormData({
        address: "",
        weight: "",
        remaining_fill: "",
        air_quality: "",
        water_level: "",
        latitude: "",
        longitude: "",
      });
    }
  }, [action, elementModify]);

  const renderInputs = () => {
    const inputFields = [
      { title: "Cân nặng(kg)", name: "weight", type: "number" },
      { title: "Phần còn trống(%)", name: "remaining_fill", type: "number" },
      { title: "Nồng độ khí thối", name: "air_quality", type: "number" },
      { title: "Kinh độ", name: "latitude", type: "text" },
      { title: "Vĩ độ", name: "longitude", type: "text" },
      { title: "Địa chỉ", name: "address", type: "text" },
    ];

    return inputFields.map((field) => (
      <Input
        key={field.name}
        title={field.title}
        placeholder={formData[field.name] || `Nhập ${field.title}`}
        type={field.type}
        status={action.isRead ? "read" : "edit"}
        name={field.name}
        onChange={(key, value) => handleInputChange(key, value)}
      />
    ));
  };

  const handleGetReport = useCallback(async () => {
    setError(""); // Xóa lỗi cũ trước khi gọi API
    try {
      const response = await fetch(`/wastebin/reports/last/${action.id}`);
      if (response.ok) {
        const rs = await response.json();
        setReport(rs.data);
      } else {
        setError("Không thể lấy báo cáo gần nhất. Hãy thử lại sau!");
        console.error("Lỗi khi lấy báo cáo gần nhất.");
      }
    } catch (error) {
      setError("Có lỗi xảy ra trong quá trình gọi API.");
      console.error("Lỗi trong quá trình gọi API:", error);
    }
  }, [action.id]);

  const handleRemove = useCallback(async () => {
    try {
      const response = await fetch(`/wastebin/${action.id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        alert("Xóa thiết bị thành công!");
        dispatch(removeEquipmentWithID(action.id));
        setActionDefault();
      } else {
        const errorData = await response.json();
        alert(`Không thể xóa thiết bị. Lỗi: ${errorData.message || "Unknown error"}`);
        console.error("Lỗi khi xóa thiết bị:", errorData);
      }
    } catch (error) {
      alert("Có lỗi xảy ra khi gọi API. Vui lòng thử lại sau!");
      console.error("Lỗi khi gọi API DELETE:", error);
    }
  }, [dispatch, action.id, setActionDefault]);
  

  const handleInputChange = useCallback((key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const hasReportOrError = report || error;

  return (
    <div
      className={`absolute inset-0 z-10 ${
        action.isAdd || action.isEdit || action.isRead || action.isRemove
          ? ""
          : "hidden"
      }`}
    >
      <div className="h-full w-full bg-black bg-opacity-30"></div>
      <div className="fixed left-1/2 top-1/2 z-20 w-5/6 max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white shadow-lg">
        <div className="p-6">
          <div className="mb-4 text-xl font-bold text-gray-700">
            {action.isAdd && "Thêm thiết bị mới"}
            {action.isEdit && "Chỉnh sửa thiết bị"}
            {action.isRead && "Xem thông tin thiết bị"}
            {action.isRemove && "Xóa thiết bị"}
          </div>
          {(action.isRead || action.isEdit || action.isAdd) && (
            <div className={`flex ${hasReportOrError ? "space-x-6" : ""}`}>
              <div
                className={`space-y-4 ${
                  hasReportOrError ? "w-2/3" : "w-full"
                }`}
              >
                {renderInputs()}
              </div>
              {hasReportOrError && (
                <div className="w-1/3">
                  {error && (
                    <div className="text-red-500 text-sm mb-2">{error}</div>
                  )}
                  {report && !error && <ReportDetail report={report} />}
                </div>
              )}
            </div>
          )}

          {(action.isRead || action.isAdd || action.isEdit) && (
            <div className="mt-6 flex justify-center gap-4">
              <button
                className="rounded-lg bg-gray-200 px-4 py-2"
                onClick={setActionDefault}
              >
                Hủy
              </button>
              <button
                className="rounded-lg bg-green-500 px-4 py-2 text-white"
                onClick={handleGetReport}
              >
                Xem report gần nhất
              </button>
            </div>
          )}
          {action.isRemove && (
            <div className="text-center">
              <h4 className="mb-4 text-xl font-bold text-gray-700">
                Xác nhận xóa
              </h4>
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
