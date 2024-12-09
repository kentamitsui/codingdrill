import updateSelectBox from "./updateSaveData";

const saveToLocalStorage = (data) => {
  const savedData = JSON.parse(localStorage.getItem("reviewData")) || [];
  const timestamp = new Date().toLocaleString(); // Get the current date and time

  const newEntry = {
    id: savedData.length + 1, // Assign consecutive IDs
    timestamp,
    ...data,
  };

  // Save the updated data to local storage
  savedData.push(newEntry);
  localStorage.setItem("reviewData", JSON.stringify(savedData));

  // Update the select box with the new entry
  updateSelectBox(savedData);
};

export default saveToLocalStorage;
