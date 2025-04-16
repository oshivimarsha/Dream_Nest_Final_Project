document.addEventListener('DOMContentLoaded', function() {
    // Modal elements
    const viewPlaceModal = document.getElementById('viewPlaceModal');
    const closeViewModal = document.getElementById('closeViewModal');

    // Carousel elements
    const carouselInner = document.getElementById('carouselInner');
    const notification = document.getElementById('notification');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const placeDetails = document.getElementById('placeDetails');
    const detailTitle = document.getElementById('detailTitle');

    let carouselPosition = 0;
    let cardsPerView = 3;
    let cardWidth = 320; // Card width + margin

    // Modal event listeners
    closeViewModal.addEventListener('click', () => {
        viewPlaceModal.classList.remove('active');
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === viewPlaceModal) {
            viewPlaceModal.classList.remove('active');
        }
    });

    // Calculate how many cards should be visible at once based on screen width
    function updateCarouselLayout() {
        const containerWidth = document.getElementById('placesCarousel').offsetWidth;
        if (window.innerWidth <= 768) {
            cardsPerView = 1;
        } else if (containerWidth < 900) {
            cardsPerView = 2;
        } else {
            cardsPerView = 3;
        }
        cardWidth = 300 + 20; // Card width + margin
    }

    // Update layout on resize
    window.addEventListener('resize', function() {
        updateCarouselLayout();
        updateCarouselPosition();
    });

    // Initialize carousel
    updateCarouselLayout();

    // Show notification
    function showNotification(message, type) {
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.style.display = 'block';

        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    // Fetch all places when the page loads
    fetchAllPlaces();

    // Fetch all places
    function fetchAllPlaces() {
        fetch('http://localhost:8080/api/v1/place/getAll')
            .then(response => response.json())
            .then(data => {
                if (data.code === 200) {
                    displayPlaces(data.data);
                } else {
                    showNotification('Error loading places: ' + data.message, 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showNotification('Failed to load places. Please try again later.', 'error');
            });
    }

    // Navigate carousel
    prevBtn.addEventListener('click', function() {
        if (carouselPosition > 0) {
            carouselPosition--;
            updateCarouselPosition();
        }
    });

    nextBtn.addEventListener('click', function() {
        const cardCount = document.querySelectorAll('.place-card').length;
        if (carouselPosition < cardCount - cardsPerView) {
            carouselPosition++;
            updateCarouselPosition();
        }
    });

    // Update carousel position
    function updateCarouselPosition() {
        const translateX = -carouselPosition * cardWidth;
        carouselInner.style.transform = `translateX(${translateX}px)`;

        // Show/hide navigation buttons based on position
        const cardCount = document.querySelectorAll('.place-card').length;

        prevBtn.style.display = carouselPosition > 0 ? 'flex' : 'none';
        nextBtn.style.display = carouselPosition < cardCount - cardsPerView ? 'flex' : 'none';
    }

    // Display places in carousel
    function displayPlaces(places) {
        carouselInner.innerHTML = '';
        carouselPosition = 0;

        if (!places || places.length === 0) {
            carouselInner.innerHTML = '<div class="no-places">No places found.</div>';
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            return;
        }

        places.forEach((place, index) => {
            const placeCard = document.createElement('div');
            placeCard.className = 'place-card';
            placeCard.dataset.id = place.placeID;

            let imageHtml = '';
            if (place.image && place.image.length > 0) {
                imageHtml = `
                        <div class="place-image">
                            <img src="${place.image[0]}" alt="${place.name}">
                            ${place.image.length > 1 ? `
                                <div class="image-navigation">
                                    ${place.image.map((_, idx) => `
                                        <div class="dot ${idx === 0 ? 'active' : ''}" data-index="${idx}"></div>
                                    `).join('')}
                                </div>
                            ` : ''}

                        </div>
                    `;
            } else {
                imageHtml = `
                        <div class="place-image">
                            <img src="https://via.placeholder.com/300x200?text=No+Image" alt="No Image">
                            <div class="place-status">Popular</div>
                        </div>
                    `;
            }

            placeCard.innerHTML = `
                    ${imageHtml}
                    <div class="place-details">
                        <h3 class="place-name">${place.name}</h3>
                        <div class="place-location">📍 ${place.location}</div>
                        <p class="place-description">${place.description}</p>
                        <div class="place-coordinates">Lat: ${place.latitude}, Long: ${place.longitude}</div>
                        <div class="card-buttons">
                            <a href="../view/hotelCard.html?placeId=${place.placeID}" class="view-place" data-id="${place.placeID}">Explore Hotels</a>
                        </div>
                    </div>
                `;

            carouselInner.appendChild(placeCard);

            // Add event listeners for image navigation
            if (place.image && place.image.length > 1) {
                const dots = placeCard.querySelectorAll('.dot');
                const img = placeCard.querySelector('.place-image img');

                dots.forEach(dot => {
                    dot.addEventListener('click', function() {
                        const index = parseInt(this.dataset.index);
                        img.src = place.image[index];

                        // Update active dot
                        dots.forEach(d => d.classList.remove('active'));
                        this.classList.add('active');
                    });
                });
            }

            // Image button click event is now handled by the <a> link
        });

        // Show/hide navigation buttons based on number of cards
        updateCarouselPosition();
    }

    // View place details in modal
    function viewPlaceDetails(placeId, placeData) {
        detailTitle.textContent = placeData.name;

        let imagesHtml = '';
        if (placeData.image && placeData.image.length > 0) {
            imagesHtml = `
                    <div class="place-gallery">
                        ${placeData.image.map(img => `
                            <div class="gallery-image">
                                <img src="${img}" alt="${placeData.name}">
                            </div>
                        `).join('')}
                    </div>
                `;
        }

        placeDetails.innerHTML = `
                ${imagesHtml}
                <div class="detail-content">
                    <div class="detail-item">
                        <div class="detail-label">Location</div>
                        <div class="detail-value">📍 ${placeData.location}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Description</div>
                        <div class="detail-value">${placeData.description}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Coordinates</div>
                        <div class="detail-value">Latitude: ${placeData.latitude}, Longitude: ${placeData.longitude}</div>
                    </div>
                </div>
            `;

        viewPlaceModal.classList.add('active');
    }
});

//Get All Data From Users
const fetchData = () => {
    console.log("place")
    $.ajax({
        url: "http://localhost:8080/api/v1/place/getAll",
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
            const placeTableBody = $('#place_table-body');
            placeTableBody.empty();

            // නිවැරදි for loop
            for (let i = 0; i < data.length; i++) {
                // username null වන අවස්ථා හඳුනාගැනීම
                const name = data[i].name || "N/A";

                let row = `
                <tr>
                    <td>${data[i].id}</td>
                    <td>${name}</td>
                    <td>${data[i].description}</td>
                    <td>${data[i].location}</td>
                    <td>${data[i].latitude}</td>
                    <td>${data[i].longitude}</td>
                    <td><img src="http://localhost:8080/uploads/places/${data[i].image}" alt="Place Image" width="100px" height="" /></td>

                    <td>
                        <button type="button" class="btn btn-info btn-update" onclick="editPlace(${data[i].id},'${name}','${data[i].description}','${data[i].location}','${data[i].latitude}','${data[i].longitude}','${data[i].image}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                        Update
                        </button>
                        <button type="button" class="btn btn-danger btn-delete" onclick="deletePlace(${data[i].id})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
  </svg>
  Delete
</button>
                    </td>
                </tr>`;
                placeTableBody.append(row);
            }
        },
        error: (err) => {
            console.error("Error fetching place data:", err);
        }
    })
}

fetchData(); // Function eka call karanna


// Toggle Sidebar
document.querySelector('.toggle-btn').addEventListener('click', function() {
    document.querySelector('.sidebar').classList.toggle('active');
    document.querySelector('.main-content').classList.toggle('full-width');
});

// Modal Functions
const modal = document.getElementById("addPlaceModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelBtn = document.getElementById("cancelBtn");
const addPlaceForm = document.getElementById("addPlaceForm");
const imageInput = document.getElementById("placeImages");
const imagePreview = document.getElementById("imagePreviewContainer");
const alertSuccess = document.getElementById("alertSuccess");
const alertError = document.getElementById("alertError");
const loadingSpinner = document.getElementById("loadingSpinner");

// Open Modal
openModalBtn.addEventListener("click", function() {
    modal.style.display = "block";
});

// Close Modal
closeModalBtn.addEventListener("click", function() {
    modal.style.display = "none";
    resetForm();
});

// Close Modal with Cancel button
cancelBtn.addEventListener("click", function() {
    modal.style.display = "none";
    resetForm();
});

// Close Modal when clicking outside
window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
        resetForm();
    }
});

// Image Preview
imageInput.addEventListener("change", function() {
    imagePreview.innerHTML = "";
    if (this.files) {
        const maxFiles = 5;
        if (this.files.length > maxFiles) {
            alert(`Please select up to ${maxFiles} images only.`);
            this.value = "";
            return;
        }

        for (let i = 0; i < this.files.length; i++) {
            const file = this.files[i];
            if (!file.type.match('image.*')) {
                continue;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement("img");
                img.classList.add("image-preview");
                img.src = e.target.result;
                imagePreview.appendChild(img);
            }
            reader.readAsDataURL(file);
        }
    }
});



// Reset Form
function resetForm() {
    addPlaceForm.reset();
    imagePreview.innerHTML = "";
}

// Update modal elements
const updateModal = document.getElementById("updatePlaceModal");
const closeUpdateModalBtn = document.getElementById("closeUpdateModalBtn");
const updateCancelBtn = document.getElementById("updateCancelBtn");
const updatePlaceForm = document.getElementById("updatePlaceForm");
const updateImageInput = document.getElementById("updatePlaceImages");
const updateImagePreview = document.getElementById("updateImagePreviewContainer");
const updateAlertSuccess = document.getElementById("updateAlertSuccess");
const updateAlertError = document.getElementById("updateAlertError");
const updateLoadingSpinner = document.getElementById("updateLoadingSpinner");

// Close Update Modal
closeUpdateModalBtn.addEventListener("click", function() {
    updateModal.style.display = "none";
    resetUpdateForm();
});

// Close Update Modal with Cancel button
updateCancelBtn.addEventListener("click", function() {
    updateModal.style.display = "none";
    resetUpdateForm();
});

// Close Update Modal when clicking outside
window.addEventListener("click", function(event) {
    if (event.target === updateModal) {
        updateModal.style.display = "none";
        resetUpdateForm();
    }
});

// Update Image Preview
updateImageInput.addEventListener("change", function() {
    updateImagePreview.innerHTML = "";
    if (this.files) {
        const maxFiles = 5;
        if (this.files.length > maxFiles) {
            alert(`Please select up to ${maxFiles} images only.`);
            this.value = "";
            return;
        }

        for (let i = 0; i < this.files.length; i++) {
            const file = this.files[i];
            if (!file.type.match('image.*')) {
                continue;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement("img");
                img.classList.add("image-preview");
                img.src = e.target.result;
                updateImagePreview.appendChild(img);
            }
            reader.readAsDataURL(file);
        }
    }
});

// Edit Place Function - Improved
function editPlace(id, name, description, location, latitude, longitude, image) {
    // Set values in the update form
    document.getElementById('updatePlaceId').value = id;
    document.getElementById('updatePlaceName').value = name;
    document.getElementById('updatePlaceDescription').value = description;
    document.getElementById('updatePlaceLocation').value = location;
    document.getElementById('updatePlaceLatitude').value = latitude;
    document.getElementById('updatePlaceLongitude').value = longitude;

    // Display current images
    const currentImagesContainer = document.getElementById('currentImagesContainer');
    currentImagesContainer.innerHTML = '';

    // If image is a string, convert it to array
    let images = [];
    if (image && typeof image === 'string') {
        try {
            // Check if it's a JSON string
            images = JSON.parse(image);
        } catch (e) {
            // If not JSON, treat as single image
            images = [image];
        }
    } else if (Array.isArray(image)) {
        images = image;
    }

    // Display each image
    images.forEach(imgPath => {
        if (imgPath) {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'image-container';

            const img = document.createElement('img');
            img.className = 'image-preview';
            img.src = `http://localhost:8080/${imgPath}`;
            img.alt = 'Place Image';

            imgContainer.appendChild(img);
            currentImagesContainer.appendChild(imgContainer);
        }
    });

    // Reset and hide alerts
    updateAlertSuccess.style.display = "none";
    updateAlertError.style.display = "none";
    updateImagePreview.innerHTML = "";

    // Show modal
    updateModal.style.display = "block";
}

// Form Submission for Update
updatePlaceForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Hide alerts
    updateAlertSuccess.style.display = "none";
    updateAlertError.style.display = "none";

    // Show loading spinner
    updateLoadingSpinner.style.display = "block";

    // Get form data
    const id = document.getElementById('updatePlaceId').value;
    const name = document.getElementById('updatePlaceName').value;
    const description = document.getElementById('updatePlaceDescription').value;
    const location = document.getElementById('updatePlaceLocation').value;
    const latitude = document.getElementById('updatePlaceLatitude').value;
    const longitude = document.getElementById('updatePlaceLongitude').value;

    // Check if new images were uploaded
    const imageFiles = document.getElementById('updatePlaceImages').files;

    if (imageFiles.length > 0) {
        // If new images, use multipart/form-data approach (similar to save method)
        const formData = new FormData();
        formData.append('id', id);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('location', location);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);

        for (let i = 0; i < imageFiles.length; i++) {
            formData.append('imageFiles', imageFiles[i]);
        }

        // Send API request with FormData
        fetch('http://localhost:8080/api/v1/place/updateWithImages', {
            method: 'PUT',
            body: formData
        })
            .then(response => response.json())
            .then(data => handleUpdateResponse(data))
            .catch(error => handleUpdateError(error));
    } else {
        // If no new images, use JSON approach
        const placeData = {
            id: id,
            name: name,
            description: description,
            location: location,
            latitude: latitude,
            longitude: longitude
        };

        // Send API request with JSON
        fetch('http://localhost:8080/api/v1/place/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(placeData)
        })
            .then(response => response.json())
            .then(data => handleUpdateResponse(data))
            .catch(error => handleUpdateError(error));
    }
});

// Handle update response
function handleUpdateResponse(data) {
    updateLoadingSpinner.style.display = "none";

    if (data.code === 200) {
        // Success
        updateAlertSuccess.style.display = "block";

        // Refresh table data
        fetchData();

        // Close modal after 1 second
        setTimeout(() => {
            updateModal.style.display = "none";
            updateAlertSuccess.style.display = "none";
            resetUpdateForm();
        }, 1000);
    } else {
        // Error
        updateAlertError.innerText = data.message || "Error updating place. Please try again.";
        updateAlertError.style.display = "block";
    }
}

// Handle update error
function handleUpdateError(error) {
    updateLoadingSpinner.style.display = "none";
    updateAlertError.innerText = "Network error. Please try again.";
    updateAlertError.style.display = "block";
    console.error('Error:', error);
}

// Reset Update Form
function resetUpdateForm() {
    updatePlaceForm.reset();
    document.getElementById('currentImagesContainer').innerHTML = "";
    updateImagePreview.innerHTML = "";
}

const deletePlace = (id) => {
    if (confirm("Are you sure you want to delete this place?")) {
        // Show loading spinner (you could add a spinner to the table row)

        // Send delete request to API
        $.ajax({
            url: `http://localhost:8080/api/v1/place/delete?placeID=${id}`,
            type: "DELETE",
            success: (res) => {
                if (res && res.code === 200) {
                    // Show success message
                    alert("Place deleted successfully");

                    // Refresh the table
                    fetchData();
                } else {
                    // Show error message
                    alert("Error deleting place: " + (res.message || "Unknown error"));
                }
            },
            error: (err) => {
                console.error("Error deleting place:", err);
                alert("Error deleting place. Please try again.");
            }
        });
    }
}


