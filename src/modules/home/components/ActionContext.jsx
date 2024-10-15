import { createContext, useContext, useState } from "react";

const ActionContext = createContext();

export const ActionProvider = ({ children }) => {
  const [action, setAction] = useState({
    id: 0,
    isAdd: false,
    isRead: false,
    isEdit: false,
    isRemove: false,
  });

  const setActionDefault = () => {
    setAction({
      id: 0,
      isAdd: false,
      isRead: false,
      isEdit: false,
      isRemove: false,
    });
  };

  return (
    <ActionContext.Provider value={{ action, setAction, setActionDefault }}>
      {children}
    </ActionContext.Provider>
  );
};

export const useAction = () => {
  return useContext(ActionContext);
};
