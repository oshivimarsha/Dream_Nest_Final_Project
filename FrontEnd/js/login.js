function handleLogin() {
    // Handle login logic here
    console.log("Login button clicked!");
}

$("#login-btn").on("click", function(event) {
    var data = {
        email: $("#loginEmail").val(),
        password: $("#loginPassword").val()
    };

    console.log(data);

    if (data.email && data.password) {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/v1/auth/authenticate",
            contentType: "application/json",
            data: JSON.stringify(data),
            dataType: "json",

            success: function(response) {
                console.log(response); // check full response
                var role = response.data ? response.data.role : response.role;
                console.log("User Role: " + role);  // Check role here

                if (response.message === "Success") {
                    console.log('Login successful');
                    // 🚀 Redirect to login after registration success
                    window.location.href = "index.html";

                    localStorage.clear();
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("role", response.data.role);
                    localStorage.setItem("email", response.data.email);

                    // Debugging print to see the role
                    console.log("User Role: " + response.data.role);

                    if (response.data.role === "user") {
                        $("#loginIcon").css("display", "none");
                        closeModal(); // Close the modal
                        window.location.href = "index.html"; // Redirect to User's homepage
                    }

                    if (response.data.role === "admin") {
                        console.log('Redirecting to Admin Dashboard');
                        window.location.href = "view/AdminDashboard.html"; // Redirect to admin dashboard
                    }

                } else {
                    // 🎯 Display backend message on failed login
                    alert(response.message || "Invalid credentials. Please try again.");
                }
            },
            error: function(xhr, status, error) {
                console.log("Error: " + error);
            }
        });
    }
});

/*------------------------------- OTP --------------------------------------------------------------------------------------*/

$(document).ready(function() {
    let countdownTime = 30; // 30 seconds
    let countdown = setInterval(function() {
        countdownTime--;
        $("#countdown").text(countdownTime + "s");

        if (countdownTime <= 0) {
            clearInterval(countdown);
            $("#resend").removeClass("disabled"); // Enable the resend link
            $("#countdown").text(''); // Clear the countdown
        }
    }, 1000); // Runs every second
});

let serverOTP;

function sendOTP() {
    var email = document.getElementById('forgotEmail').value;

    if (!email) {
        alert("Please enter your email address.");
        return;
    }

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/v1/password/sentOTP",
        contentType: "application/json",
        data: JSON.stringify({email: email}),
        dataType: "json",
        success: function (response) {
            console.log(response);
            // Store the OTP from the server response
            serverOTP = response;

            alert("OTP has been sent to " + email + ". Please check your inbox.");

            // Show OTP field and submit button
            document.getElementById('otpField').classList.remove('hidden');  // Updated this line
            document.getElementById('submitOTP').classList.remove('hidden');

            // Hide send OTP button, show resend link with countdown
            $("#send-OTP").hide();
            $("#resend").show();
            /*$("#submitOTP").show();*/
            $("#resend").addClass("disabled");

            // Start countdown for resend
            let countdownTime = 30;
            $("#countdown").text(countdownTime + "s");

            let countdown = setInterval(function() {
                countdownTime--;
                $("#countdown").text(countdownTime + "s");

                if (countdownTime <= 0) {
                    clearInterval(countdown);
                    $("#resend").removeClass("disabled");
                    $("#countdown").text('');
                }
            }, 1000);
        },
        error: function (xhr, status, error) {
            console.log(error);
            alert('Failed to send OTP. Please try again.');
        }
    });
}

function resendOTP() {
    // Only proceed if the resend button is not disabled
    if ($("#resend").hasClass("disabled")) {
        return;
    }

    var email = document.getElementById('emaill').value;

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/v1/password/sentOTP",
        contentType: "application/json",
        data: JSON.stringify({email: email}),
        dataType: "json",
        success: function (response) {
            console.log(response);
            // Update stored OTP with new one from server
            serverOTP = response;

            // Restart countdown
            $("#resend").addClass("disabled");
            let countdownTime = 30;
            $("#countdown").text(countdownTime + "s");

            let countdown = setInterval(function() {
                countdownTime--;
                $("#countdown").text(countdownTime + "s");

                if (countdownTime <= 0) {
                    clearInterval(countdown);
                    $("#resend").removeClass("disabled");
                    $("#countdown").text('');
                }
            }, 1000);
        },
        error: function (xhr, status, error) {
            console.log(error);
            alert('Failed to resend OTP. Please try again.');
        }
    });
}

// Verify OTP
document.getElementById('submitOTP').onclick = function(event) {
    event.preventDefault();
    var enteredOTP = document.getElementById('otp').value;

    if (!enteredOTP) {
        alert("Please enter the OTP.");
        return;
    }

    // Compare entered OTP with the one received from server
    if (enteredOTP == serverOTP) {
        // If OTP matches, proceed to password reset
        document.getElementById('newPassword').classList.remove('hidden');
        document.getElementById('submitPass').classList.remove('hidden');
        document.getElementById('OTPField').classList.add('hidden');
        document.getElementById('resend').classList.add('hidden');
        document.getElementById('submitOTP').classList.add('hidden');
        $("#resend").hide();


        alert("OTP Verified. Please set your new password.");
    } else {
        alert("Invalid OTP. Please try again.");
    }
}


$("#submitPass").on("click", function(event) {
    event.preventDefault();

    var password = $("#password").val();

    if (!password) {
        alert("Please enter a new password.");
        return;
    }

    var data = {
        email: $("#emaill").val(),
        password: password
    };

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/v1/password/resetPassword",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: "json",
        success: function(response) {
            console.log(response);
            alert("Password has been reset successfully. You can now login with your new password.");
            //closePopup(); // Close the forgot password modal
        },
        error: function(xhr, status, error) {
            console.log(error);
            alert('Failed to reset password. Please try again.');
        }
    });
});

