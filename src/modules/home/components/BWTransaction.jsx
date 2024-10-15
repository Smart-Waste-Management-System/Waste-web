import React, { useEffect, useState } from "react";
import { useAction } from "./ActionContext";
import { Input } from "./Input";
import { useDispatch } from "react-redux";
import {
  addTransaction,
  removeTransactionWithID,
  editTransaction,
} from "../../../store/transactionManagerSlice";

function BoxWindow(props) {
  const { action, setActionDefault, setAction } = useAction();
  const { dataTransaction } = props;
  const elementModify = dataTransaction.find((item) => item.id === action.id) || {};
  const [newTransaction, setNewTransaction] = useState({
    user_id: "4e8d62d4-947a-4665-84e1-e20a4ad555bb",
    trash_bin_id: "33c8ef5f-12db-4fbc-bd61-7ad0fdd5dfbb",
  });
  const [updatedElementModify, setUpdatedElementModify] = useState({});

  useEffect(() => {
    if (action.isEdit && elementModify) {
      setUpdatedElementModify(elementModify);
    }
  }, [action, elementModify]);

  const handleInputChangeCreate = (key, value) => {
    setNewTransaction((prevState) => ({
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
      const response = await fetch(`http://localhost:8080/transaction/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        dispatch(removeTransactionWithID(id));
        setActionDefault();
        console.log(`Transaction with ID ${id} has been successfully removed.`);
      } else {
        console.error("Failed to remove transaction. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error occurred while removing transaction:", error);
    }
  };

  const handleAddTransaction = async (transactionData) => {
    try {
      const response = await fetch("http://localhost:8080/transaction/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });

      if (response.ok) {
        console.log("Transaction has been successfully added.");
        setNewTransaction({
            user_id: "4e8d62d4-947a-4665-84e1-e20a4ad555bb",
            trash_bin_id: "2a1c8033-a9ce-4564-963a-73e958111c8d",
        });
        setActionDefault();
      } else {
        console.error("Failed to add transaction. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error occurred while adding transaction:", error);
    }
  };

  const handleEditTransaction = async (newE) => {
    console.error(newE);
    const newEWithId = {
      ...newE,
      id: action.id,
    };

    try {
      const response = await fetch(`http://localhost:8080/transaction/${newEWithId.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEWithId),
      });

      if (!response.ok) {
        throw new Error("Failed to update transaction");
      }

      dispatch(editTransaction(newEWithId));
      setUpdatedElementModify({});
      setActionDefault();
    } catch (error) {
      console.error("Error updating transaction:", error);
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
                    title="Level"
                    placeholder={elementModify.level}
                    type="number"
                    status={`${action.isRead ? "read" : "edit"}`}
                    name="level"
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
                        onClick={() => handleEditTransaction(updatedElementModify)}
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
                      title="Level"
                      placeholder=""
                      type="text"
                      status="add"
                      name="level"
                      onChange={handleInputChangeCreate}
                    />
                    <Input
                      title="Weight"
                      placeholder=""
                      type="text"
                      status="add"
                      name="weight"
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
                      onClick={() => handleAddTransaction(newTransaction)}
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
