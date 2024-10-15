import React, { useEffect, useState } from "react";
import { IconEdit, IconEye, IconTrash } from "../assets/Icon";
import { useAction } from "./ActionContext";

function AreaTable(props) {
  const { dataArea, filter, query } = props;
  const { action, setAction } = useAction();
  const [filteredData, setFilteredData] = useState([]);

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

  return (
    <table className="w-full text-center text-sm font-light">
      <thead className="bg-[#B2E9A1] text-sm font-bold text-black">
        <tr>
          <th scope="col" className="py-6 text-center">ID</th>
          <th scope="col" className="py-6 text-center">Name</th>
          <th scope="col" className="py-6 text-center">Address</th>
          <th scope="col" className="py-6 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((item) => (
          <tr key={item.id} className="odd:bg-white even:bg-[#B2E9A1]">
            <th scope="row" className="whitespace-nowrap font-normal text-gray-900">{item.id}</th>
            <td className="py-2">{item.name}</td>
            <td className="py-2">{item.address}</td>          
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
        ))}
      </tbody>
    </table>
  );
}

export default React.memo(AreaTable);
