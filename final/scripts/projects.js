import {
    STORAGE_KEYS,
    initTheme,
    initNav,
    initFooter,
    fetchProjects,
    getCategories,
    filterByCategory,
    createProjectCard,
    initModal
} from "./app.js";

initTheme();
initNav();
initFooter();

const grid = document.getElementById("projectGrid");
const filters = document.getElementById("categoryFilters");
const countEl = document.getElementById("projectCount");
const modal = initModal();

let allProjects = [];

function render(projects) {
    countEl.textContent = `Showing ${projects.length} project${projects.length === 1 ? "" : "s"}`;

    if (projects.length === 0) {
        grid.innerHTML = `<p class="error-msg">No projects match this category.</p>`;
        return;
    }

    grid.innerHTML = projects.map((p) => createProjectCard(p)).join("");

    grid.querySelectorAll(".details-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = Number(btn.dataset.id);
            const project = allProjects.find((p) => p.id === id);
            if (project && modal) modal.open(project);
        });
    });
}

function buildFilters(categories) {
    const saved = localStorage.getItem(STORAGE_KEYS.category) || "All";

    filters.innerHTML = categories
        .map(
            (cat) => `
            <button type="button" class="${cat === saved ? "active" : ""}" data-category="${cat}">
                ${cat}
            </button>
        `
        )
        .join("");

    filters.querySelectorAll("button").forEach((btn) => {
        btn.addEventListener("click", () => {
            const category = btn.dataset.category;
            localStorage.setItem(STORAGE_KEYS.category, category);
            filters.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            render(filterByCategory(allProjects, category));
        });
    });
}

async function loadProjects() {
    try {
        allProjects = await fetchProjects();
        const categories = getCategories(allProjects);
        buildFilters(categories);

        const saved = localStorage.getItem(STORAGE_KEYS.category) || "All";
        render(filterByCategory(allProjects, saved));
    } catch {
        grid.innerHTML = `<p class="error-msg">Unable to load projects. Please refresh the page.</p>`;
        countEl.textContent = "";
    }
}

loadProjects();
