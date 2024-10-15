import React, { useEffect, useState } from "react";
import { useAction } from "./ActionContext";
import { Input } from "./Input";
import { useDispatch } from "react-redux";
import {
  addArea,
  removeAreaWithID,
  editArea,
} from "../../../store/areaManagerSlice";

function BoxWindow(props) {
  const { action, setActionDefault, setAction } = useAction();
  const { dataArea } = props;
  const elementModify = dataArea.find((item) => item.id === action.id) || {};
  const [newArea, setNewArea] = useState({
    name: "",
    address: "",
  });
  const [updatedElementModify, setUpdatedElementModify] = useState({});

  useEffect(() => {
    if (action.isEdit && elementModify) {
      setUpdatedElementModify(elementModify);
    }
  }, [action, elementModify]);

  const handleInputChangeCreate = (key, value) => {
    setNewArea((prevState) => ({
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
      const response = await fetch(`http://localhost:8080/area/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        dispatch(removeAreaWithID(id));
        setActionDefault();
        console.log(`Area with ID ${id} has been successfully removed.`);
      } else {
        console.error("Failed to remove area. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error occurred while removing area:", error);
    }
  };

  const handleAddArea = async (areaData) => {
    try {
      const response = await fetch("http://localhost:8080/area/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(areaData),
      });

      if (response.ok) {
        console.log("Area has been successfully added.");
        setNewArea({
          name: "",
          address: "",
        });
        setActionDefault();
      } else {
        console.error("Failed to add area. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error occurred while adding area:", error);
    }
  };

  const handleEditArea = async (newE) => {
    const newEWithId = {
      ...newE,
      id: action.id,
    };

    try {
      const response = await fetch(`http://localhost:8080/area/${newEWithId.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEWithId),
      });

      if (!response.ok) {
        throw new Error("Failed to update area");
      }

      dispatch(editArea(newEWithId));
      setUpdatedElementModify({});
      setActionDefault();
    } catch (error) {
      console.error("Error updating area:", error);
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
                    name="address"
                    onChange={handleInputChangeEdit}
                  />
                  <Input
                    title="Name"
                    placeholder={elementModify.name}
                    type="text"
                    status={`${action.isRead ? "read" : "edit"}`}
                    name="name"
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
                  <Input
                    title="Update Time"
                    placeholder={elementModify.updated_at}
                    type="text"
                    status="read"
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
                        onClick={() => handleEditArea(updatedElementModify)}
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
                      title="Name"
                      placeholder=""
                      type="text"
                      status="add"
                      name="name"
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
                      onClick={() => handleAddArea(newArea)}
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
