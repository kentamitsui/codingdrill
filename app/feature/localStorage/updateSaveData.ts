const updateSelectBox = (data) => {
  const selectElement = document.getElementById("saveData");
  if (!selectElement) return;

  // 選択タグの表示を最初に初期化する
  selectElement.innerHTML = `
    <option className="text-start" value="">Save Data</option>
  `;

  if (data.length === 0) {
    const emptyOption = document.createElement("option");
    emptyOption.value = "";
    emptyOption.innerText = "no saved data";
    emptyOption.disabled = true;
    selectElement.appendChild(emptyOption);
  } else {
    data.forEach((entry) => {
      const option = document.createElement("option");
      option.value = entry.id;
      option.textContent = `Data ${entry.id}: ${entry.timestamp}`;
      selectElement.appendChild(option);
    });
  }
};

export default updateSelectBox;
