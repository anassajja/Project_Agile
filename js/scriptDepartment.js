document.addEventListener('DOMContentLoaded', function () { // DOMContentLoaded event ensures the script runs after the HTML has been loaded
    const departmentList = document.getElementById('departmentList'); // Get the department list element
    const saveButton = document.getElementById('saveButton');   // Get the save button element
    const departmentName = document.getElementById('departmentName');   // Get the department name element
    const departmentDescription = document.getElementById('departmentDescription');     // Get the department description element
    const deleteModal = document.getElementById('deleteModal');     // Get the delete modal element
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');       // Get the confirm delete button element
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');     // Get the cancel delete button element
    const editModal = document.getElementById('editModal');         // Get the edit modal element
    const modalDepartmentName = document.getElementById('modalDepartmentName');
    const modalDepartmentDescription = document.getElementById('modalDepartmentDescription');
    const confirmEditBtn = document.getElementById('confirmEditBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    let editId = null;

    // Fetch and display departments
    function fetchDepartments() { // Function to fetch and display departments
        fetch('../php/department/get_departments.php') // Fetch departments from the server
            .then(response => response.json())
            .then(data => {
                departmentList.innerHTML = '';
                data.forEach(department => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <span>${department.name}</span> - <span>${department.description || 'No description'}</span>
                        <div>
                            <button class="edit" data-id="${department.id}" data-name="${department.name}" data-description="${department.description || ''}">Modifier</button>
                            <button class="delete" data-id="${department.id}">Supprimer</button>
                        </div>
                    `;
                    departmentList.appendChild(li);
                });

                // Attach event listeners
                document.querySelectorAll('.edit').forEach(button => {
                    button.addEventListener('click', (e) => {
                        openEditModal(e.target.dataset.id, e.target.dataset.name, e.target.dataset.description);
                    });
                });

                document.querySelectorAll('.delete').forEach(button => {
                    button.addEventListener('click', (e) => {
                        openDeleteModal(e.target.dataset.id);
                    });
                });
            })
            .catch(error => console.error('Error:', error));
    }

    // Save department (add new or update existing)
    saveButton.addEventListener('click', () => {
        const name = departmentName.value.trim();
        const description = departmentDescription.value.trim();
        if (!name) return alert('Le nom du département est obligatoire.');

        const url = editId ? '../php/department/edit_department.php' : 'php/department/add_department.php';
        const data = { id: editId, name, description };

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    fetchDepartments();
                    departmentName.value = '';
                    departmentDescription.value = '';
                    editId = null;
                } else {
                    alert(data.error);
                }
            })
            .catch(error => console.error('Error:', error));
    });

    // Open delete modal
    function openDeleteModal(id) {
        deleteModal.style.display = 'flex';
        confirmDeleteBtn.dataset.id = id;
    }

    // Confirm delete
    confirmDeleteBtn.addEventListener('click', () => {
        const id = confirmDeleteBtn.dataset.id;
        fetch('../php/department/delete_department.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    fetchDepartments();
                    deleteModal.style.display = 'none';
                } else {
                    alert(data.error);
                }
            })
            .catch(error => console.error('Error:', error));
    });

    // Cancel delete
    cancelDeleteBtn.addEventListener('click', () => {
        deleteModal.style.display = 'none';
    });

    // Open edit modal
    function openEditModal(id, name, description) {
        editId = id;
        modalDepartmentName.value = name; // Populate fields in the modal
        modalDepartmentDescription.value = description;

        editModal.style.display = 'flex'; // Show modal
    }

    // Confirm edit
    confirmEditBtn.addEventListener('click', () => {
        const name = modalDepartmentName.value.trim();
        const description = modalDepartmentDescription.value.trim();
        if (!name) return alert('Le nom du département est obligatoire.');

        const data = { id: editId, name, description };
        fetch('../php/department/edit_department.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    fetchDepartments(); // Refresh department list
                    editModal.style.display = 'none'; // Hide modal
                    editId = null; // Reset edit ID
                } else {
                    alert(data.error);
                }
            })
            .catch(error => console.error('Error:', error));
    });

    // Cancel edit
    cancelEditBtn.addEventListener('click', () => {
        editModal.style.display = 'none'; // Hide modal without saving
    });

    // Initial fetch
    fetchDepartments();
});
