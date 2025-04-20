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
// Global variables
let serverOTP;
let countdownInterval;
let emailForReset;

// Function to send OTP
function sendOTP() {
    // Get email and validate
    emailForReset = document.getElementById('forgotEmail').value;

    if (!emailForReset) {
        alert('Please enter your email address');
        return;
    }

    if (!isValidEmail(emailForReset)) {
        alert('Please enter a valid email address');
        return;
    }

    // Show loading state
    const sendOTPBtn = document.getElementById('send-OTP-btn');
    const originalText = sendOTPBtn.textContent;
    sendOTPBtn.textContent = 'Sending...';
    sendOTPBtn.disabled = true;

    // Make API call to send OTP
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/v1/password/sentOTP",
        contentType: "application/json",
        data: JSON.stringify({email: emailForReset}),
        success: function(response) {
            // Reset button state
            sendOTPBtn.textContent = originalText;
            sendOTPBtn.disabled = false;

            // If response is "Email does not exist"
            if (response === "Email does not exist") {
                alert('This email is not registered in our system');
                return;
            }

            // Store OTP from server
            serverOTP = response;

            // Hide email container, show OTP container
            document.getElementById('email-container').classList.add('hidden');
            document.getElementById('otp-container').classList.remove('hidden');

            // Start countdown for resend
            startResendCountdown();

            // Inform user
            alert("OTP has been sent to " + emailForReset + ". Please check your inbox.");
        },
        error: function(xhr, status, error) {
            // Reset button state
            sendOTPBtn.textContent = originalText;
            sendOTPBtn.disabled = false;

            // Show error
            console.error("Error sending OTP:", error);
            alert("Failed to send OTP. Please try again later.");
        }
    });
}

// Function to reset OTP process and go back to email entry
function resetOtpProcess() {
    // Clear any existing interval
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    // Clear OTP input
    document.getElementById('otp-input').value = '';

    // Hide OTP container, show email container
    document.getElementById('otp-container').classList.add('hidden');
    document.getElementById('email-container').classList.remove('hidden');

    // Clear stored OTP
    serverOTP = null;
}

// Function to resend OTP
function resendOTP() {
    // Get the resend link
    const resendLink = document.getElementById('resend-link');

    // Check if disabled
    if (resendLink.classList.contains('disabled')) {
        return;
    }

    // Show loading state
    resendLink.classList.add('disabled');
    resendLink.innerHTML = 'Sending...';

    // Make API call to resend OTP
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/v1/password/sentOTP",
        contentType: "application/json",
        data: JSON.stringify({email: emailForReset}),
        success: function(response) {
            // Store new OTP from server
            serverOTP = response;

            // Reset resend link
            resendLink.innerHTML = 'Resend OTP';

            // Start countdown again
            startResendCountdown();

            // Inform user
            alert("New OTP has been sent to your email.");
        },
        error: function(xhr, status, error) {
            // Reset link state
            resendLink.classList.remove('disabled');
            resendLink.innerHTML = 'Resend OTP';

            // Show error
            console.error("Error resending OTP:", error);
            alert("Failed to resend OTP. Please try again later.");
        }
    });
}

// Function to start resend countdown
function startResendCountdown() {
    // Clear any existing interval
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    // Get resend link and set initial state
    const resendLink = document.getElementById('resend-link');
    const countdownSpan = document.getElementById('countdown');

    resendLink.classList.add('disabled');

    // Set countdown time (30 seconds)
    let countdownTime = 30;
    countdownSpan.textContent = ` (${countdownTime}s)`;

    // Start interval
    countdownInterval = setInterval(function() {
        countdownTime--;
        countdownSpan.textContent = ` (${countdownTime}s)`;

        if (countdownTime <= 0) {
            // Clear interval and enable resend
            clearInterval(countdownInterval);
            resendLink.classList.remove('disabled');
            countdownSpan.textContent = '';
        }
    }, 1000);
}

// Function to verify OTP
function verifyOTP() {
    // Get entered OTP
    const enteredOTP = document.getElementById('otp-input').value;

    if (!enteredOTP) {
        alert('Please enter the OTP');
        return;
    }

    // Compare with server OTP
    if (enteredOTP == serverOTP) {
        // Hide OTP container, show password container
        document.getElementById('otp-container').classList.add('hidden');
        document.getElementById('password-container').classList.remove('hidden');

        // Clear any existing countdown
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }

        // Inform user
        alert("OTP verified successfully. Please set your new password.");
    } else {
        // Show error
        alert('Invalid OTP. Please try again.');
    }
}

// Function to reset password
function resetPassword() {
    // Get password values
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Validate
    if (!newPassword) {
        alert('Please enter a new password');
        return;
    }

    if (newPassword.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }

    if (newPassword !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // Show loading state
    const resetBtn = document.getElementById('reset-password-btn');
    const originalText = resetBtn.textContent;
    resetBtn.textContent = 'Resetting...';
    resetBtn.disabled = true;

    // Prepare data
    const data = {
        email: emailForReset,
        password: newPassword
    };

    // Make API call to reset password
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/v1/password/resetPassword",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: "json",
        success: function(response) {
            // Reset button state
            resetBtn.textContent = originalText;
            resetBtn.disabled = false;

            console.log("Response:", response);

            if (response.code === 201 || response.message === "Success") {
                // Show success message
                alert("Password has been reset successfully. You can now login with your new password.");

                // Redirect to login form
                showForm('loginForm');
            } else {
                // Show error message from server
                alert(response.message || "Failed to reset password. Please try again.");
            }
        },
        error: function(xhr, status, error) {
            // Reset button state
            resetBtn.textContent = originalText;
            resetBtn.disabled = false;

            // Show error
            console.error("Error resetting password:", error);

            // Try to parse the error message
            let errorMessage = "Failed to reset password. Please try again later.";
            try {
                const errorResponse = JSON.parse(xhr.responseText);
                if (errorResponse && errorResponse.message) {
                    errorMessage = errorResponse.message;
                }
            } catch (e) {
                console.error("Could not parse error response:", e);
            }

            alert(errorMessage);
        }
    });
}

// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}