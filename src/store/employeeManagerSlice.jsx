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

export const employeeManagerSlice = createSlice({
  name: "employee_manager",
  initialState: {
    dataEmployee: [],
  },
  reducers: {
    loadEmployee(state, action) {
      console.log(action.payload);
      return {
        ...state,
        dataEmployee: action.payload,
      };
    },

    removeEmployeeWithID(state, action) {
      return {
        ...state,
        dataEmployee: state.dataEmployee.filter(
          (item) => item.id !== action.payload,
        ),
      };
    },

    addEmployee(state, action) {
      const newId = generateRandomId(
        state.dataEmployee.map((employee) => parseInt(employee.id)),
      );
      if (newId === null) {
        return state;
      }
      const newEmployee = { ...action.payload, id: newId };
      return {
        ...state,
        dataEmployee: [...state.dataEmployee, newEmployee],
      };
    },

    editEmployee(state, action) {
      const { id, ...updatedData } = action.payload;

      const index = state.dataEmployee.findIndex(
        (employee) => employee.id === id,
      );
      if (index === -1) {
        console.error(`Employee with ID ${id} not found.`);
        return state;
      }

      const updatedEmployee = { ...state.dataEmployee[index], ...updatedData };
      const newDataEmployee = [...state.dataEmployee];
      newDataEmployee[index] = updatedEmployee;
      return {
        ...state,
        dataEmployee: newDataEmployee,
      };
    },
  },
});

const { actions, reducer } = employeeManagerSlice;

export const { loadEmployee, removeEmployeeWithID, addEmployee, editEmployee } =
  actions;
