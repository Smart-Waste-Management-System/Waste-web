import React from "react";

const UserDetail = ({ user }) => {
  if (!user) return <p className="text-center text-gray-500">Không có dữ liệu người dùng.</p>;

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <h2 className="text-xl font-bold text-gray-700">Thông Tin Người Dùng</h2>
          <span className="text-sm text-gray-500">
            {new Date(user.CreatedAt).toLocaleDateString()}
          </span>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">ID:</span>
            <span className="text-sm text-gray-800">{user.ID}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Họ và tên:</span>
            <span className="text-sm text-gray-800">{`${user.FirstName} ${user.LastName}`}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Email:</span>
            <span className="text-sm text-gray-800">{user.Email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Điện thoại:</span>
            <span className="text-sm text-gray-800">{user.Phone}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Giới tính:</span>
            <span className="text-sm text-gray-800">{user.Gender}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Vai trò:</span>
            <span className="text-sm text-gray-800">{user.Role}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Hạng mục:</span>
            <span className="text-sm text-gray-800">{user.Category}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Cập nhật gần nhất:</span>
            <span className="text-sm text-gray-800">
              {new Date(user.UpdatedAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
