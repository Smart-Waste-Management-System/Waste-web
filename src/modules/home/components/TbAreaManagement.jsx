import React, { useEffect, useState } from "react";
import { IconEdit, IconEye, IconTrash } from "../assets/Icon";
import { useAction } from "./ActionContext";
import UserDetail from "./UserDetail";
import WastebinDetail from "./WastebinDetail";

function AreaTable(props) {
  const { dataArea, filter, query } = props;
  const { action, setAction } = useAction();
  const [filteredData, setFilteredData] = useState([]);
  const [details, setDetails] = useState(null);
  const [detailType, setDetailType] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  useEffect(() => {
    if (Array.isArray(dataArea)) {
      const lowerCaseQuery = query.toLowerCase();
      const filteredResult = dataArea.filter((item) => {
        return Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(lowerCaseQuery)
        );
      });
      setFilteredData(filteredResult);
    }
  }, [query, dataArea]);

  const fetchDetails = async (type, id) => {
    try {
      // Kiểm tra type để xác định endpoint phù hợp
      const endpoint =
        type === "users" ? `/api/users/${id}/info` : `/api/wastebins/${id}/info`;
      
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Failed to fetch details for ${type} with id ${id}`);
      }
      
      const data = await response.json();
      setDetails(data);
      setDetailType(type);
      setIsOpen(true); // Hiển thị modal
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };
  
  const closeModal = () => {
    setIsOpen(false);
    setDetails(null);
    setDetailType(null);
  };

  return (
    <>
      <table className="w-full text-center text-sm font-light">
        <thead className="bg-[#B2E9A1] text-sm font-bold text-black">
          <tr>
            <th scope="col" className="py-6 text-center">ID</th>
            <th scope="col" className="py-6 text-center">Được báo cáo bởi</th>
            <th scope="col" className="py-6 text-center">Dữ liệu từ thùng</th>
            <th scope="col" className="py-6 text-center">Báo cáo vào lúc</th>
            <th scope="col" className="py-6 text-center">Actions</th>
          </tr>
        </thead>
          <tbody>
            {filteredData.length ? (
              filteredData.map((item) => (
                <tr key={item.id} className="odd:bg-white even:bg-[#B2E9A1]">
                  <td className="py-2">{"..." + item.id.slice(-12)}</td>
                  <td className="py-2">
                    <button
                      className="rounded bg-green-500 px-4 py-2 text-white hover:bg-blue-600 transition-all duration-300"
                      onClick={() => fetchDetails("users", item.user_id)}
                    >
                      Xem chi tiết
                    </button>
                  </td>
                  <td className="py-2">
                    <button
                      className="rounded bg-green-500 px-4 py-2 text-white hover:bg-blue-600 transition-all duration-300"
                      onClick={() => fetchDetails("wastebins", item.wastebin_id)}
                    >
                      Xem chi tiết
                    </button>
                  </td>
                  <td className="py-2">{formatTimestamp(item.created_at)}</td>
                  <td className="py-2">
                    <div className="flex flex-row items-center justify-center gap-2">
                      <button onClick={() => setAction({ ...action, id: item.id, isRead: true, isEdit: false, isRemove: false })}>
                        <IconEye />
                      </button>
                      <button onClick={() => setAction({ ...action, id: item.id, isRead: false, isEdit: true, isRemove: false })}>
                        <IconEdit />
                      </button>
                      <button onClick={() => setAction({ ...action, id: item.id, isRead: false, isEdit: false, isRemove: true })}>
                        <IconTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  Không tìm thấy thông tin báo cáo
                </td>
              </tr>
            )}
          </tbody>
      </table>

      {/* Modal hiển thị chi tiết */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-green-500 p-6 rounded shadow-md w-1/3 border-b text-center">
          {detailType === "users" && <UserDetail user={details.data} />}
          {detailType === "wastebins" && <WastebinDetail wastebin={details.data} />}
          <button
            className="mt-4 px-4 py-2  bg-white text-black rounded-md mx-auto block"
            onClick={closeModal}
          >
            Đóng
          </button>
        </div>
      </div>
      
      )}
    </>
  );
}

export default React.memo(AreaTable);
