document.addEventListener("DOMContentLoaded", () => {
  fetchModulesForElements();
  fetchElements();
});

const elementForm = document.getElementById("elementForm");
const elementNameInput = document.getElementById("elementName");
const elementModuleSelect = document.getElementById("elementModule");
const elementList = document.getElementById("elementList");
const saveElementButton = document.getElementById("saveElementButton");

const deleteModal = document.getElementById("deleteModal");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

const editModal = document.getElementById("editModal");
const modalElementName = document.getElementById("modalElementName");
const modalElementModule = document.getElementById("modalElementModule");
const confirmEditBtn = document.getElementById("confirmEditBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");

let editId = null;

// Fetch modules for dropdown
const fetchModulesForElements = async () => {
  const response = await fetch("../php/module/fetchModules.php");
  const modules = await response.json();

  elementModuleSelect.innerHTML = modules
    .map((module) => `<option value="${module.id}">${module.name}</option>`)
    .join("");

  modalElementModule.innerHTML = modules
    .map((module) => `<option value="${module.id}">${module.name}</option>`)
    .join("");
};

// Fetch elements
const fetchElements = async () => {
  const response = await fetch("../php/element/fetchElements.php");
  const elements = await response.json();

  elementList.innerHTML = elements
    .map(
      (element) => `
          <li>
            <span>${element.name}</span> (${
        element.module_name || "Aucun module"
      })
            <div>
              <button class="btn-primary edit" data-id="${
                element.id
              }" data-name="${element.name}" data-module="${
        element.module_id
      }">Modifier</button>
              <button class="btn-danger delete" data-id="${
                element.id
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
        e.target.dataset.module
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
  fetch(`../php/element/deleteElement.php?id=${id}`, { method: "DELETE" })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        fetchElements();
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
const openEditModal = (id, name, moduleId) => {
  editId = id;
  modalElementName.value = name;
  modalElementModule.value = moduleId || "";
  editModal.style.display = "flex";
};

// Confirm edit
confirmEditBtn.addEventListener("click", () => {
  const name = modalElementName.value.trim();
  const moduleId = modalElementModule.value;

  if (!name || !moduleId) {
    alert("Le nom de l'élément et le module sont obligatoires !");
    return;
  }

  fetch("../php/element/updateElement.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: editId, name, module_id: moduleId }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        fetchElements();
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

// Save new element
saveElementButton.addEventListener("click", () => {
  const name = elementNameInput.value.trim();
  const moduleId = elementModuleSelect.value;

  if (!name || !moduleId) {
    alert("Le nom de l'élément et le module sont obligatoires !");
    return;
  }

  fetch("../php/element/saveElements.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, module_id: moduleId }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        fetchElements();
        elementNameInput.value = "";
        elementModuleSelect.value = "";
      } else {
        alert(data.error);
      }
    });
});
