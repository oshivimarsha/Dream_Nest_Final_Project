document.addEventListener('DOMContentLoaded', function () {
    // Handle login click (optional for debugging)
    function handleLogin() {
        alert("Login button clicked!");
    }
    window.handleLogin = handleLogin; // Ensure it's accessible in HTML

    // Form submit event listener
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const errorMessage = document.getElementById('errorMessage')
        console.log(email)
        console.log(password)

        if (!email || !password) {
            errorMessage.textContent = 'Email and password are required';
            return;
        }
        console.log()

        // AJAX request to Spring Boot backend
        fetch('http://localhost:8080/api/v1/auth/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password

            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Login failed');
                }
                return response.json();
            })
            .then(data => {
                // Successful login: Store token and redirect
                localStorage.setItem('token', data.token);
                window.location.href = '/dashboard.html';
            })
            .catch(error => {
                console.error('Error:', error);
                errorMessage.textContent = 'Invalid email or password';
            });
    });
});