import React from "react";

const ReportDetail = ({ report }) => {
  if (!report) return <p className="text-center text-gray-500">Không có dữ liệu báo cáo.</p>;

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <h2 className="text-xl font-bold text-gray-700">Thông Tin Báo Cáo</h2>
          <span className="text-sm text-gray-500">
            {new Date(report.created_at).toLocaleDateString()}
          </span>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">ID:</span>
            <span className="text-sm text-gray-800">{report.id}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Địa chỉ:</span>
            <span className="text-sm text-gray-800">{report.Address}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Chất lượng không khí:</span>
            <span className="text-sm text-gray-800">{report.AirQuality}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Tọa độ:</span>
            <span className="text-sm text-gray-800">
              {report.Latitude}, {report.Longitude}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Dự trữ còn lại:</span>
            <span className="text-sm text-gray-800">{report.RemainingFill}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Trọng lượng:</span>
            <span className="text-sm text-gray-800">{report.Weight}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Mô tả:</span>
            <span className="text-sm text-gray-800">{report.description}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Hình ảnh:</span>
            <span className="text-sm text-gray-800">
              <img src={report.image} alt="Report Image" className="w-24 h-24 object-cover" />
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Cập nhật lần cuối:</span>
            <span className="text-sm text-gray-800">
              {new Date(report.updated_at).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
