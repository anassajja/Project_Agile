document.addEventListener('DOMContentLoaded', function () { // DOMContentLoaded event ensures the script runs after the HTML has been loaded
    const enseignantList = document.getElementById('enseignantList'); // Get the enseignant list element
    const saveButton = document.getElementById('saveButton');   // Get the save button element
    const enseignantLast_name = document.getElementById('enseignantLast_name');   // Get the enseignant name element
    const enseignantFirst_name = document.getElementById('enseignantFirst_name');   // Get the enseignant name element
    const enseignantEmail = document.getElementById('enseignantEmail');     // Get the enseignant email element
    const enseignantDepartment = document.getElementById('enseignantDepartment');     // Get the enseignant department element
    const deleteModal = document.getElementById('deleteModal');     // Get the delete modal element
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');       // Get the confirm delete button element
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');     // Get the cancel delete button element
    const editModal = document.getElementById('editModal');         // Get the edit modal element
    const modalEnseignantFirstName = document.getElementById('modalEnseignantFirstName'); // Get the edit modal element
    const modalEnseignantLastName = document.getElementById('modalEnseignantLastName'); // Get the edit modal element
    const modalEnseignantEmail = document.getElementById('modalEnseignantEmail'); // Get the edit modal element
    const modalEnseignantDepartment = document.getElementById('modalEnseignantDepartment'); // Get the edit modal element
    const confirmEditBtn = document.getElementById('confirmEditBtn'); // Get the confirm edit button element
    const cancelEditBtn = document.getElementById('cancelEditBtn'); // Get the cancel edit button element
    const assignButton = document.getElementById('asignButton'); // Get the asign button element
    const unassignButton = document.getElementById('unassignButton'); // Get the unassign button element
    const assignEnseignantId = document.getElementById('assignEnseignantId'); // Get the assign enseignant id element
    const assignElementId = document.getElementById('assignElementId'); // Get the assign element id element
    const unassignEnseignantId = document.getElementById('unassignEnseignantId'); // Get the unassign enseignant id element
    let editId = null;

    // Fetch and display enseignants
    function fetchTeachers() { // Function to fetch and display teachers
        fetch('../php/teacher/get_teachers.php') // Fetch teachers from the server
            .then(response => response.json()) // Parse the JSON response into a JavaScript object
            .then(data => { // Display the teachers
                enseignantList.innerHTML = ''; // Clear the teacher list
                data.forEach(enseignant => { // Loop through the enseignants
                    const li = document.createElement('li'); // Create a new list item
                    li.innerHTML = ` 
                        <span>${enseignant.first_name}</span>&nbsp;<span>${enseignant.last_name}</span> - <span>${enseignant.email}</span> 
                        <div>
                            <button class="edit" data-id="${enseignant.id}" data-first_name="${enseignant.first_name}" data-last_name="${enseignant.last_name}" data-email="${enseignant.email}" data-department_id="${enseignant.department_id}">Modifier</button>
                            <button class="delete" data-id="${enseignant.id}">Supprimer</button>
                        </div>
                    `;
                    enseignantList.appendChild(li); // Append the list item to the enseignant list
                });

                // Attach event listeners to the edit and delete buttons for each enseignant
                document.querySelectorAll('.edit').forEach(button => { // Loop through the edit buttons and add an event listener to each one 
                    button.addEventListener('click', (e) => { // Add a click event listener to each edit button
                        console.log(e.target.dataset.id);
                        openEditModal(e.target.dataset.id, e.target.dataset.first_name, e.target.dataset.last_name, e.target.dataset.email, e.target.dataset.department_id); // Open the edit modal when the edit button is clicked
                    });
                });     

                document.querySelectorAll('.delete').forEach(button => { // Loop through the delete buttons and add an event listener to each one 
                    button.addEventListener('click', (e) => { // Add a click event listener to each delete button
                        openDeleteModal(e.target.dataset.id); // Open the delete modal when the delete button is clicked
                    });
                });
            })
            .catch(error => console.error('Error:', error)); // Log any errors to the console
    }

    // Save enseignant (add new or update existing)
    saveButton.addEventListener('click', () => { // Add a click event listener to the save button
        const first_name = enseignantFirst_name.value.trim(); // Get the enseignant name value and trim any leading or trailing whitespace
        const last_name = enseignantLast_name.value.trim(); // Get the enseignant name value and trim any leading or trailing whitespace
        const email = enseignantEmail.value.trim(); // Get the enseignant description value and trim any leading or trailing whitespace
        const department_id = enseignantDepartment.value; // Get the enseignant description value and trim any leading or trailing whitespace
        console.log(department_id);
        if (!first_name || !last_name) return alert('Le nom du enseignant est obligatoire.'); // If the name is empty, display an alert and return

        const url = editId ? '../php/teacher/edit_teacher.php' : '../php/teacher/add_teacher.php'; // Set the URL based on whether we are adding or editing a enseignant 
        console.log(url);
        console.log(editId);
        const data = { id: editId, first_name, last_name, email, department_id }; // Create a new object with the enseignant data to send to the server
        console.log(data);

        fetch(url, { // Fetch the URL with the data object
            method: 'POST', // Use the POST method
            headers: { 'Content-Type': 'application/json' }, // Set the content type to JSON
            body: JSON.stringify(data), // Convert the data object to a JSON string
        })
            .then(response => response.json()) // Parse the JSON response into a JavaScript object
            .then(data => { // Display the response data
                if (data.success) { // If the response was successful
                    fetchTeachers(); // Refresh enseignant list
                    enseignantFirst_name.value = ''; // Clear the enseignant name field
                    enseignantLast_name.value = ''; // Clear the enseignant name field
                    enseignantEmail.value = ''; // Clear the enseignant email field
                    enseignantDepartment.value = ''; // Clear the enseignant department field
                    editId = null; // Reset edit ID to null
                    console.log(data);
                    console.log(data.success);
                    console.log('success');
                } else { // If the response was not successful
                    console.log('error');
                    alert(data.error);   // Display an alert with the error message
                }
            })
            .catch(error => console.error('Error:', error)); // Log any errors to the console   
    });

    // Assign enseignant to element
    assignButton.addEventListener('click', () => { // Add a click event listener to the assign button
        const teacher_id = assignEnseignantId.value; // Get the enseignant ID value
        const element_id = assignElementId.value; // Get the element ID value
        if (!teacher_id || !element_id) return alert('Le enseignant et l\'élément sont obligatoires.'); // If the enseignant or element is empty, display an alert and return 

        const data = { teacher_id, element_id }; // Create a new object with the enseignant and element data to send to the server

        fetch('../php/teacher/assign_teacher.php', { // Fetch the assign enseignant script
            method: 'POST', // Use the POST method
            headers: { 'Content-Type': 'application/json' }, // Set the content type to JSON 
            body: JSON.stringify(data), // Convert the data object to a JSON string
        })
            .then(response => response.json()) // Parse the JSON response into a JavaScript object
            .then(data => { // Display the response data
                if (data.success) { // If the response was successful
                    alert(data.message); // Display an alert with the success message
                    alert('Enseignant assigné avec succès'); // Display an alert with the success message
                    fetchTeachers(); // Refresh enseignant list
                } else { // If the response was not successful
                    alert(data.error); // Display an alert with the error message
                }
            })
            .catch(error => console.error('Error:', error)); // Log any errors to the console
    });

    // Unassign enseignant from element
    unassignButton.addEventListener('click', () => { // Add a click event listener to the unassign button
        const teacher_id = unassignEnseignantId.value; // Get the enseignant ID value
        if (!teacher_id) return alert('Le enseignant est obligatoire.'); // If the enseignant is empty, display an alert and return
         
        const data = { teacher_id }; // Create a new object with the enseignant data to send to the server

        fetch('../php/teacher/unassign_teacher.php', { // Fetch the unassign enseignant script
            method: 'POST', // Use the POST method
            headers: { 'Content-Type': 'application/json' }, // Set the content type to JSON 
            body: JSON.stringify(data), // Convert the data object to a JSON string
        })
            .then(response => response.json()) // Parse the JSON response into a JavaScript object
            .then(data => { // Display the response data
                if (data.success) { // If the response was successful
                    alert(data.message); // Display an alert with the success message
                    alert('Enseignant désassigné avec succès'); // Display an alert with the success message
                    fetchTeachers(); // Refresh enseignant list
                } else { // If the response was not successful
                    alert(data.error); // Display an alert with the error message
                }
            })
            .catch(error => console.error('Error:', error)); // Log any errors to the console
    });


    // Open delete modal
    function openDeleteModal(id) { // Function to open the delete modal
        deleteModal.style.display = 'flex'; // Show the delete modal 
        confirmDeleteBtn.dataset.id = id; // Set the ID of the enseignant to delete
    }

    // Confirm delete
    confirmDeleteBtn.addEventListener('click', () => { // Add a click event listener to the confirm delete button
        const id = confirmDeleteBtn.dataset.id;     // Get the ID of the enseignant to delete
        fetch('../php/teacher/delete_teacher.php', { // Fetch the delete department script
            method: 'POST', // Use the POST method
            headers: { 'Content-Type': 'application/json' }, // Set the content type to JSON
            body: JSON.stringify({ id }),   // Convert the data object to a JSON string
        })
            .then(response => response.json()) // Parse the JSON response into a JavaScript object
            .then(data => { // Display the response data
                if (data.success) { // If the response was successful
                    fetchTeachers(); // Refresh enseignant list
                    deleteModal.style.display = 'none'; // Hide the delete modal
                } else { // If the response was not successful
                    alert(data.error); // Display an alert with the error message
                } // Display an alert with the error message
            })
            .catch(error => console.error('Error:', error)); // Log any errors to the console
    });

    // Cancel delete
    cancelDeleteBtn.addEventListener('click', () => { // Add a click event listener to the cancel delete button
        deleteModal.style.display = 'none'; // Hide the delete modal
    });

    // Open edit modal
    function openEditModal(id, first_name, last_name, email, department_id) { // Function to open the edit modal
        editId = id;
        modalEnseignantFirstName.value = first_name; // Populate fields in the modal
        modalEnseignantLastName.value = last_name; // Populate fields in the modal
        modalEnseignantEmail.value = email; // Populate fields in the modal
        modalEnseignantDepartment.value = department_id; // Populate fields in the modal

        editModal.style.display = 'flex'; // Show modal 
        console.log('openEditModal');
    }

    // Confirm edit
    confirmEditBtn.addEventListener('click', () => { // Add a click event listener to the confirm edit button
        const first_name = modalEnseignantFirstName.value.trim(); // Get the enseignant name value and trim any leading or trailing whitespace
        const last_name = modalEnseignantLastName.value.trim(); // Get the enseignant name value and trim any leading or trailing whitespace
        const email = modalEnseignantEmail.value.trim(); // Get the enseignant description value and trim any leading or trailing whitespace
        const department_id = modalEnseignantDepartment.value; // Get the enseignant description value and trim any leading or trailing whitespace
        if (!first_name || !last_name) return alert('Le nom du enseignant est obligatoire.'); // If the name is empty, display an alert and return

        const data = { id: editId, first_name, last_name, email, department_id }; // Create a new object with the enseignant data to send to the server
        fetch('../php/teacher/edit_teacher.php', { // Fetch the edit enseignant script
            method: 'POST', // Use the POST method
            headers: { 'Content-Type': 'application/json' },    // Set the content type to JSON
            body: JSON.stringify(data),     // Convert the data object to a JSON string
        })
            .then(response => response.json()) // Parse the JSON response into a JavaScript object
            .then(data => { // Display the response data
                if (data.success) { // If the response was successful
                    fetchTeachers(); // Refresh department list
                    editModal.style.display = 'none'; // Hide modal
                    editId = null; // Reset edit ID
                } else {
                    alert(data.error); // Display an alert with the error message
                }
            })
            .catch(error => console.error('Error:', error)); // Log any errors to the console
    });

    // Cancel edit
    cancelEditBtn.addEventListener('click', () => { // Add a click event listener to the cancel edit button
        editModal.style.display = 'none'; // Hide modal without saving
    });

    // Initial fetch
    fetchTeachers(); // Fetch and display teachers when the page loads
});
