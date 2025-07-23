let currentEditRow = null;

// Show the modal form
function showForm(editRow = null) {
  document.getElementById('jobFormWrapper').style.display = "flex";
  if (editRow) {
    // Prefill with row data (edit case)
    const cells = editRow.getElementsByTagName('td');
    document.getElementById("jobTitle").value = cells[0].textContent;
    document.getElementById("company").value = cells[1].textContent;
    document.getElementById("jobDate").value = cells[2].textContent;
    document.getElementById("Start").value = cells[3].textContent;
    currentEditRow = editRow;
    document.getElementById('submitBtn').textContent = "Update";
  } else {
    // Empty (add case)
    document.getElementById("jobTitle").value = "";
    document.getElementById("company").value = "";
    document.getElementById("jobDate").value = "";
    document.getElementById("Start").value = "Pending";
    currentEditRow = null;
    document.getElementById('submitBtn').textContent = "Submit";
  }
}
function hideForm() {
  document.getElementById('jobFormWrapper').style.display = "none";
  currentEditRow = null;
}

// Handle add or update form submit
function handleSubmit(event) {
  event.preventDefault();
  let jobTitle = document.getElementById("jobTitle").value.trim();
  let company = document.getElementById("company").value.trim();
  let jobDate = document.getElementById("jobDate").value.trim();
  let status = document.getElementById("Start").value.trim();

  if (!jobTitle || !company || !jobDate || !status) {
    alert("Please fill all the input fields");
    return false;
  }

  if (currentEditRow) {
    // Update existing
    const cells = currentEditRow.getElementsByTagName('td');
    cells[0].textContent = jobTitle;
    cells[1].textContent = company;
    cells[2].textContent = jobDate;
    cells[3].textContent = status;
    currentEditRow = null;
    hideForm();
    return false;
  }

  // Add new row
  let tablebody = document.getElementById("bodytable");
  let new_row = document.createElement("tr");
  new_row.innerHTML = `
    <td>${jobTitle}</td>
    <td>${company}</td>
    <td>${jobDate}</td>
    <td>${status}</td>
    <td>
      <div class="action-btns">
        <button class="table-btn del" onclick="remove(this)">Del</button>
        <button class="table-btn edi" onclick="edit(this)">Edit</button>
      </div>
    </td>
  `;
  tablebody.appendChild(new_row);
  hideForm();
  return false;
}

// Remove row
function remove(btn) {
  const row = btn.closest("tr");
  if(confirm("Delete this job entry?")) row.remove();
}

// Edit row (shows form for update)
function edit(btn) {
  const row = btn.closest("tr");
  showForm(row);
}

// Hide form if background clicked
document.getElementById('jobFormWrapper').addEventListener('click', function(e){
  if(e.target === this) hideForm();
});
