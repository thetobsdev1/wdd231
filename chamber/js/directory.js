// ===== SELECT ELEMENTS =====
const url = "data/members.json";
const cards = document.querySelector("#cards");
const loader = document.querySelector("#loader");
const searchInput = document.querySelector("#search");

let membersData = [];

// ===== FETCH DATA =====
async function getMembers() {
    try {
        loader.style.display = "block";

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();

        membersData = data;
        displayMembers(membersData);

        loader.style.display = "none";

    } catch (error) {
        console.error("Fetch error:", error);
        loader.style.display = "none";
        cards.innerHTML = "<p>⚠️ Failed to load members data.</p>";
    }
}

// ===== DISPLAY MEMBERS =====
function displayMembers(members) {
    cards.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("card");

        card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}">
      <div class="card-content">
        <h2>${member.name}</h2>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
      </div>
    `;

        // Membership styling
        if (member.membership === 3) {
            card.classList.add("gold");
        } else if (member.membership === 2) {
            card.classList.add("silver");
        } else {
            card.classList.add("member");
        }

        cards.appendChild(card);
    });
}

// ===== SEARCH FUNCTION =====
searchInput.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase();

    const filtered = membersData.filter(member =>
        member.name.toLowerCase().includes(searchValue)
    );

    displayMembers(filtered);
});

// ===== FILTER BUTTONS =====
document.querySelectorAll(".filters button").forEach(button => {
    button.addEventListener("click", () => {
        const level = button.dataset.filter;

        if (level === "all") {
            displayMembers(membersData);
        } else {
            const filtered = membersData.filter(member => member.membership == level);
            displayMembers(filtered);
        }
    });
});

// ===== DARK MODE =====
document.getElementById("darkModeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

// ===== MENU TOGGLE =====
document.getElementById("menuBtn").addEventListener("click", () => {
    document.getElementById("navMenu").classList.toggle("show");
});

// ===== GRID / LIST VIEW =====
document.getElementById("gridBtn").addEventListener("click", () => {
    cards.classList.add("grid");
    cards.classList.remove("list");
});

document.getElementById("listBtn").addEventListener("click", () => {
    cards.classList.add("list");
    cards.classList.remove("grid");
});

// ===== FOOTER DATES =====
document.getElementById("year").textContent =
    `© ${new Date().getFullYear()} Lagos Chamber`;

document.getElementById("lastModified").textContent =
    `Last Modified: ${document.lastModified}`;

// ===== INIT =====
getMembers();