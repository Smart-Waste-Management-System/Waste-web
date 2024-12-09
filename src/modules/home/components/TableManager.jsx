import React, { useEffect, useState } from "react";
import { IconEdit, IconEye, IconTrash } from "../assets/Icon";
import { useAction } from "./ActionContext";

const TableManager = ({ dataEmployee, filter, query, removeEmployee }) => {
  const { action, setAction } = useAction();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Lọc dữ liệu dựa trên query
    const lowerCaseQuery = query ? query.toLowerCase() : '';
    const filteredResult = dataEmployee.filter((item) => {
      return Object.values(item).some((value) => {
        if (value && typeof value === "string") {
          return value.toLowerCase().includes(lowerCaseQuery);
        }
        return false;
      });
    });
    setFilteredData(filteredResult);
  }, [query, dataEmployee]);

  const handleRemove = (id) => {
    removeEmployee(id); // Gọi hàm xóa đã truyền từ component cha
  };

  return (
    <table className="w-full text-center text-sm font-light">
      <thead className="bg-[#B2E9A1] text-sm font-bold text-black">
        <tr>
          <th scope="col" className="py-6 text-center">Số điện thoại</th>
          <th scope="col" className="py-6 text-left">Họ và tên đệm</th>
          <th scope="col" className="py-6 text-left">Tên</th>
          <th scope="col" className="py-6 text-center">Giới tính</th>
          <th scope="col" className="py-6 text-left">Email</th>
          <th scope="col" className="py-6 text-center">Vai trò</th>
          <th scope="col" className="py-6 text-center">Ca</th>
          <th scope="col" className="py-6 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.length ? (
          filteredData.map((item) => (
            <tr key={item.id || item.ID} className="odd:bg-white even:bg-[#B2E9A1]">
              <td className="py-2">{item.Phone || "N/A"}</td>
              <td className="py-2 text-left">{item.FirstName || "N/A"}</td>
              <td className="py-2 text-left">{item.LastName || "N/A"}</td>
              <td className="py-2">{item.Gender || "N/A"}</td>
              <td className="py-2 text-left">{item.Email || "N/A"}</td>
              <td className="py-2">{item.Role || "N/A"}</td>
              <td className="py-2">{item.Category || "N/A"}</td>
              <td className="py-2">
                <div className="flex flex-row items-center justify-center gap-2">
                  <button onClick={() => setAction({ id: item.id || item.ID, isRead: true })}>
                    <IconEye />
                  </button>
                  <button onClick={() => setAction({ id: item.id || item.ID, isEdit: true })}>
                    <IconEdit />
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
              Không tìm thấy danh sách nhân viên
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default React.memo(TableManager);
