import { createSlice } from "@reduxjs/toolkit";

const generateRandomId = (existingIds) => {
  const min = 1;
  const max = 10000;
  let newId;
  let attempt = 0;
  do {
    newId = Math.floor(Math.random() * (max - min + 1)) + min;
    attempt++;
    if (attempt > existingIds.length) {
      console.error("full");
      return null;
    }
  } while (existingIds.includes(newId));
  return newId;
};

export const equipmentManagerSlice = createSlice({
  name: "equipment_manager",
  initialState: { 
    dataEquipment: [],
  },
  reducers: {
    loadEquipment(state, action) {
      console.log(action.payload);
      return {
        ...state,
        dataEquipment: action.payload,
      };
    },

    removeEquipmentWithID(state, action) {
      return {
        ...state,
        dataEquipment: state.dataEquipment.filter(
          (item) => item.id !== action.payload,
        ),
      };
    },

    addEquipment(state, action) {
      const newId = generateRandomId(
        state.dataEquipment.map((equipment) => parseInt(equipment.id)),
      );
      if (newId === null) {
        return state;
      }
      const newEquipment = { ...action.payload, id: newId };
      return {
        ...state,
        dataEquipment: [...state.dataEquipment, newEquipment],
      };
    },

    editEquipment(state, action) {
      const { id, ...updatedData } = action.payload;

      const index = state.dataEquipment.findIndex(
        (equipment) => equipment.id === id,
      );
      if (index === -1) {
        console.error(`Equipment with ID ${id} not found.`);
        return state;
      }

      const updatedEquipment = { ...state.dataEquipment[index], ...updatedData };
      const newDataEquipment = [...state.dataEquipment];
      newDataEquipment[index] = updatedEquipment;
      return {
        ...state,
        dataEquipment: newDataEquipment,
      };
    },
  },
});

const { actions, reducer } = equipmentManagerSlice;

export const {
  loadEquipment,
  removeEquipmentWithID,
  addEquipment,
  editEquipment,
} = actions;

export default reducer;
