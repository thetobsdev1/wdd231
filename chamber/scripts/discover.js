import attractions from "../data/attractions.mjs";

const grid = document.getElementById("discoverGrid");
const visitMessage = document.getElementById("visitMessage");
const LAST_VISIT_KEY = "discoverLastVisit";

function showVisitMessage() {
    const now = Date.now();
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
    let message = "";

    if (!lastVisit) {
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const elapsed = now - Number(lastVisit);
        const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));

        if (days < 1) {
            message = "Back so soon! Awesome!";
        } else if (days === 1) {
            message = "You last visited 1 day ago.";
        } else {
            message = `You last visited ${days} days ago.`;
        }
    }

    visitMessage.textContent = message;
    localStorage.setItem(LAST_VISIT_KEY, String(now));
}

function renderCards() {
    attractions.forEach((item, index) => {
        const cardNumber = index + 1;
        const article = document.createElement("article");
        article.className = `discover-card card${cardNumber} glass`;

        article.innerHTML = `
            <h2>${item.name}</h2>
            <figure>
                <img src="images/${item.image}" alt="${item.name}" width="300" height="200" loading="lazy">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button type="button" class="learn-more" data-url="${item.url}">Learn More</button>
        `;

        grid.appendChild(article);
    });
}

grid.addEventListener("click", (event) => {
    const button = event.target.closest(".learn-more");
    if (!button) return;

    const url = button.dataset.url;
    if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
    }
});

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

showVisitMessage();
renderCards();
