// Modal functionality with animation
const modal = document.getElementById('addUserModal');
const modalContent = modal.querySelector('.modal-content');

function openModal() {
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function closeModal() {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// Form submission
/*const form = document.getElementById('addUserForm');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        status: document.getElementById('status').value
    };

    // You would normally send this data to your backend
    console.log('User data:', formData);

    // Add user to table (just for demonstration)
    addUserToTable(formData);

    // Reset form and close modal
    form.reset();
    closeModal();
});*/

/*function addUserToTable(userData) {
    const table = document.getElementById('usersTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    // Get the last row number and increment
    const rowCount = table.rows.length;

    // Add cells
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);

    // Add data to cells
    cell1.textContent = rowCount;
    cell2.textContent = userData.name;
    cell3.textContent = userData.username;
    cell4.textContent = userData.email;
    cell5.textContent = userData.status === 'active' ? 'Active' : 'Inactive';
    cell6.className = 'action-buttons';
    cell6.innerHTML = `
            <button class="btn btn-warning" onclick="editUser(${rowCount})">Update</button>
            <button class="btn btn-danger" onclick="deleteUser(${rowCount})">Delete</button>
        `;
}*/

// Delete user function
/*function deleteUser(id) {
    if (confirm('Are you sure you want to delete this user?')) {
        // In a real application, you would send a request to delete the user
        console.log('Deleting user with ID:', id);

        // For demonstration, remove the row from the table
        const table = document.getElementById('usersTable');
        const rows = table.getElementsByTagName('tr');

        for (let i = 1; i < rows.length; i++) {
            if (rows[i].cells[0].textContent == id) {
                table.deleteRow(i);
                break;
            }
        }
    }
}

// Edit user function
function editUser(id) {
    // In a real application, you would fetch the user data and populate the form
    console.log('Editing user with ID:', id);
    alert('User editing functionality coming soon...');
}

// Toggle sidebar on mobile
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', function() {
    sidebar.classList.toggle('active');
});*/

const deleteUser = (uid) => {
    if (confirm("Are you sure...")){

    }
}

const editUser = (uid,name,address) => {
    $('#update_customer_id').val(uid);
    $('#update_customer_name').val(name);
    $('#update_customer_address').val(address);

    $('#updateModel').modal('show');
}

//Get All Data From Users
const fetchData = () => {
    console.log("user")
    $.ajax({
        url: "http://localhost:8080/api/v1/user/getAll",
        type: "GET",
        success: (res) => {
            console.log(res);

            // දත්ත නිවැරදිව ලබා ගැනීම
            if (!res || res.code !== 200 || !res.data || res.data.length === 0) {
                console.log("No user data found or error occurred!");
                return;
            }

            let data = res.data; // res.data භාවිතා කිරීම (res වෙනුවට)

            // එක table body එකක් පමණක් භාවිතා කරන්න
            const userTableBody = $('#user_table-body');
            userTableBody.empty();

            // නිවැරදි for loop
            for (let i = 0; i < data.length; i++) {
                // username null වන අවස්ථා හඳුනාගැනීම
                const username = data[i].username || "N/A";

                let row = `
                <tr>
                    <td>${data[i].uid}</td>
                    <td>${username}</td>
                    <td>${data[i].email}</td>
                    <td>${data[i].role}</td>
                    <td>
                        <button type="button" class="btn btn-info btn-update" onclick="editUser(${data[i].uid},'${username}','${data[i].email}','${data[i].role}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
  </svg>
                        Update</button>
                        <button type="button" class="btn btn-danger btn-delete" onclick="deleteUser(${data[i].uid})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
  </svg>
                        Delete</button>
                    </td>
                </tr>`;
                userTableBody.append(row);
            }
        },
        error: (err) => {
            console.error("Error fetching user data:", err);
        }
    })
}

fetchData(); // Function eka call karanna

// ------- Save User --------
$('#btn-save').click((event) => {
    event.preventDefault();

    const username = $('#username').val();
    const email = $('#email').val();
    const password = $('#password').val();
    const role = $('#role').val();

    console.log(username, email, password, role);

    //JavaScript Object
    const userData = {
        username:username,
        email:email,
        password:password,
        role:role
    }

    $.ajax({
        url:"",
        type:"POST",
        //JavaScript Object ==> JavaScript Object Nation
        data: JSON.stringify(userData),
        success: (res) => {
            fetchData();
            console.log(res);
        },
        error:(err) => {
            console.error(err);
        }
    });

});