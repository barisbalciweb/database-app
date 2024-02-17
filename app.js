let database = [];
const $ = (element) => document.getElementById(element);

//if localstorage not empty, list it
if (localStorage.length !== 0) {
  database = JSON.parse(localStorage.getItem("database"));

  for (let i = 0; i < database.length; i++) {
    const tr = document.createElement("tr");
    const tableBody = $("table-body");
    tableBody.appendChild(tr);
    for (const key in database[i]) {
      const td = document.createElement("td");
      tr.appendChild(td);
      td.innerText = database[i][key];
    }
  }
}

//buttons
const createButton = $("create");
const updateButton = $("update");
const deleteButton = $("delete");
const cancelCreate = $("cancel-create");
const cancelDelete = $("cancel-delete");
const cancelUpdate1 = $("cancel-update-1");
const cancelUpdate2 = $("cancel-update-2");
//forms
const createForm = $("create-form");
const deleteForm = $("delete-form");
const updateForm = $("update-form");
const newValuesForm = $("new-values-form");
//inputs
const nameInput = $("name");
const typeInput = $("type");
const quantityInput = $("quantity");
const weightInput = $("weight");
//ids
let idDelete = $("id-delete");
let idUpdate = $("id-update");
//new inputs
const newName = $("new-name");
const newType = $("new-type");
const newQuantity = $("new-quantity");
const newWeight = $("new-weight");
//ths
const thId = $("th-id");
const thName = $("th-name");
const thType = $("th-type");
const thQuantity = $("th-quantity");
const thWeight = $("th-weight");

//CREATE
const createField = $("create-field");

createButton.addEventListener("click", () => {
  createField.style.display = "flex";
});

cancelCreate.addEventListener("click", () => {
  location.reload();
});

createForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createField.style.display = "none";
  database.push({}); // create new obj in database
  const newEntry = database[database.length - 1]; // select created obj
  const autoId = database.length; // create id automaticcaly
  newEntry.id = autoId;
  newEntry.name = nameInput.value;
  newEntry.type = typeInput.value;
  newEntry.quantity = quantityInput.value;
  newEntry.weight = weightInput.value;
  localStorage.setItem("database", JSON.stringify(database)); // save database obj in localstorage
  location.reload();
});

// DELETE
const deleteField = $("delete-field");

deleteButton.addEventListener("click", () => {
  deleteField.style.display = "flex";
});

cancelDelete.addEventListener("click", (event) => {
  event.preventDefault();
  location.reload();
});

deleteForm.addEventListener("submit", (event) => {
  let idEntered = Number(idDelete.value);
  event.preventDefault();

  const filtered = database.filter((curr) => curr.id === idEntered);

  if (filtered.length > 0) {
    database = database.filter((curr) => {
      return curr.id !== idEntered;
    });
    localStorage.setItem("database", JSON.stringify(database)); // save database obj in localstorage
    location.reload();
  } else {
    alert("There is no entry in the list with this ID.");
  }
});

//UPDATE
const updateField = $("update-field");
const inputField = $("input-field");
const newValuesfield = $("new-values-field");

updateButton.addEventListener("click", () => {
  updateField.style.display = "flex";
});

cancelUpdate1.addEventListener("click", (event) => {
  event.preventDefault();
  location.reload();
});

cancelUpdate2.addEventListener("click", (event) => {
  event.preventDefault();
  location.reload();
});

updateForm.addEventListener("submit", (event) => {
  let idEntered = Number(idUpdate.value);
  event.preventDefault();

  const filtered = database.filter((curr) => curr.id === idEntered);
  const index = database.indexOf(filtered[0]);

  if (filtered.length > 0) {
    inputField.style.display = "none";
    newValuesfield.style.display = "flex";

    newName.value = filtered[0].name;
    newType.value = filtered[0].type;
    newQuantity.value = filtered[0].quantity;
    newWeight.value = filtered[0].weight;

    newValuesForm.addEventListener("submit", (event) => {
      event.preventDefault();

      database[index].name = newName.value;
      database[index].type = newType.value;
      database[index].quantity = newQuantity.value;
      database[index].weight = newWeight.value;
      localStorage.setItem("database", JSON.stringify(database)); // save database obj in localstorage
      location.reload();
    });
  } else {
    alert("There is no entry in the list with this ID.");
  }
});

//SORT
thId.addEventListener("click", () => sortNumbers("id"));
thName.addEventListener("click", () => sortStrings("name"));
thType.addEventListener("click", () => sortStrings("type"));
thQuantity.addEventListener("click", () => sortNumbers("quantity"));
thWeight.addEventListener("click", () => sortNumbers("weight"));

function sortStrings(sortBy) {
  database.sort((a, b) => {
    if (a[`${sortBy}`].localeCompare(b[`${sortBy}`]) === -1) {
      return -1;
    } else if (a[`${sortBy}`].localeCompare(b[`${sortBy}`]) === 1) {
      return 1;
    } else {
      return 0;
    }
  });
  localStorage.setItem("database", JSON.stringify(database)); // save database obj in localstorage
  location.reload();
}

function sortNumbers(sortBy) {
  database.sort((a, b) => {
    return a[`${sortBy}`] - b[`${sortBy}`];
  });
  localStorage.setItem("database", JSON.stringify(database)); // save database obj in localstorage
  location.reload();
}
