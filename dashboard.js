const recordForm = document.getElementById('record-form');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const emailInput = document.getElementById('email');
const recordList = document.getElementById('record-list');
const editIndexInput = document.getElementById('edit-index');
let records = JSON.parse(localStorage.getItem('records')) || [];
function isDuplicateName(email) {
  return records.some(
    (record) => record.email.toLowerCase() === email.toLowerCase()
  );
}
function displayRecords() {
  recordList.innerHTML = '';

  if (records.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="5" style="text-align:center;color:red">No Record Found</td>`;
    recordList.appendChild(row);
  } else {
    records.forEach((record, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${record.name}</td>
        <td>${record.age}</td>
        <td>${record.email}</td>
        <td><button class="edit-button" data-index="${index}">Edit</button></td>
        <td class="deleteButton"><button class="delete-button" data-index="${index}">Delete</button></td>
      `;
      recordList.appendChild(row);
    });
  }
  document.querySelectorAll('.edit-button').forEach(button => {
    button.addEventListener('click', function () {
      const index = this.getAttribute('data-index');
      editRecord(index);
    });
  });
  document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', function () {
      const index = this.getAttribute('data-index');
      deleteRecord(index);
    });
  });
}
recordForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = nameInput.value;
  const age = ageInput.value;
  const email = emailInput.value;
  const editIndex = parseInt(editIndexInput.value);
  if (name && age && email) {
    if (isDuplicateName(email) && editIndex === -1) {
      alert('Student already exists.');
      return;
    }
    if (editIndex === -1) {
      // Add a new record
      records.push({ name, age, email });
    } else {
      // Update an existing record
      records[editIndex] = { name, age, email };
      editIndexInput.value = -1;
    }
    localStorage.setItem('records', JSON.stringify(records));
    nameInput.value = '';
    ageInput.value = '';
    emailInput.value = '';
    displayRecords();
  }
});
function editRecord(index) {
  const recordToEdit = records[index];
  nameInput.value = recordToEdit.name;
  ageInput.value = recordToEdit.age;
  emailInput.value = recordToEdit.email;
  editIndexInput.value = index;
}
function deleteRecord(index) {
  let delBtn = document.querySelectorAll('.deleteButton')[index];
  delBtn.innerHTML = `
    <i id="yesBtn-${index}" class="fa-solid fa-check"></i>
    <i id="noBtn-${index}" class="fa-solid fa-xmark"></i>
  `;
  document.getElementById(`yesBtn-${index}`).addEventListener('click', function () {
    confirmDelete(index);
  });
  document.getElementById(`noBtn-${index}`).addEventListener('click', function () {
    resetDelete(index);
  });
}
function confirmDelete(index) {
  records.splice(index, 1);
  localStorage.setItem('records', JSON.stringify(records));
  displayRecords();
}
function resetDelete(index) {
  displayRecords();
}
displayRecords();
