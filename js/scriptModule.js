document.addEventListener("DOMContentLoaded", () => {
  fetchFilieresForModules(); // Fetch all filières for the dropdown
  fetchModules(); // Fetch and display all modules
});

const moduleForm = document.getElementById("moduleForm");
const moduleNameInput = document.getElementById("moduleName");
const moduleFiliereSelect = document.getElementById("moduleFiliere");
const moduleList = document.getElementById("moduleList");
const saveModuleButton = document.getElementById("saveModuleButton");

const deleteModal = document.getElementById("deleteModal");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

const editModal = document.getElementById("editModal");
const modalModuleName = document.getElementById("modalModuleName");
const modalModuleFiliere = document.getElementById("modalModuleFiliere");
const confirmEditBtn = document.getElementById("confirmEditBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");

let editId = null;

// Fetch filières for dropdown
const fetchFilieresForModules = async () => {
  const response = await fetch("../php/filiere/fetchFiliere.php");
  const filieres = await response.json();

  moduleFiliereSelect.innerHTML = filieres
    .map(
      (filiere) =>
        `<option value="${filiere.id}" data-department="${filiere.department_id}">${filiere.name}</option>`
    )
    .join("");

  modalModuleFiliere.innerHTML = filieres
    .map(
      (filiere) =>
        `<option value="${filiere.id}" data-department="${filiere.department_id}">${filiere.name}</option>`
    )
    .join("");
};

// Fetch modules
const fetchModules = async () => {
  const response = await fetch("../php/module/fetchModules.php");
  const modules = await response.json();

  moduleList.innerHTML = modules
    .map(
      (module) => `
          <li>
            <span>${module.name}</span> (${
        module.filiere_name || "Aucune filière"
      })
            <div>
              <button class="btn-primary edit" data-id="${
                module.id
              }" data-name="${module.name}" data-filiere="${
        module.filiere_id
      }">Modifier</button>
              <button class="btn-danger delete" data-id="${
                module.id
              }">Supprimer</button>
            </div>
          </li>
        `
    )
    .join("");

  // Attach event listeners to buttons
  document.querySelectorAll(".delete").forEach((button) => {
    button.addEventListener("click", (e) =>
      openDeleteModal(e.target.dataset.id)
    );
  });

  document.querySelectorAll(".edit").forEach((button) => {
    button.addEventListener("click", (e) =>
      openEditModal(
        e.target.dataset.id,
        e.target.dataset.name,
        e.target.dataset.filiere
      )
    );
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
  fetch(`../php/module/deleteModules.php?id=${id}`, { method: "DELETE" })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        fetchModules();
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
const openEditModal = (id, name, filiereId) => {
  editId = id;
  modalModuleName.value = name;
  modalModuleFiliere.value = filiereId || "";
  editModal.style.display = "flex";
};

// Confirm edit
confirmEditBtn.addEventListener("click", () => {
  const name = modalModuleName.value.trim();
  const filiereId = modalModuleFiliere.value;
  const departmentId =
    modalModuleFiliere.options[modalModuleFiliere.selectedIndex].dataset
      .department;

  if (!name || !filiereId || !departmentId) {
    alert("Le nom du module, la filière et le département sont obligatoires !");
    return;
  }

  fetch("../php/module/updateModules.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: editId,
      name,
      filiere_id: filiereId,
      department_id: departmentId,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        fetchModules();
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

// Save new module
saveModuleButton.addEventListener("click", () => {
  const name = moduleNameInput.value.trim();
  const filiereId = moduleFiliereSelect.value;
  const departmentId =
    moduleFiliereSelect.options[moduleFiliereSelect.selectedIndex].dataset
      .department;

  if (!name || !filiereId || !departmentId) {
    alert("Le nom du module, la filière et le département sont obligatoires !");
    return;
  }

  fetch("../php/module/saveModules.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      filiere_id: filiereId,
      department_id: departmentId,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        fetchModules();
        moduleNameInput.value = "";
        moduleFiliereSelect.value = "";
      } else {
        alert(data.error);
      }
    });
});
