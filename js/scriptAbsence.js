document.addEventListener('DOMContentLoaded', function () { // DOMContentLoaded event ensures the script runs after the HTML has been loaded
    const absenceList = document.getElementById('absenceList'); // Get the absence list element
    const saveButton = document.getElementById('saveButton');   // Get the save button element
    const absenceStudent = document.getElementById('absenceStudent');   // Get the absence student element
    const absenceDate = document.getElementById('absenceDate');   // Get the absence date element
    const absenceJustified = document.getElementById('absenceJustified');     // Get the absence justified element
    const absenceJustification = document.getElementById('absenceJustification');     // Get the absence justification element
    const deleteModal = document.getElementById('deleteModal');     // Get the delete modal element
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');       // Get the confirm delete button element
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');     // Get the cancel delete button element
    const editModal = document.getElementById('editModal');         // Get the edit modal element
    const modalAbsenceStudent = document.getElementById('modalAbsenceStudent');
    const modalAbsenceDate = document.getElementById('modalAbsenceDate');
    const modalAbsenceJustified = document.getElementById('modalAbsenceJustified');
    const modalAbsenceJustification = document.getElementById('modalAbsenceJustification');
    const confirmEditBtn = document.getElementById('confirmEditBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    let editId = null;

    // Fetch and display absences
    function fetchAbsences() { // Function to fetch and display absences
        console.log('Fetching absences...'); // Log a message to the console
        fetch('../php/absence/get_absences.php') // Fetch absences from the server
            .then(response => response.json()) // Parse the JSON response into a JavaScript object
            .then(data => { // Display the absences
                absenceList.innerHTML = ''; // Clear the student list
                data.forEach(absence => { // Loop through the absences
                    const li = document.createElement('li'); // Create a new list item
                    li.innerHTML = ` 
                        <span>${absence.date}</span> - <span>${absence.justification}</span> 
                        <div>
                            <button class="edit" data-id="${absence.id}" data-student_id="${absence.student_id}" data-date="${absence.date}" data-justified="${absence.justified}" data-justification="${absence.justification}">Modifier</button>
                            <button class="delete" data-id="${absence.id}">Supprimer</button>
                        </div>
                    `;
                    absenceList.appendChild(li); // Append the list item to the absence list
                });

                // Attach event listeners to the edit and delete buttons for each absence
                document.querySelectorAll('.edit').forEach(button => { // Loop through the edit buttons and add an event listener to each one 
                    button.addEventListener('click', (e) => { // Add a click event listener to each edit button
                        console.log(e.target.dataset.id); // Log the absence ID to the console
                        openEditModal(e.target.dataset.id, e.target.dataset.student_id, e.target.dataset.date, e.target.dataset.justified, e.target.dataset.justification); // Open the edit modal when the edit button is clicked
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

    // Save absence (add new or update existing)
    saveButton.addEventListener('click', () => { // Add a click event listener to the save button
        const student_id = absenceStudent.value.trim(); // Get the absence name value and trim any leading or trailing whitespace
        const date = absenceDate.value.trim(); // Get the absence name value and trim any leading or trailing whitespace
        const justified = absenceJustified.checked ? 1 : 0; // Get the absence description value and trim any leading or trailing whitespace
        const justification = absenceJustification.value.trim(); // Get the absence description value and trim any leading or trailing whitespace
        console.log(justification);
        if (!student_id || !date || !justification) return alert("Tout les champs sont obligatoires !");

        const url = editId ? '../php/absence/edit_absence.php' : '../php/absence/add_absence.php'; // Set the URL based on whether we are adding or editing an absence
        console.log(url);
        console.log(editId);
        const data = { id: editId, student_id, date, justified, justification }; // Create a new object with the absence data to send to the server
        console.log(data);
        
        fetch(url, { // Fetch the URL with the data object
            method: 'POST', // Use the POST method
            headers: { 'Content-Type': 'application/json' }, // Set the content type to JSON
            body: JSON.stringify(data), // Convert the data object to a JSON string
        })
            .then(response => {
                console.log('Response received:', response);
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText); // If the response is not OK, throw an error with the status text
                }
                return response.json();
            }) // Parse the JSON response into a JavaScript object
            .then(data => { // Display the response data
                console.log('Data received:', data);
                if (data.success) { // If the response was successful
                    fetchAbsences(); // Refresh absence list
                    absenceStudent.value = ''; // Clear the absence student field
                    absenceDate.value = ''; // Clear the absence date field
                    absenceJustified.checked = false; // Clear the absence justified field
                    absenceJustification.value = ''; // Clear the absence justification field
                    editId = null; // Reset edit ID to null
                    console.log('Success:', data.success);
                } else { // If the response was not successful
                    console.log('Ohh no');
                    console.log('Error:', data.error);
                    alert(data.error);   // Display an alert with the error message
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred: ' + error.message);
            }); // Log any errors to the console
    });

    // Open delete modal
    function openDeleteModal(id) { // Function to open the delete modal
        deleteModal.style.display = 'flex'; // Show the delete modal 
        confirmDeleteBtn.dataset.id = id; // Set the ID of the absence to delete
    }

    // Confirm delete
    confirmDeleteBtn.addEventListener('click', () => { // Add a click event listener to the confirm delete button
        const id = confirmDeleteBtn.dataset.id;     // Get the ID of the absence to delete
        fetch('../php/absence/delete_absence.php', { // Fetch the delete department script
            method: 'POST', // Use the POST method
            headers: { 'Content-Type': 'application/json' }, // Set the content type to JSON
            body: JSON.stringify({ id }),   // Convert the data object to a JSON string
        })
            .then(response => response.json()) // Parse the JSON response into a JavaScript object
            .then(data => { // Display the response data
                if (data.success) { // If the response was successful
                    fetchAbsences(); // Refresh absence list
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
    function openEditModal(id, student_id, date, justified, justification) { // Function to open the edit modal
        editId = id;
        modalAbsenceStudent.value = student_id; // Populate fields in the modal
        modalAbsenceDate.value = date; // Populate fields in the modal
        modalAbsenceJustified.checked = justified === '1'; // Populate fields in the modal
        modalAbsenceJustification.value = justification; // Populate fields in the modal

        editModal.style.display = 'flex'; // Show modal 
        console.log('openEditModal');
    }

    // Confirm edit
    confirmEditBtn.addEventListener('click', () => { // Add a click event listener to the confirm edit button
        const student_id = modalAbsenceStudent.value.trim(); // Get the absence name value and trim any leading or trailing whitespace
        const date = modalAbsenceDate.value.trim(); // Get the absence name value and trim any leading or trailing whitespace
        const justified = modalAbsenceJustified.checked ? 1 : 0; 
        const justification = modalAbsenceJustification.value.trim(); // Get the absence description value and trim any leading or trailing whitespace
        if (!student_id || !date || !justification) return alert('Tout les champs sont obligatoires !'); // If any field is empty, display an alert and return

        const data = { id: editId, student_id, date, justified, justification }; // Create a new object with the absence data to send to the server
        console.log('Data to be sent:', data); // Log the data being sent
        fetch('../php/absence/edit_absence.php', { // Fetch the edit absence script
            method: 'POST', // Use the POST method
            headers: { 'Content-Type': 'application/json' },    // Set the content type to JSON
            body: JSON.stringify(data),     // Convert the data object to a JSON string
        })
            .then(response => {
                console.log('Response received:', response);
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText); // If the response is not OK, throw an error with the status text
                }
                return response.json();
            }) // Parse the JSON response into a JavaScript object
            .then(data => { // Display the response data
                console.log('Data received:', data);
                if (data.success) { // If the response was successful
                    fetchAbsences(); // Refresh absence list
                    editModal.style.display = 'none'; // Hide modal
                    editId = null; // Reset edit ID
                } else {
                    console.log('Error:', data.error);
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
    fetchAbsences(); // Fetch and display absences when the page loads
});