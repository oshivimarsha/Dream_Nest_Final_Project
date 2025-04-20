document.addEventListener('DOMContentLoaded', function() {
    const API_URL = 'http://localhost:8080/api/v1/reviews';

    // Star rating functionality
    const starRating = document.getElementById('star-rating');
    const ratingInput = document.getElementById('rating');
    const stars = starRating.querySelectorAll('.fa-star');

    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.getAttribute('data-rating');
            ratingInput.value = rating;

            // Update stars visual
            stars.forEach(s => {
                if (s.getAttribute('data-rating') <= rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });

        star.addEventListener('mouseover', function() {
            const rating = this.getAttribute('data-rating');

            stars.forEach(s => {
                if (s.getAttribute('data-rating') <= rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });

        starRating.addEventListener('mouseout', function() {
            const currentRating = ratingInput.value;

            stars.forEach(s => {
                if (s.getAttribute('data-rating') <= currentRating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });

    // Load approved reviews
    function loadReviews() {
        fetch(`${API_URL}/public`)
            .then(response => response.json())
            .then(data => {
                displayReviews(data, 'reviews-container');
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('reviews-container').innerHTML =
                    '<div class="alert alert-danger">Failed to load reviews. Please try again later.</div>';
            });
    }

    // Display reviews in container
    function displayReviews(reviews, containerId) {
        const container = document.getElementById(containerId);

        if (reviews.length === 0) {
            container.innerHTML = '<div class="alert alert-info">No reviews available yet.</div>';
            return;
        }

        let html = '';
        reviews.forEach(review => {
            const stars = generateStarRating(review.rating);

            html += `
                <div class="review-card card p-3 mb-3">
                    <div class="review-header mb-2">
                        <h5 class="card-title mb-0">${review.customerName}</h5>
                        <div class="review-stars">${stars}</div>
                    </div>
                    <p class="card-text">${review.comment}</p>
                </div>
            `;
        });

        container.innerHTML = html;
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

    // Submit review form
    document.getElementById('review-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const customerName = document.getElementById('customerName').value;
        const email = document.getElementById('email').value;
        const rating = document.getElementById('rating').value;
        const comment = document.getElementById('comment').value;

        if (!rating || rating === '0') {
            showSubmissionMessage('Please select a rating.', 'danger');
            return;
        }

        const reviewData = {
            customerName,
            email,
            rating: parseInt(rating),
            comment
        };

        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => {
                        throw new Error(JSON.stringify(err));
                    });
                }
                return response.json();
            })
            .then(data => {
                document.getElementById('review-form').reset();
                ratingInput.value = '0';
                stars.forEach(s => s.classList.remove('active'));

                showSubmissionMessage('Thank you for your review! It will be visible after approval.', 'success');
            })
            .catch(error => {
                console.error('Error:', error);
                try {
                    const err = JSON.parse(error.message);
                    let errorMsg = 'Failed to submit review: ';
                    for (const key in err) {
                        errorMsg += `${err[key]} `;
                    }
                    showSubmissionMessage(errorMsg, 'danger');
                } catch (e) {
                    showSubmissionMessage('Failed to submit review. Please try again.', 'danger');
                }
            });
    });

    // Show submission message
    function showSubmissionMessage(message, type) {
        const submissionMessage = document.getElementById('submission-message');
        submissionMessage.innerHTML = `<div class="alert alert-${type}">${message}</div>`;

        // Clear message after 5 seconds
        setTimeout(() => {
            submissionMessage.innerHTML = '';
        }, 5000);
    }

    // Load reviews on page load
    loadReviews();
});