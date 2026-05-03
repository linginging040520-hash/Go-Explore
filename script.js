// 1. Hero Image Slideshow
const hero = document.querySelector('.hero');
// You can change the image links here if you want other backgrounds
const images = [
    'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2'
];

let currentIndex = 0;

function changeBackground() {
    // Check if the hero element exists on the page to prevent errors
    if (hero) {
        const gradient = 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), ';
        hero.style.backgroundImage = gradient + `url('${images[currentIndex]}')`;
        hero.style.backgroundSize = 'cover';
        hero.style.backgroundPosition = 'center';
        
        currentIndex = (currentIndex + 1) % images.length;
    }
}

// Run slideshow if the hero exists
if (hero) {
    changeBackground();
    setInterval(changeBackground, 4000);
}

// 2. Dynamic Destinations Data
const attractions = [
    { name: "Gunung Mulu National Park", category: "Nature & National Parks", description: "Explore world-famous caves and ancient limestone pinnacles." },
    { name: "Mount Santubong", category: "Nature & National Parks", description: "A legendary peak offering jungle trails and scenic coastal views." },
    { name: "Tanjung Datu National Park", category: "Beaches & Coastal Areas", description: "Discover pristine, remote beaches where the jungle meets the sea." },
    { name: "Fairy Cave", category: "Caves & Adventure", description: "Breathtaking stalactite formations and mystical cavern entrances." },
    { name: "Borneo Cultures Museum", category: "Culture & Museums", description: "One of the largest and most modern museums in Southeast Asia." },
    { name: "Kuching Waterfront", category: "City & Heritage", description: "A scenic esplanade along the Sarawak River perfect for evening walks." }
];

function loadDestinations() {
    const grid = document.getElementById('destination-grid');
    if (grid) {
        grid.innerHTML = '';

        attractions.forEach((item) => {
            const cardHTML = `
                <div class="card">
                    <div class="card-content">
                        <h2>${item.name}</h2>
                        <p style="color: #2d5a27; font-weight: 600;">${item.category}</p>
                        <p>${item.description}</p>
                        <button class="tag-btn" onclick="saveLocation('${item.name}')">⭐ Save to Map</button>
                        <a href="#booking" class="btn-view" style="margin-left: 5px;">Book Ticket</a>
                    </div>
                </div>
            `;
            grid.innerHTML += cardHTML;
        });
    }
}

// 3. Search and Search History Functionality
// searchHistory is declared here so it can be accessed by both scripts
let searchHistory = []; 

function filterDestinations() {
    const searchInput = document.getElementById('searchInput');
    const input = searchInput.value;
    const lowerInput = input.toLowerCase();

    // Track search history when user types
    if (input.trim() !== "" && !searchHistory.includes(input)) {
        searchHistory.push(input);
    }

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const title = card.querySelector('h2').innerText.toLowerCase();
        card.style.display = title.includes(lowerInput) ? 'block' : 'none';
    });

    // Update dashboard search history
    if (typeof updateDashboard === 'function') {
        updateDashboard();
    }
}

// Initialize the destinations
loadDestinations();