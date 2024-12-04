document.addEventListener("DOMContentLoaded", () => {
  fetchDepartments(); // Fetch all departments for the dropdown
  fetchFilieres(); // Fetch and display all filières
});

const filiereList = document.getElementById("filiereList");
const filiereNameInput = document.getElementById("filiereName");
const filiereDepartmentSelect = document.getElementById("filiereDepartment");
const saveFiliereButton = document.getElementById("saveFiliereButton");

const deleteModal = document.getElementById("deleteModal");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

const editModal = document.getElementById("editModal");
const modalFiliereName = document.getElementById("modalFiliereName");
const modalFiliereDepartment = document.getElementById(
  "modalFiliereDepartment"
);
const confirmEditBtn = document.getElementById("confirmEditBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");

let editId = null;

// Fetch departments
const fetchDepartments = async () => {
  const response = await fetch("../php/department/get_departments.php");
  const departments = await response.json();
  filiereDepartmentSelect.innerHTML = departments
    .map((dep) => `<option value="${dep.id}">${dep.name}</option>`)
    .join("");
  modalFiliereDepartment.innerHTML = departments
    .map((dep) => `<option value="${dep.id}">${dep.name}</option>`)
    .join("");
};

// Fetch filières
const fetchFilieres = async () => {
  const response = await fetch("../php/filiere/fetchFiliere.php");
  const filieres = await response.json();
  filiereList.innerHTML = filieres
    .map(
      (filiere) => `
          <li>
            <span>${filiere.name}</span> (${
        filiere.department_name || "Aucun département"
      })
            <div>
              <button class="btn-primary edit" data-id="${
                filiere.id
              }" data-name="${filiere.name}" data-department="${
        filiere.department_id
      }">Modifier</button>
              <button class="btn-danger delete" data-id="${
                filiere.id
              }">Supprimer</button>
            </div>
          </li>
        `
    )
    .join("");

  // Attach event listeners to buttons
  document.querySelectorAll(".delete").forEach((button) => {
    button.addEventListener("click", (e) => {
      openDeleteModal(e.target.dataset.id);
    });
  });

  document.querySelectorAll(".edit").forEach((button) => {
    button.addEventListener("click", (e) => {
      openEditModal(
        e.target.dataset.id,
        e.target.dataset.name,
        e.target.dataset.department
      );
    });
  });
};

// Open delete modal
const openDeleteModal = (id) => {
  deleteModal.style.display = "flex";
  confirmDeleteBtn.dataset.id = id;
};

// Confirm delete
confirmDeleteBtn.addEventListener("click", () => {
  const id = confirmDeleteBtn.dataset.id;
  fetch(`../php/filiere/deleteFiliere.php?id=${id}`, { method: "DELETE" })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        fetchFilieres();
        deleteModal.style.display = "none";
      } else {
        alert(data.error);
      }
    });
});

// Cancel delete
cancelDeleteBtn.addEventListener("click", () => {
  deleteModal.style.display = "none";
});

// Open edit modal
const openEditModal = (id, name, departmentId) => {
  editId = id;
  modalFiliereName.value = name;
  modalFiliereDepartment.value = departmentId || "";
  editModal.style.display = "flex";
};

// Confirm edit
confirmEditBtn.addEventListener("click", () => {
  const name = modalFiliereName.value.trim();
  const departmentId = modalFiliereDepartment.value;

  if (!name || !departmentId) {
    alert("Le nom et le département sont obligatoires !");
    return;
  }

  fetch("../php/filiere/updateFiliere.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: editId, name, department_id: departmentId }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        fetchFilieres();
        editModal.style.display = "none";
      } else {
        alert(data.error);
      }
    });
});

// Cancel edit
cancelEditBtn.addEventListener("click", () => {
  editModal.style.display = "none";
});

// Save new filiere
saveFiliereButton.addEventListener("click", () => {
  const name = filiereNameInput.value.trim();
  const departmentId = filiereDepartmentSelect.value;

  if (!name || !departmentId) {
    alert("Le nom et le département sont obligatoires !");
    return;
  }

  fetch("../php/filiere/createFiliere.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, department_id: departmentId }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        fetchFilieres();
        filiereNameInput.value = "";
        filiereDepartmentSelect.value = "";
      } else {
        alert(data.error);
      }
    });
});
