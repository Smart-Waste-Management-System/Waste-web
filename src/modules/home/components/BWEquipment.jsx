import React, { useEffect, useState } from "react";
import { useAction } from "./ActionContext";
import { Input } from "./Input";
import { useDispatch } from "react-redux";
import {
  addEquipment,
  removeEquipmentWithID,
  editEquipment,
} from "../../../store/equipmentManagerSlice";

function BoxWindow(props) {
  const { action, setActionDefault, setAction } = useAction();
  const { dataEquipment } = props;
  const elementModify = dataEquipment.find((item) => item.id === action.id) || {};
  const [newEquipment, setNewEquipment] = useState({
    address: "",
    area_id: "56152651-efdf-4ec5-a5bf-cc1c0ee07f45",
    weight: "",
    remaining_fill: "",
    air_quality: "",
    water_level: "",
    latitude: "",
    longitude: "",
  });
  const [updatedElementModify, setUpdatedElementModify] = useState({});

  useEffect(() => {
    if (action.isEdit && elementModify) {
      setUpdatedElementModify(elementModify);
    }
  }, [action, elementModify]);

  const handleInputChangeCreate = (key, value) => {
    setNewEquipment((prevState) => ({
      ...prevState,
      [key.toLowerCase()]: value,
    }));
  };

  const handleInputChangeEdit = (key, value) => {
    setUpdatedElementModify((prevState) => ({
      ...prevState,
      [key.toLowerCase()]: value,
    }));
  };

  const dispatch = useDispatch();
  const handleRemoveWithID = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/trashBin/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        dispatch(removeEquipmentWithID(id));
        setActionDefault();
        console.log(`Equipment with ID ${id} has been successfully removed.`);
      } else {
        console.error("Failed to remove equipment. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error occurred while removing equipment:", error);
    }
  };

  const handleAddEquipment = async (equipmentData) => {
    try {
      const response = await fetch("http://localhost:8080/trashBin/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(equipmentData),
      });

      if (response.ok) {
        console.log("Equipment has been successfully added.");
        setNewEquipment({
          address: "",
          area_id: "56152651-efdf-4ec5-a5bf-cc1c0ee07f45",
          weight: "",
          remaining_fill: "",
          air_quality: "",
          water_level: "",
          latitude: "",
          longitude: "",
        });
        setActionDefault();
      } else {
        console.error("Failed to add equipment. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error occurred while adding equipment:", error);
    }
  };

  const handleEditEquipment = async (newE) => {
    const newEWithId = {
      ...newE,
      id: action.id,
    };

    try {
      const response = await fetch(`http://localhost:8080/trashBin/${newEWithId.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEWithId),
      });

      if (!response.ok) {
        throw new Error("Failed to update equipment");
      }

      dispatch(editEquipment(newEWithId));
      setUpdatedElementModify({});
      setActionDefault();
    } catch (error) {
      console.error("Error updating equipment:", error);
    }
  };

  return (
    <div className={`absolute left-0 top-0 z-10 ${action.isRead || action.isEdit || action.isRemove || action.isAdd ? "" : "hidden"} h-full w-full rounded-xl`}>
      <div className="h-full w-full bg-black opacity-30"></div>

      {action.isRead || action.isEdit || action.isRemove || action.isAdd ? (
        <div className="fixed left-2/4 top-2/4 z-20 w-2/5 -translate-x-2/4 -translate-y-2/4 overflow-hidden rounded-xl bg-white pb-4">
          <div className="relative w-full">
            <div className="flex flex-col gap-7">
              {action.isRead || action.isEdit ? (
                <div className="mt-5 flex flex-col gap-1 px-10">
                  <Input
                    title="ID"
                    placeholder={elementModify.id}
                    type="text"
                    status="read"
                    name="id"
                    onChange={handleInputChangeEdit}
                  />
                  <Input
                    title="Weight"
                    placeholder={elementModify.weight}
                    type="number"
                    status={`${action.isRead ? "read" : "edit"}`}
                    name="weight"
                    onChange={handleInputChangeEdit}
                  />
                  <Input
                    title="Remaining Fill"
                    placeholder={elementModify.remaining_fill}
                    type="number"
                    status={`${action.isRead ? "read" : "edit"}`}
                    name="remaining_fill"
                    onChange={handleInputChangeEdit}
                  />
                  <Input
                    title="Air Quality"
                    placeholder={elementModify.air_quality}
                    type="number"
                    status={`${action.isRead ? "read" : "edit"}`}
                    name="air_quality"
                    onChange={handleInputChangeEdit}
                  />
                  <Input
                    title="Water Level"
                    placeholder={elementModify.water_level}
                    type="number"
                    status={`${action.isRead ? "read" : "edit"}`}
                    name="water_level"
                    onChange={handleInputChangeEdit}
                  />
                  <Input
                    title="Latitude"
                    placeholder={elementModify.latitude}
                    type="text"
                    status={`${action.isRead ? "read" : "edit"}`}
                    name="latitude"
                    onChange={handleInputChangeEdit}
                  />
                  <Input
                    title="Longitude"
                    placeholder={elementModify.longitude}
                    type="text"
                    status={`${action.isRead ? "read" : "edit"}`}
                    name="longitude"
                    onChange={handleInputChangeEdit}
                  />
                  <Input
                    title="Address"
                    placeholder={elementModify.address}
                    type="text"
                    status={`${action.isRead ? "read" : "edit"}`}
                    name="address"
                    onChange={handleInputChangeEdit}
                  />
                  <div className="flex flex-row justify-center gap-2 mt-4">
                    <button
                      className="w-[20%] rounded-lg bg-[#FAFAFA] px-4 py-3 text-center text-xs font-extralight uppercase text-black shadow-lg"
                      onClick={setActionDefault}
                    >
                      Cancel
                    </button>
                    {action.isEdit ? (
                      <button
                        className="w-[20%] rounded-lg bg-[#57A75A] px-4 py-3 text-center text-xs font-extralight uppercase text-white shadow-lg"
                        onClick={() => handleEditEquipment(updatedElementModify)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="w-[20%] rounded-lg bg-[#57A75A] px-4 py-3 text-center text-xs font-extralight uppercase text-white shadow-lg"
                        onClick={() => {
                          setAction({
                            ...action,
                            isEdit: true,
                            isRead: false,
                          });
                        }}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              ) : null}
              {action.isRemove && (
                <div className="relative flex flex-col items-center text-center py-4">
                  <h4>Confirmation</h4>
                  <p className="w-3/4">Are you sure you want to remove this item from the list?</p>
                  <div className="mt-8 flex w-full justify-center gap-2">
                    <button
                      className="w-[22%] rounded-lg bg-[#57A75A] px-4 py-3 text-center text-xs font-extralight uppercase text-white shadow-lg"
                      onClick={setActionDefault}
                    >
                      No
                    </button>
                    <button
                      className="w-[22%] rounded-lg bg-[#FAFAFA] px-4 py-3 text-center text-xs font-extralight uppercase text-black shadow-lg"
                      onClick={() => handleRemoveWithID(action.id)}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              )}
              {action.isAdd && (
                <div className="mt-5 flex flex-col gap-1 px-10">
                  <div className="grid grid-cols-1 gap-3">
                    <Input
                      title="Weight"
                      placeholder=""
                      type="text"
                      status="add"
                      name="weight"
                      onChange={handleInputChangeCreate}
                    />
                    <Input
                      title="Remaining Fill"
                      placeholder=""
                      type="text"
                      status="add"
                      name="remaining_fill"
                      onChange={handleInputChangeCreate}
                    />
                    <Input
                      title="Air Quality"
                      placeholder=""
                      type="text"
                      status="add"
                      name="air_quality"
                      onChange={handleInputChangeCreate}
                    />
                    <Input
                      title="Water Level"
                      placeholder=""
                      type="text"
                      status="add"
                      name="water_level"
                      onChange={handleInputChangeCreate}
                    />
                    <Input
                      title="Latitude"
                      placeholder=""
                      type="text"
                      status="add"
                      name="latitude"
                      onChange={handleInputChangeCreate}
                    />
                    <Input
                      title="Longitude"
                      placeholder=""
                      type="text"
                      status="add"
                      name="longitude"
                      onChange={handleInputChangeCreate}
                    />
                    <Input
                      title="Address"
                      placeholder=""
                      type="text"
                      status="add"
                      name="address"
                      onChange={handleInputChangeCreate}
                    />
                  </div>
                  <div className="flex flex-row justify-center gap-2 mt-4">
                    <button
                      className="w-[20%] rounded-lg bg-[#FAFAFA] px-4 py-3 text-center text-xs font-extralight uppercase text-black shadow-lg"
                      onClick={setActionDefault}
                    >
                      Cancel
                    </button>
                    <button
                      className="w-[20%] rounded-lg bg-[#57A75A] px-4 py-3 text-center text-xs font-extralight uppercase text-white shadow-lg"
                      onClick={() => handleAddEquipment(newEquipment)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default React.memo(BoxWindow);
