// Function to open the modal
function openModal() {
    const modal = document.getElementById('addHotelModal');
    modal.classList.add('show');
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('addHotelModal');
    modal.classList.remove('show');

    // Reset form
    document.getElementById('addHotelForm').reset();
    document.getElementById('fileName').textContent = 'No file chosen';
}

// Update file name when file is selected
document.getElementById('hotelImage').addEventListener('change', function() {
    const fileName = this.files[0] ? this.files[0].name : 'No file chosen';
    document.getElementById('fileName').textContent = fileName;
});

// Function to save hotel data
function saveHotel() {
    // Get form values
    const hotelName = document.getElementById('hotelName').value;
    const placeId = document.getElementById('placeId').value;
    const description = document.getElementById('hotelDescription').value;
    const location = document.getElementById('hotelLocation').value;
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    const status = document.getElementById('hotelStatus').value;
    const imageFile = document.getElementById('hotelImage').files[0];

    // Validate form
    if (!hotelName || !placeId || !description || !location || !latitude || !longitude || !imageFile) {
        alert('Please fill in all required fields');
        return;
    }

    // Create FormData object to handle file upload
    const formData = new FormData();
    formData.append('name', hotelName);
    formData.append('placeId', placeId);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('status', status);
    formData.append('image', imageFile);

    // Here you would typically send this data to your server using fetch or XMLHttpRequest

    // Example using fetch API (uncomment and modify as needed)
    /*
    fetch('your-api-endpoint/hotels', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        closeModal();
        // Refresh the hotel table
        fetchHotels();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error adding hotel. Please try again.');
    });
    */

    // For demo purposes, close the modal and alert
    alert('Hotel added successfully!');
    closeModal();
}

// Close modal if user clicks outside modal content
window.onclick = function(event) {
    const modal = document.getElementById('addHotelModal');
    if (event.target === modal) {
        closeModal();
    }
}


//Get All Data From Users
const fetchData = () => {
    console.log("place")
    $.ajax({
        url: "http://localhost:8080/api/v1/hotel/getAll",
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
            const hotelTableBody = $('#hotel_table-body');
            hotelTableBody.empty();

            // නිවැරදි for loop
            for (let i = 0; i < data.length; i++) {
                // username null වන අවස්ථා හඳුනාගැනීම
                const name = data[i].name || "N/A";

                let row = `
                <tr>
                    <td>${data[i].id}</td>
                    <td>${data[i].placeID.id}</td>
                    <td>${name}</td>
                    <td>${data[i].description}</td>
                    <td>${data[i].location}</td>
                    <td>${data[i].latitude}</td>
                    <td>${data[i].longitude}</td>
                    <td>${data[i].image}</td>
                    <td>
                        <button type="button" class="btn btn-info btn-update" onclick="editPlace(${data[i].id}, ${data[i].placeID.id},'${name}','${data[i].description}','${data[i].location}','${data[i].latitude}','${data[i].longitude}','${data[i].image}')">
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
                hotelTableBody.append(row);
            }
        },
        error: (err) => {
            console.error("Error fetching place data:", err);
        }
    })
}

fetchData(); // Function eka call karanna


// DOM Elements
const placeName = document.getElementById('place-name');
const placeLocation = document.getElementById('place-location');
const hotelsHeroSection = document.getElementById('hotelsHeroSection');
const loadingContainer = document.getElementById('loading-container');
const errorContainer = document.getElementById('error-container');
const errorMessage = document.getElementById('error-message');
const hotelsGrid = document.getElementById('hotels-grid');
const noHotelsMessage = document.getElementById('no-hotels');
const hotelsCount = document.getElementById('hotels-count');
const sortSelect = document.getElementById('sort-select');
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');

// Get placeId from URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const placeId = urlParams.get('placeId');

// Base URL for API requests - change this to match your backend
const BASE_URL = 'http://localhost:8080/api/v1/';

// Show/hide elements
function showElement(element) {
    element.classList.remove('hidden');
}

function hideElement(element) {
    element.classList.add('hidden');
}

// Display error
function showError(message) {
    console.error(message);
    errorMessage.textContent = message;
    hideElement(loadingContainer);
    showElement(errorContainer);
}

// Toggle mobile menu
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Load place and hotels data
async function loadPlaceAndHotels() {
    if (!placeId) {
        showError('No place selected. Please select a place to view hotels.');
        return;
    }

    try {
        // Show loading
        showElement(loadingContainer);
        hideElement(noHotelsMessage);
        hideElement(errorContainer);

        console.log('Loading place with ID:', placeId);

        // 1. Fetch all places first to find the selected place
        console.log('Fetching all places from:', `${BASE_URL}/place/getAll`);
        const placesResponse = await fetch(`${BASE_URL}/place/getAll`);

        if (!placesResponse.ok) {
            throw new Error(`Failed to fetch places. Status: ${placesResponse.status}`);
        }

        const placesData = await placesResponse.json();
        console.log('Places data received:', placesData);

        // Check if places data exists and has content
        if (!placesData || placesData.code !== 200 || !placesData.content) {
            throw new Error('Places not found or invalid response format');
        }

        // Find the selected place from all places
        const selectedPlace = placesData.content.find(place => place.placeID === placeId);
        console.log('Selected place:', selectedPlace);

        if (!selectedPlace) {
            throw new Error(`Place with ID ${placeId} not found`);
        }

        // Update hero section with place name and image
        placeName.textContent = selectedPlace.name;
        placeLocation.textContent = selectedPlace.location || 'Sri Lanka';

        if (selectedPlace.image && selectedPlace.image.length > 0) {
            hotelsHeroSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${selectedPlace.image[0]}')`;
        }

        // 2. Fetch all hotels
        console.log('Fetching hotels from:', `${BASE_URL}/hotel/getAll`);
        const hotelsResponse = await fetch(`${BASE_URL}/hotel/getAll`);

        if (!hotelsResponse.ok) {
            throw new Error(`Failed to fetch hotels. Status: ${hotelsResponse.status}`);
        }

        const hotelsData = await hotelsResponse.json();
        console.log('Hotels data received:', hotelsData);

        // Check if hotels data exists and has content
        if (!hotelsData || hotelsData.code !== 200 || !hotelsData.content) {
            throw new Error('Hotels not found or invalid response format');
        }

        // Filter hotels by placeId
        console.log('Filtering hotels with placeID:', placeId);
        const filteredHotels = hotelsData.content.filter(hotel => {
            console.log('Hotel:', hotel.name, 'PlaceID:', hotel.placeID);
            // Try different comparison methods (string/number)
            return hotel.placeID === placeId || hotel.placeID === Number(placeId) || String(hotel.placeID) === placeId;
        });

        console.log('Filtered hotels count:', filteredHotels.length);

        // Update hotel count
        hotelsCount.textContent = filteredHotels.length;

        // Display hotels or no-hotels message
        if (filteredHotels.length > 0) {
            // Sort hotels based on current selection
            sortHotels(filteredHotels);
        } else {
            showElement(noHotelsMessage);
        }

        // Hide loading
        hideElement(loadingContainer);

    } catch (error) {
        console.error('Error:', error);
        showError(error.message || 'Failed to load data');
    }
}

// Sort hotels based on selection
function sortHotels(hotels) {
    const sortBy = sortSelect.value;

    let sortedHotels = [...hotels];

    switch(sortBy) {
        case 'name':
            sortedHotels.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'price-low':
            // Note: Add price field to your hotel data or modify this
            sortedHotels.sort((a, b) => (a.price || 0) - (b.price || 0));
            break;
        case 'price-high':
            // Note: Add price field to your hotel data or modify this
            sortedHotels.sort((a, b) => (b.price || 0) - (a.price || 0));
            break;
        case 'rating':
            // Note: Add rating field to your hotel data or modify this
            sortedHotels.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
        default:
            // Default sort by name
            sortedHotels.sort((a, b) => a.name.localeCompare(b.name));
    }

    displayHotels(sortedHotels);
}

// Display hotels as cards
function displayHotels(hotels) {
    hotelsGrid.innerHTML = '';
    console.log('Displaying hotels:', hotels);

    hotels.forEach(hotel => {
        const hotelCard = document.createElement('div');
        hotelCard.className = 'hotel-card';

        // Default image if none available
        let imageHtml = '';
        if (hotel.image && hotel.image.length > 0) {
            // Check if image is a string or array
            const images = Array.isArray(hotel.image) ? hotel.image : [hotel.image];

            // If hotel has multiple images, add dots for navigation
            const dotsHtml = images.length > 1
                ? `<div class="image-dots">${Array(images.length).fill().map((_, i) =>
                    `<div class="image-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`).join('')}</div>`
                : '';

            imageHtml = `
                <div class="hotel-image">
                    <img src="${images[0]}" alt="${hotel.name}" onerror="this.src='./images/default-hotel.jpg'">
                    <div class="hotel-rating">
                        <i class="ri-star-fill"></i> ${(Math.random() * 2 + 3).toFixed(1)} <!-- Example rating -->
                    </div>
                    ${dotsHtml}
                </div>`;
        } else {
            imageHtml = `
                <div class="hotel-image">
                    <img src="./images/default-hotel.jpg" alt="${hotel.name}">
                    <div class="hotel-rating">
                        <i class="ri-star-fill"></i> ${(Math.random() * 2 + 3).toFixed(1)} <!-- Example rating -->
                    </div>
                </div>`;
        }

        // Truncate description if too long
        const description = hotel.description && hotel.description.length > 120
            ? `${hotel.description.substring(0, 120)}...`
            : hotel.description || 'Discover this amazing hotel with comfortable rooms and excellent service.';

        hotelCard.innerHTML = `
            ${imageHtml}
            <div class="hotel-content">
                <h3 class="hotel-name">${hotel.name}</h3>
                <div class="hotel-location">
                    <i class="ri-map-pin-line"></i>
                    <span>${hotel.location || 'Location not specified'}</span>
                </div>
                <p class="hotel-description">${description}</p>
                <div class="hotel-features">
                    <div class="hotel-feature">
                        <i class="ri-wifi-line"></i>
                        <span>Free WiFi</span>
                    </div>
                    <div class="hotel-feature">
                        <i class="ri-car-line"></i>
                        <span>Parking</span>
                    </div>
                    <div class="hotel-feature">
                        <i class="ri-restaurant-line"></i>
                        <span>Restaurant</span>
                    </div>
                </div>
                <a href="../view/hotelCard.html?hotelId=${hotel.id}" class="hotel-link">View Details</a>
            </div>
        `;

        hotelsGrid.appendChild(hotelCard);

        // Add image slider functionality if hotel has multiple images
        if (hotel.image && Array.isArray(hotel.image) && hotel.image.length > 1) {
            const dots = hotelCard.querySelectorAll('.image-dot');
            const img = hotelCard.querySelector('.hotel-image img');

            dots.forEach(dot => {
                dot.addEventListener('click', () => {
                    const index = parseInt(dot.dataset.index);

                    // Update image
                    img.src = hotel.image[index];

                    // Update active dot
                    dots.forEach(d => d.classList.remove('active'));
                    dot.classList.add('active');
                });
            });
        }
    });
}

// Sort hotels when sort selection changes
sortSelect.addEventListener('change', () => {
    loadPlaceAndHotels(); // Reload and resort hotels
});

// Initialize the page
function init() {
    // Load data
    loadPlaceAndHotels();
}

// Start when DOM is loaded
document.addEventListener('DOMContentLoaded', init);