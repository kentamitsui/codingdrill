const updateSelectBox = (data) => {
  const selectElement = document.getElementById("savedata");
  if (!selectElement) return;

  // Clear existing options
  selectElement.innerHTML = `
    <option selected disabled class="text-start" value="">Save Data</option>
  `;

  data.forEach((entry) => {
    const option = document.createElement("option");
    option.value = entry.id;
    option.textContent = `${entry.timestamp} - Data ${entry.id}`;
    selectElement.appendChild(option);
  });
};

export default updateSelectBox;
