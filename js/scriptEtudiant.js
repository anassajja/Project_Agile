document.addEventListener('DOMContentLoaded', function () { // DOMContentLoaded event ensures the script runs after the HTML has been loaded
    const etudiantList = document.getElementById('etudiantList'); // Get the etudiant list element
    const saveButton = document.getElementById('saveButton');   // Get the save button element
    const etudiantLast_name = document.getElementById('etudiantLast_name');   // Get the etudiant name element
    const etudiantFirst_name = document.getElementById('etudiantFirst_name');   // Get the etudiant name element
    const etudiantEmail = document.getElementById('etudiantEmail');     // Get the etudiant email element
    const etudiantDepartment = document.getElementById('etudiantDepartment');     // Get the etudiant department element
    const deleteModal = document.getElementById('deleteModal');     // Get the delete modal element
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');       // Get the confirm delete button element
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');     // Get the cancel delete button element
    const editModal = document.getElementById('editModal');         // Get the edit modal element
    const modalEtudiantFirstName = document.getElementById('modalEtudiantFirstName');
    const modalEtudiantLastName = document.getElementById('modalEtudiantLastName');
    const modalEtudiantEmail = document.getElementById('modalEtudiantEmail');
    const modalEtudiantDepartment = document.getElementById('modalEtudiantDepartment');
    const confirmEditBtn = document.getElementById('confirmEditBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    let editId = null;

    // Fetch and display etudiants
    function fetchStudents() { // Function to fetch and display students
        fetch('../php/student/get_students.php') // Fetch students from the server
            .then(response => response.json()) // Parse the JSON response into a JavaScript object
            .then(data => { // Display the students
                etudiantList.innerHTML = ''; // Clear the student list
                data.forEach(etudiant => { // Loop through the etudiants
                    const li = document.createElement('li'); // Create a new list item
                    li.innerHTML = ` 
                        <span>${etudiant.first_name}</span>&nbsp;<span>${etudiant.last_name}</span> - <span>${etudiant.email}</span> 
                        <div>
                            <button class="edit" data-id="${etudiant.id}" data-first_name="${etudiant.first_name}" data-last_name="${etudiant.last_name}" data-email="${etudiant.email}" data-department_id="${etudiant.department_id}">Modifier</button>
                            <button class="delete" data-id="${etudiant.id}">Supprimer</button>
                        </div>
                    `;
                    etudiantList.appendChild(li); // Append the list item to the etudiant list
                });

                // Attach event listeners to the edit and delete buttons for each etudiant
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

    // Save etudiant (add new or update existing)
    saveButton.addEventListener('click', () => { // Add a click event listener to the save button
        const first_name = etudiantFirst_name.value.trim(); // Get the etudiant name value and trim any leading or trailing whitespace
        const last_name = etudiantLast_name.value.trim(); // Get the etudiant name value and trim any leading or trailing whitespace
        const email = etudiantEmail.value.trim(); // Get the etudiant description value and trim any leading or trailing whitespace
        const department_id = etudiantDepartment.value; // Get the etudiant description value and trim any leading or trailing whitespace
        console.log(department_id);
        if (!first_name || !last_name) return alert('Le nom du etudiant est obligatoire.'); // If the name is empty, display an alert and return

        const url = editId ? '../php/student/edit_student.php' : '../php/student/add_student.php'; // Set the URL based on whether we are adding or editing a etudiant 
        console.log(url);
        console.log(editId);
        const data = { id: editId, first_name, last_name, email, department_id }; // Create a new object with the etudiant data to send to the server
        console.log(data);

        fetch(url, { // Fetch the URL with the data object
            method: 'POST', // Use the POST method
            headers: { 'Content-Type': 'application/json' }, // Set the content type to JSON
            body: JSON.stringify(data), // Convert the data object to a JSON string
        })
            .then(response => response.json()) // Parse the JSON response into a JavaScript object
            .then(data => { // Display the response data
                if (data.success) { // If the response was successful
                    fetchStudents(); // Refresh etudiant list
                    etudiantFirst_name.value = ''; // Clear the etudiant name field
                    etudiantLast_name.value = ''; // Clear the etudiant name field
                    etudiantEmail.value = ''; // Clear the etudiant email field
                    etudiantDepartment.value = ''; // Clear the etudiant department field
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

    // Open delete modal
    function openDeleteModal(id) { // Function to open the delete modal
        deleteModal.style.display = 'flex'; // Show the delete modal 
        confirmDeleteBtn.dataset.id = id; // Set the ID of the etudiant to delete
    }

    // Confirm delete
    confirmDeleteBtn.addEventListener('click', () => { // Add a click event listener to the confirm delete button
        const id = confirmDeleteBtn.dataset.id;     // Get the ID of the etudiant to delete
        fetch('../php/student/delete_student.php', { // Fetch the delete department script
            method: 'POST', // Use the POST method
            headers: { 'Content-Type': 'application/json' }, // Set the content type to JSON
            body: JSON.stringify({ id }),   // Convert the data object to a JSON string
        })
            .then(response => response.json()) // Parse the JSON response into a JavaScript object
            .then(data => { // Display the response data
                if (data.success) { // If the response was successful
                    fetchStudents(); // Refresh etudiant list
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
        modalEtudiantFirstName.value = first_name; // Populate fields in the modal 
        modalEtudiantLastName.value = last_name; // Populate fields in the modal
        modalEtudiantEmail.value = email; // Populate fields in the modal
        modalEtudiantDepartment.value = department_id; // Populate fields in the modal

        editModal.style.display = 'flex'; // Show modal 
        console.log('openEditModal');
    }

    // Confirm edit
    confirmEditBtn.addEventListener('click', () => { // Add a click event listener to the confirm edit button
        const first_name = modalEtudiantFirstName.value.trim(); // Get the etudiant name value and trim any leading or trailing whitespace
        const last_name = modalEtudiantLastName.value.trim(); // Get the etudiant name value and trim any leading or trailing whitespace
        const email = modalEtudiantEmail.value.trim(); // Get the etudiant description value and trim any leading or trailing whitespace
        const department_id = modalEtudiantDepartment.value; // Get the etudiant description value and trim any leading or trailing whitespace
        if (!first_name || !last_name) return alert('Le nom du etudiant est obligatoire.'); // If the name is empty, display an alert and return

        const data = { id: editId, first_name, last_name, email, department_id }; // Create a new object with the etudiant data to send to the server
        fetch('../php/student/edit_student.php', { // Fetch the edit etudiant script
            method: 'POST', // Use the POST method
            headers: { 'Content-Type': 'application/json' },    // Set the content type to JSON
            body: JSON.stringify(data),     // Convert the data object to a JSON string
        })
            .then(response => response.json()) // Parse the JSON response into a JavaScript object
            .then(data => { // Display the response data
                if (data.success) { // If the response was successful
                    fetchStudents(); // Refresh department list
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
    fetchStudents(); // Fetch and display etudiants when the page loads
});
