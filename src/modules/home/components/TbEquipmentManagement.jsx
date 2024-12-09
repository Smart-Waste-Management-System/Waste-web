import React, { useEffect, useState } from "react";
import { IconEdit, IconEye, IconTrash } from "../assets/Icon";
import { useAction } from "./ActionContext";

function EquipmentTable(props) {
  const { dataEquipment, filter, query } = props;
  const { action, setAction } = useAction();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (Array.isArray(dataEquipment)) {
      const lowerCaseQuery = query.toLowerCase();
      const filteredResult = dataEquipment.filter((item) => {
        return Object.values(item).some((value) =>
          value?.toString().toLowerCase().includes(lowerCaseQuery)
        );
      });
      setFilteredData(filteredResult);
    } else {
      setFilteredData([]); // Đảm bảo filteredData luôn là mảng
    }
  }, [query, dataEquipment]);

  const formatTimestamp = (timestamp) => {
    // Convert ISO string to Date object
    const date = new Date(timestamp);
    return date.toLocaleString("vi-VN", {
      weekday: "long", // Thứ trong tuần
      year: "numeric", // Năm
      month: "long", // Tháng
      day: "numeric", // Ngày
      hour: "2-digit", // Giờ
      minute: "2-digit", // Phút
      second: "2-digit", // Giây
    });
  };

  return (
    <table className="w-full text-center text-sm font-light">
      <thead className="bg-[#B2E9A1] text-sm font-bold text-black">
        <tr>
          <th scope="col" className="py-6 text-right">ID</th>
          <th scope="col" className="py-6 text-center">Địa chỉ</th>
          <th scope="col" className="py-6 text-center">Mức độ đầy</th>
          <th scope="col" className="py-6 text-center">Cân nặng</th>
          <th scope="col" className="py-6 text-center">Nồng đồ khí thối</th>
          <th scope="col" className="py-6 text-center">Tọa độ</th>
          <th scope="col" className="py-6 text-center">Lần cập nhật gần nhất</th>
          <th scope="col" className="py-6 text-center">Thùng sẽ đầy trong</th>
          <th scope="col" className="py-6 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.length ? (
          filteredData.map((item) => (
            <tr key={item.id || item.ID} className="odd:bg-white even:bg-[#B2E9A1]">
              <td className="py-2 text-right">{"..." + item.id.slice(-12)}</td>
              <th scope="row" className="whitespace-nowrap font-normal text-gray-900">
                {item.address}
              </th>
              <td className="py-2">{100 - item.remaining_fill}</td>
              <td className="py-2">{item.weight}</td>
              <td className="py-2">{item.air_quality}</td>
              <td className="py-2">{`${item.latitude || "-"} - ${item.longitude || "-"}`}</td>
              <td className="py-2">{formatTimestamp(item.timestamp)}</td> {/* Format timestamp */}
              <td className="py-2">{`${item.day || "-"} ngày ${item.hour || "-"} giờ ${item.minute || "-"} phút  ${item.minute || "-"} giây`}</td>
              <td className="py-2">
                <div className="flex flex-row items-center justify-center gap-2">
                  <button onClick={() => setAction({ id: item.id || item.ID, isRead: true })}>
                    <IconEye />
                  </button>
                  <button onClick={() => setAction({ id: item.id || item.ID, isRemove: true })}>
                    <IconTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6} className="py-4 text-center text-gray-500">
              Không tìm thấy danh sách thiết bị
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default React.memo(EquipmentTable);
