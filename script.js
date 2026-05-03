const data = [
  {
    name: "Kuching Waterfront",
    location: "Kuching",
    description: "Nice river view",
    rating: 4.5
  },
  {
    name: "Mulu National Park",
    location: "Mulu",
    description: "Caves & rainforest",
    rating: 4.8
  }
];

// Data Injector
function renderCards(list) {
  const container = document.getElementById("cardContainer");
  container.innerHTML = "";

  list.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.location}</p>
      <p>${item.description}</p>
      <p>⭐ ${item.rating}</p>
    `;

    container.appendChild(card);
  });
}

// Search Filter
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {
  const keyword = this.value.toLowerCase();

  const filtered = data.filter(item =>
    item.name.toLowerCase().includes(keyword)
  );

  renderCards(filtered);
});

// Initial loading
renderCards(data);
