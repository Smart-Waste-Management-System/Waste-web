import { configureStore } from "@reduxjs/toolkit";
import { employeeManagerSlice } from "./employeeManagerSlice";
import { equipmentManagerSlice } from "./equipmentManagerSlice";
import { transactionManagerSlice } from "./transactionManagerSlice";
import { areaManagerSlice } from "./areaManagerSlice";




const store = configureStore({
  reducer: {
    employee_manager: employeeManagerSlice.reducer,
    equipment_manager: equipmentManagerSlice.reducer,
    transaction_manager: transactionManagerSlice.reducer,
    area_manager: areaManagerSlice.reducer
  },
});

export default store;
