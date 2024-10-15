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

export const areaManagerSlice = createSlice({
  name: "area_manager",
  initialState: {
    dataArea: [],
  },
  reducers: {
    loadArea(state, action) {
      console.log(action.payload);
      return {
        ...state,
        dataArea: action.payload,
      };
    },

    removeAreaWithID(state, action) {
      return {
        ...state,
        dataArea: state.dataArea.filter(
          (item) => item.id !== action.payload,
        ),
      };
    },

    addArea(state, action) {
      const newId = generateRandomId(
        state.dataArea.map((area) => parseInt(area.id)),
      );
      if (newId === null) {
        return state;
      }
      const newArea = { ...action.payload, id: newId };
      return {
        ...state,
        dataArea: [...state.dataArea, newArea],
      };
    },

    editArea(state, action) {
      const { id, ...updatedData } = action.payload;

      const index = state.dataArea.findIndex(
        (area) => area.id === id,
      );
      if (index === -1) {
        console.error(`Area with ID ${id} not found.`);
        return state;
      }

      const updatedArea = { ...state.dataArea[index], ...updatedData };
      const newDataArea = [...state.dataArea];
      newDataArea[index] = updatedArea;
      return {
        ...state,
        dataArea: newDataArea,
      };
    },
  },
});

const { actions, reducer } = areaManagerSlice;

export const {
  loadArea,
  removeAreaWithID,
  addArea,
  editArea,
} = actions;

export default reducer;
