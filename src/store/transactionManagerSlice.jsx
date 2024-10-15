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

export const transactionManagerSlice = createSlice({
  name: "transaction_manager",
  initialState: {
    dataTransaction: [],
  },
  reducers: {
    loadTransaction(state, action) {
      console.log(action.payload);
      return {
        ...state,
        dataTransaction: action.payload,
      };
    },

    removeTransactionWithID(state, action) {
      return {
        ...state,
        dataTransaction: state.dataTransaction.filter(
          (item) => item.id !== action.payload,
        ),
      };
    },

    addTransaction(state, action) {
      const newId = generateRandomId(
        state.dataTransaction.map((transaction) => parseInt(transaction.id)),
      );
      if (newId === null) {
        return state;
      }
      const newTransaction = { ...action.payload, id: newId };
      return {
        ...state,
        dataTransaction: [...state.dataTransaction, newTransaction],
      };
    },

    editTransaction(state, action) {
      const { id, ...updatedData } = action.payload;

      const index = state.dataTransaction.findIndex(
        (transaction) => transaction.id === id,
      );
      if (index === -1) {
        console.error(`Transaction with ID ${id} not found.`);
        return state;
      }

      const updatedTransaction = { ...state.dataTransaction[index], ...updatedData };
      const newDataTransaction = [...state.dataTransaction];
      newDataTransaction[index] = updatedTransaction;
      return {
        ...state,
        dataTransaction: newDataTransaction,
      };
    },
  },
});

const { actions, reducer } = transactionManagerSlice;

export const {
  loadTransaction,
  removeTransactionWithID,
  addTransaction,
  editTransaction,
} = actions;

export default reducer;
