function checkLoginStatus() {
    console.log("Login status checked!");
}

function handleRegistration() {
    alert("Registration clicked!");
}

$("#register-btn").on("click", function(event) {
    var data = {
        username: $("#registerUsername").val(),
        email: $("#registerEmail").val(),
        password: $("#registerPassword").val(),
        role: "user"
    };

    console.log(data);

    if (data.email && data.password) {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/v1/user/register",
            contentType: "application/json",
            data: JSON.stringify(data),
            dataType: "json",

            success: function(response) {
                localStorage.clear();
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.role);
                localStorage.setItem("email", response.data.email);

                console.log(response);  // Check response content here
                if (response.message === "Success") {
                    console.log('reg una');
                    checkLoginStatus();
                    /*closeRegModal();*/ // Hide the login icon if success
                    alert("Registration successful!");
                    // Redirect to login page
                    window.location.href = "login.html";
                } else {
                    alert(response.message);  // Show error message if not successful
                }
            },
            error: function(xhr, status, error) {
                console.log("Error: " + error);
            }
        });
    } else {
        alert("Please fill in all required fields.");
    }
});