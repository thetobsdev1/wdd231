import {
    initTheme,
    initNav,
    initFooter,
    fetchProjects,
    createProjectCard
} from "./app.js";

initTheme();
initNav();
initFooter();

const featuredGrid = document.getElementById("featuredProjects");
const statsEl = document.getElementById("projectStats");

async function loadFeatured() {
    try {
        const projects = await fetchProjects();
        const featured = projects
            .filter((p) => p.category === "Course Project" || p.category === "Portfolio")
            .slice(0, 3);

        featuredGrid.innerHTML = featured
            .map((p) => createProjectCard(p, { showDetailsButton: false }))
            .join("");

        const categories = new Set(projects.map((p) => p.category));
        statsEl.textContent = `${projects.length} projects across ${categories.size} categories`;
    } catch {
        featuredGrid.innerHTML = `<p class="error-msg">Unable to load featured projects. Please try again later.</p>`;
        statsEl.textContent = "";
    }
}

loadFeatured();
