document.addEventListener('DOMContentLoaded', function() {
    const API_URL = 'http://localhost:8080/api/v1/reviews';

    // Load reviews immediately when page loads
    loadAllReviews();

    // Refresh reviews
    document.getElementById('refresh-reviews').addEventListener('click', function () {
        loadAllReviews();
    });

    // Tab switching event handlers
    document.getElementById('all-tab').addEventListener('click', function () {
        // No need to reload as this tab is loaded by default
    });

    document.getElementById('pending-tab').addEventListener('click', function () {
        loadPendingReviews();
    });

    document.getElementById('approved-tab').addEventListener('click', function () {
        loadApprovedReviews();
    });

    // Load all reviews for admin
    function loadAllReviews() {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                displayReviews(data, 'all-reviews-container');
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('all-reviews-container').innerHTML =
                    '<div class="alert alert-danger">Failed to load reviews. Please try again later.</div>';
            });
    }

    // Load pending reviews
    function loadPendingReviews() {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                const pendingReviews = data.filter(review => !review.approved);
                displayReviews(pendingReviews, 'pending-reviews-container');
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('pending-reviews-container').innerHTML =
                    '<div class="alert alert-danger">Failed to load pending reviews. Please try again later.</div>';
            });
    }

    // Load approved reviews
    function loadApprovedReviews() {
        fetch(`${API_URL}/public`)
            .then(response => response.json())
            .then(data => {
                displayReviews(data, 'approved-reviews-container');
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('approved-reviews-container').innerHTML =
                    '<div class="alert alert-danger">Failed to load approved reviews. Please try again later.</div>';
            });
    }

    // Display reviews in container
    function displayReviews(reviews, containerId) {
        const container = document.getElementById(containerId);

        if (reviews.length === 0) {
            container.innerHTML = '<div class="alert alert-info">No reviews available.</div>';
            return;
        }

        let html = `
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Rating</th>
                            <th>Comment</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        reviews.forEach(review => {
            const stars = generateStarRating(review.rating);
            const status = review.approved ?
                '<span class="badge bg-success">Approved</span>' :
                '<span class="badge bg-warning text-dark">Pending</span>';

            html += `
                <tr>
                    <td>${review.customerName}</td>
                    <td>${review.email}</td>
                    <td>${stars}</td>
                    <td>${truncateText(review.comment, 100)}</td>
                    <td>${status}</td>
                    <td class="review-actions">
                        ${!review.approved ?
                `<button class="btn btn-sm btn-success approve-review" data-id="${review.id}">
                                <i class="fas fa-check"></i>
                            </button>` :
                ''
            }
                        <button class="btn btn-sm btn-danger delete-review" data-id="${review.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                        <button class="btn btn-sm btn-info view-review" data-id="${review.id}" data-bs-toggle="modal" data-bs-target="#reviewModal">
                            <i class="fas fa-eye"></i>
                        </button>
                    </td>
                </tr>
            `;
        });

        html += `
                    </tbody>
                </table>
            </div>
        `;

        // Add review modal for viewing full comments
        if (!document.getElementById('reviewModal')) {
            const modalHtml = `
                <div class="modal fade" id="reviewModal" tabindex="-1" aria-labelledby="reviewModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="reviewModalLabel">Review Details</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body" id="reviewModalBody">
                                <!-- Review details will be inserted here -->
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHtml);
        }

        container.innerHTML = html;

        // Add event listeners for admin actions
        addReviewActionListeners(containerId);
    }

    // Add event listeners to review action buttons
    function addReviewActionListeners(containerId) {
        const container = document.getElementById(containerId);

        // Approve review buttons
        container.querySelectorAll('.approve-review').forEach(button => {
            button.addEventListener('click', function () {
                approveReview(this.getAttribute('data-id'));
            });
        });

        // Delete review buttons
        container.querySelectorAll('.delete-review').forEach(button => {
            button.addEventListener('click', function () {
                deleteReview(this.getAttribute('data-id'));
            });
        });

        // View review buttons
        container.querySelectorAll('.view-review').forEach(button => {
            button.addEventListener('click', function () {
                viewReviewDetails(this.getAttribute('data-id'));
            });
        });
    }

    // View full review details in modal
    function viewReviewDetails(id) {
        fetch(`${API_URL}/${id}`)
            .then(response => response.json())
            .then(review => {
                const stars = generateStarRating(review.rating);
                const status = review.approved ?
                    '<span class="badge bg-success">Approved</span>' :
                    '<span class="badge bg-warning text-dark">Pending</span>';

                const modalBody = document.getElementById('reviewModalBody');
                modalBody.innerHTML = `
                    <div class="mb-3">
                        <strong>Customer:</strong> ${review.customerName}
                    </div>
                    <div class="mb-3">
                        <strong>Email:</strong> ${review.email}
                    </div>
                    <div class="mb-3">
                        <strong>Rating:</strong> ${stars}
                    </div>
                    <div class="mb-3">
                        <strong>Status:</strong> ${status}
                    </div>
                    <div class="mb-3">
                        <strong>Comment:</strong>
                        <p class="mt-2">${review.comment}</p>
                    </div>
                `;
            })
            .catch(error => {
                console.error('Error:', error);
                const modalBody = document.getElementById('reviewModalBody');
                modalBody.innerHTML = '<div class="alert alert-danger">Failed to load review details.</div>';
            });
    }

    // Generate star rating HTML
    function generateStarRating(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '<i class="fas fa-star text-warning"></i>';
            } else {
                stars += '<i class="far fa-star text-warning"></i>';
            }
        }
        return stars;
    }

    // Truncate text for table display
    function truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    // Approve review
    function approveReview(id) {
        fetch(`${API_URL}/${id}/approve`, {
            method: 'PUT'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to approve review');
                }
                return response.json();
            })
            .then(() => {
                // Refresh all tabs
                loadAllReviews();
                loadPendingReviews();
                loadApprovedReviews();

                // Show success message
                showAlert('Review approved successfully!', 'success');
            })
            .catch(error => {
                console.error('Error:', error);
                showAlert('Failed to approve review. Please try again.', 'danger');
            });
    }

    // Delete review function
    function deleteReview(id) {
        // Confirm before deleting
        if (confirm('Are you sure you want to delete this review?')) {
            fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    // Check if response is OK (even if it doesn't return JSON)
                    if (!response.ok) {
                        throw new Error('Failed to delete review');
                    }

                    // Some DELETE endpoints don't return JSON, so handle both cases
                    if (response.headers.get('content-type')?.includes('application/json')) {
                        return response.json();
                    } else {
                        return Promise.resolve({});
                    }
                })
                .then(() => {
                    // Refresh all tabs
                    loadAllReviews();
                    loadPendingReviews();
                    loadApprovedReviews();

                    // Show success message
                    showAlert('Review deleted successfully!', 'success');
                })
                .catch(error => {
                    console.error('Error:', error);
                    showAlert('Failed to delete review. Please try again.', 'danger');
                });
        }
    }

    // Show alert message function
    function showAlert(message, type) {
        // Create alert element
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.setAttribute('role', 'alert');
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;

        // Append to alerts container if it exists, otherwise to body
        const alertsContainer = document.getElementById('alerts-container');
        if (alertsContainer) {
            alertsContainer.prepend(alertDiv);
        } else {
            // Insert after the first element in the body
            document.body.insertBefore(alertDiv, document.body.firstChild.nextSibling);
        }

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            alertDiv.classList.remove('show');
            setTimeout(() => alertDiv.remove(), 300);
        }, 5000);
    }
});