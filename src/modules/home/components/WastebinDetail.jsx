import React from "react";

const WastebinDetail = ({ wastebin }) => {
  if (!wastebin) return <p className="text-center text-gray-500">Không có dữ liệu thùng rác.</p>;

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <h2 className="text-xl font-bold text-gray-700">Thông Tin Thùng Rác</h2>
          <span className="text-sm text-gray-500">
            {new Date(wastebin.timestamp).toLocaleDateString()}
          </span>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">ID:</span>
            <span className="text-sm text-gray-800">{wastebin.id}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Địa chỉ:</span>
            <span className="text-sm text-gray-800">{wastebin.address}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Tọa độ:</span>
            <span className="text-sm text-gray-800">
              {wastebin.latitude}, {wastebin.longitude}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Lần cập nhật gần nhất:</span>
            <span className="text-sm text-gray-800">
              {new Date(wastebin.timestamp).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WastebinDetail;
