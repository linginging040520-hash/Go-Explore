// 1. Dynamic Destinations Data
const attractions = [
  {
    name: "Kuching Waterfront",
    category: "City & Heritage",
    location: "Kuching",
    description: "A scenic esplanade along the Sarawak River perfect for evening walks.",
    rating: 4.5
  },
  {
    name: "Gunung Mulu National Park",
    category: "Nature & National Parks",
    location: "Mulu",
    description: "Explore world-famous caves and ancient limestone pinnacles.",
    rating: 4.8
  },
  {
    name: "Mount Santubong",
    category: "Nature & National Parks",
    location: "Santubong",
    description: "A legendary peak offering jungle trails and scenic coastal views.",
    rating: 4.6
  },
  {
    name: "Damai Beach",
    category: "Beaches & Coastal Areas",
    location: "Santubong",
    description: "Relax beach vibe 🏖️",
    rating: 4.2
  },
  {
    name: "Fairy Cave",
    category: "Caves & Adventure",
    location: "Bau",
    description: "Breathtaking stalactite formations and mystical cavern entrances.",
    rating: 4.3
  },
  {
    name: "Borneo Cultures Museum",
    category: "Culture & Museums",
    location: "Kuching",
    description: "One of the largest and most modern museums in Southeast Asia.",
    rating: 4.7
  },
  {
    name: "Tanjung Datu National Park",
    category: "Beaches & Coastal Areas",
    location: "Lundu",
    description: "Pristine remote beaches where jungle meets the sea.",
    rating: 4.6
  }

];

// 2. Hero Image Slideshow
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

// 3. Render Cards
function loadDestinations(list = attractions) {
  const grid = document.getElementById('destination-grid');
  if (!grid) return;

  grid.innerHTML = "";

  list.forEach(item => {
    grid.innerHTML += `
      <div class="card">
        <div class="card-content">
          <h2>${item.name}</h2>
          <p style="color:#2d5a27;font-weight:600">${item.location}</p>
          <p>${item.description}</p>
          <p>⭐ ${item.rating}</p>
          <button class="tag-btn" onclick="savePlace('${item.name}')">
            ❤️ Save
          </button>
        </div>
      </div>
    `;
  });
}

// 4. Search System
function filterDestinations() {
  const input = document.getElementById('searchInput');
  if (!input) return;

  const keyword = input.value.toLowerCase();
  const filtered = attractions.filter(item =>
    item.name.toLowerCase().includes(keyword)
  );

  loadDestinations(filtered);
  saveSearchHistory(input.value);
}

// 5. Search History
let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

function saveSearchHistory(keyword) {
  if (!keyword.trim()) return;

  if (!searchHistory.includes(keyword)) {
    searchHistory.push(keyword);
  }

  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

// 6. Saved Places
let savedPlaces = JSON.parse(localStorage.getItem("savedPlaces")) || [];

function savePlace(place) {
  if (!savedPlaces.includes(place)) {
    savedPlaces.push(place);
  }

  localStorage.setItem("savedPlaces", JSON.stringify(savedPlaces));

  alert("Saved ❤️");
}

// 7. Dashboard Update
function updateDashboard() {
  const savedList = document.getElementById("saved-locations-list");
  const searchList = document.getElementById("search-history-list");
  const bookingList = document.getElementById("booking-history-list");

  if (savedList) {
    savedList.innerHTML = savedPlaces.length
      ? savedPlaces.map(p => `<li>📍 ${p}</li>`).join("")
      : "<li>No saved places yet</li>";
  }

  if (searchList) {
    searchList.innerHTML = searchHistory.length
      ? searchHistory.map(s => `<li>🔍 ${s}</li>`).join("")
      : "<li>No searches yet</li>";
  }

  if (bookingList) {
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    bookingList.innerHTML = bookings.length
      ? bookings.map(b =>
          `<li>🎫 ${b.place} - ${b.date} (${b.tickets})</li>`
        ).join("")
      : "<li>No bookings yet</li>";
  }
}

// 8. Initial Load
loadDestinations();
