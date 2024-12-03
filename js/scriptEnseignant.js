document.addEventListener('DOMContentLoaded', function () { // DOM ready event listener to ensure all content is loaded
    const enseignantList = document.getElementById('enseignantList');
    const saveButton = document.getElementById('saveButton');
    const enseignantLast_name = document.getElementById('enseignantLast_name');
    const enseignantFirst_name = document.getElementById('enseignantFirst_name');
    const enseignantEmail = document.getElementById('enseignantEmail');
    const enseignantDepartment = document.getElementById('enseignantDepartment');
    const deleteModal = document.getElementById('deleteModal');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    const editModal = document.getElementById('editModal');
    const modalEnseignantFirstName = document.getElementById('modalEnseignantFirstName');
    const modalEnseignantLastName = document.getElementById('modalEnseignantLastName');
    const modalEnseignantEmail = document.getElementById('modalEnseignantEmail');
    const modalEnseignantDepartment = document.getElementById('modalEnseignantDepartment');
    const confirmEditBtn = document.getElementById('confirmEditBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const assignButton = document.getElementById('assignButton');
    const unassignButton = document.getElementById('unassignButton');
    const assignEnseignantId = document.getElementById('assignEnseignantId');
    const assignElementId = document.getElementById('assignElementId');
    const unassignEnseignantId = document.getElementById('unassignEnseignantId');
    let editId = null;

    // Function to fetch data from the server using fetch API
    async function fetchData(url, method, data) {
        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const text = await response.text();
            console.log('Raw response:', text); // Log the raw response text
            try {
                return JSON.parse(text);
            } catch (error) {
                console.error('Error parsing JSON:', text);
                throw error;
            }
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    
    // Function to handle errors
    function handleError(error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }

    // Function to toggle modal visibility
    function toggleModal(modal, show) {
        modal.style.display = show ? 'flex' : 'none';
    }

    // Function to fetch teachers from the server and display them in the list
    function fetchTeachers() {
        fetchData('../php/teacher/get_teachers.php', 'GET')
            .then(data => {
                enseignantList.innerHTML = '';
                data.forEach(enseignant => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <span>${enseignant.first_name}</span>&nbsp;<span>${enseignant.last_name}</span> - <span>${enseignant.email}</span>
                        <div>
                            <button class="edit" data-id="${enseignant.id}" data-first_name="${enseignant.first_name}" data-last_name="${enseignant.last_name}" data-email="${enseignant.email}" data-department_id="${enseignant.department_id}">Modifier</button>
                            <button class="delete" data-id="${enseignant.id}">Supprimer</button>
                        </div>
                    `;
                    enseignantList.appendChild(li);
                });
                addEventListeners();
            })
            .catch(handleError);
    }

    // Function to add event listeners to edit and delete buttons
    function addEventListeners() {
        document.querySelectorAll('.edit').forEach(button => {
            button.addEventListener('click', (e) => {
                openEditModal(e.target.dataset.id, e.target.dataset.first_name, e.target.dataset.last_name, e.target.dataset.email, e.target.dataset.department_id);
            });
        });

        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', (e) => {
                openDeleteModal(e.target.dataset.id);
            });
        });
    }

    // Event listener for the save button to add or edit a teacher
    saveButton.addEventListener('click', () => {
        const first_name = enseignantFirst_name.value.trim();
        const last_name = enseignantLast_name.value.trim();
        const email = enseignantEmail.value.trim();
        const department_id = enseignantDepartment.value;

        if (!first_name || !last_name) return alert('Le nom du enseignant est obligatoire.');

        const url = editId ? '../php/teacher/edit_teacher.php' : '../php/teacher/add_teacher.php';
        const data = { id: editId, first_name, last_name, email, department_id };

        fetchData(url, 'POST', data)
            .then(data => {
                if (data.success) {
                    fetchTeachers();
                    enseignantFirst_name.value = '';
                    enseignantLast_name.value = '';
                    enseignantEmail.value = '';
                    enseignantDepartment.value = '';
                    editId = null;
                } else {
                    alert(data.error);
                }
            })
            .catch(handleError);
    });
 
    // Event listener for the assign button to assign a teacher to an element
    if (assignButton) {
        assignButton.addEventListener('click', () => {
            if (!assignEnseignantId || !assignElementId) {
                console.error('assignEnseignantId or assignElementId is null');
                return alert('Assign elements are missing.');
            }

            const teacher_id = assignEnseignantId.value;
            const element_id = assignElementId.value;
            console.log('teacher_id', teacher_id);
            console.log('element_id', element_id);
            if (!teacher_id || !element_id) return alert('Le enseignant et l\'élément sont obligatoires.');

            const data = { teacher_id, element_id };

            fetchData('../php/teacher/assign_teacher.php', 'POST', data)
                .then(data => {
                    if (data.success) {
                        alert('Enseignant assigné avec succès');
                        fetchTeachers();
                    } else {
                        console.error('Server error:', data.error);
                        alert(data.error);
                    }
                })
                .catch(handleError);
        });
    }
 
    // Event listener for the unassign button to unassign a teacher from an element
    if (unassignButton) {
        unassignButton.addEventListener('click', () => {
            if (!unassignEnseignantId) {
                console.error('unassignEnseignantId is null');
                return alert('Unassign element is missing.');
            }

            const teacher_id = unassignEnseignantId.value;
            if (!teacher_id) return alert('Le enseignant est obligatoire.');

            const data = { teacher_id };

            fetchData('../php/teacher/unassign_teacher.php', 'POST', data)
                .then(data => {
                    if (data.success) {
                        alert('Enseignant désassigné avec succès');
                        fetchTeachers();
                    } else {
                        alert(data.error);
                    }
                })
                .catch(handleError);
        });
    }

    // Event listener for the delete button to open the delete modal
    function openDeleteModal(id) {
        toggleModal(deleteModal, true);
        confirmDeleteBtn.dataset.id = id;
    }

    // Event listeners for the delete modal buttons
    confirmDeleteBtn.addEventListener('click', () => {
        const id = confirmDeleteBtn.dataset.id;
        fetchData('../php/teacher/delete_teacher.php', 'POST', { id })
            .then(data => {
                if (data.success) {
                    fetchTeachers();
                    toggleModal(deleteModal, false);
                } else {
                    alert(data.error);
                }
            })
            .catch(handleError);
    });

    // Event listener for the cancel button to close the delete modal
    cancelDeleteBtn.addEventListener('click', () => {
        toggleModal(deleteModal, false);
    });

    // Event listener for the edit button to open the edit modal
    function openEditModal(id, first_name, last_name, email, department_id) {
        editId = id;
        modalEnseignantFirstName.value = first_name;
        modalEnseignantLastName.value = last_name;
        modalEnseignantEmail.value = email;
        modalEnseignantDepartment.value = department_id;
        toggleModal(editModal, true);
    }

    // Event listeners for the edit modal buttons to confirm or cancel the edit
    confirmEditBtn.addEventListener('click', () => {
        const first_name = modalEnseignantFirstName.value.trim();
        const last_name = modalEnseignantLastName.value.trim();
        const email = modalEnseignantEmail.value.trim();
        const department_id = modalEnseignantDepartment.value;
        if (!first_name || !last_name) return alert('Le nom du enseignant est obligatoire.');

        const data = { id: editId, first_name, last_name, email, department_id };
        fetchData('../php/teacher/edit_teacher.php', 'POST', data)
            .then(data => {
                if (data.success) {
                    fetchTeachers();
                    toggleModal(editModal, false);
                    editId = null;
                } else {
                    alert(data.error);
                }
            })
            .catch(handleError);
    });

    // Event listener for the cancel button to close the edit modal
    cancelEditBtn.addEventListener('click', () => {
        toggleModal(editModal, false);
    });

    // Fetch teachers when the page loads
    fetchTeachers();
});