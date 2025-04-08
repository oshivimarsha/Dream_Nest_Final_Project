document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('registerUsername').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;
        const errorMessage = document.getElementById('errorMessage');
        const successMessage = document.getElementById('successMessage');

        // Reset messages
        errorMessage.textContent = '';
        successMessage.textContent = '';

        // Simple validation
        if (!name || !email || !password) {
            errorMessage.textContent = 'Please fill in all fields.';
            return;
        }

        /*if (password !== confirmPassword) {
            errorMessage.textContent = 'Passwords do not match.';
            return;
        }*/

        try {
            // Send registration request
            const response = await fetch('http://localhost:8080/api/v1/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed.');
            }

            // Success: Redirect or show message
            successMessage.textContent = 'Registration successful! Redirecting...';
            setTimeout(() => {
                window.location.href = '/login.html';
            }, 2000);

        } catch (error) {
            errorMessage.textContent = error.message;
        }
    });
});
