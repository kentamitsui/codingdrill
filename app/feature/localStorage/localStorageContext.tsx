import { createContext, useContext, useState } from "react";
import updateSelectBox from "./updateSaveData";

const LocalStorageContext = createContext(null);

export const useLocalStorageContext = () => {
  return useContext(LocalStorageContext);
};

export const LocalStorageProvider = ({ children }) => {
  const [savedData, setSavedData] = useState(
    JSON.parse(localStorage.getItem("reviewData") || "[]"),
  );

  const updateLocalStorage = (data) => {
    localStorage.setItem("reviewData", JSON.stringify(data));
    setSavedData(data);
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    setSavedData([]);
    updateSelectBox([]);
  };

  return (
    <LocalStorageContext.Provider
      value={{ savedData, updateLocalStorage, clearLocalStorage }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};
