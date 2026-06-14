export const STORAGE_KEYS = {
    theme: "thetobsdev-theme",
    category: "thetobsdev-category"
};

export function getStoredTheme() {
    return localStorage.getItem(STORAGE_KEYS.theme) || "light";
}

export function setStoredTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.theme, theme);
}

export function applyTheme(theme) {
    if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        document.documentElement.removeAttribute("data-theme");
    }

    const toggle = document.getElementById("themeToggle");
    if (toggle) {
        toggle.setAttribute(
            "aria-label",
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
        );
        toggle.textContent = theme === "dark" ? "☀️" : "🌙";
    }
}

export function initTheme() {
    applyTheme(getStoredTheme());

    const toggle = document.getElementById("themeToggle");
    if (!toggle) return;

    toggle.addEventListener("click", () => {
        const next = getStoredTheme() === "dark" ? "light" : "dark";
        setStoredTheme(next);
        applyTheme(next);
    });
}

export function initNav() {
    const toggle = document.getElementById("navToggle");
    const nav = document.getElementById("primary-nav");
    if (!toggle || !nav) return;

    const setOpen = (open) => {
        toggle.setAttribute("aria-expanded", String(open));
        nav.classList.toggle("is-open", open);
        toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    };

    toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setOpen(false));
    });
}

export function initFooter() {
    const year = document.getElementById("year");
    const modified = document.getElementById("lastModified");
    if (year) year.textContent = String(new Date().getFullYear());
    if (modified) modified.textContent = document.lastModified;
}

export async function fetchProjects() {
    try {
        const response = await fetch("data/projects.json");
        if (!response.ok) {
            throw new Error(`Failed to load projects (${response.status})`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
            throw new Error("Invalid project data format");
        }
        return data;
    } catch (error) {
        console.error("Project fetch error:", error);
        throw error;
    }
}

export function getCategories(projects) {
    return ["All", ...new Set(projects.map((p) => p.category))];
}

export function filterByCategory(projects, category) {
    if (!category || category === "All") return projects;
    return projects.filter((p) => p.category === category);
}

export function createProjectCard(project, options = {}) {
    const { showDetailsButton = true } = options;
    return `
        <article class="project-card" data-id="${project.id}">
            <img src="images/${project.image}" alt="${project.name}" width="400" height="225" loading="lazy">
            <div class="project-card-body">
                <h2>${project.name}</h2>
                <p class="project-meta">${project.category} · ${project.year}</p>
                <p>${project.description}</p>
                <p class="project-meta"><strong>Tech:</strong> ${project.technologies}</p>
                ${showDetailsButton ? `<button type="button" class="btn details-btn" data-id="${project.id}">View Details</button>` : ""}
            </div>
        </article>
    `;
}

export function initModal() {
    const overlay = document.getElementById("projectModal");
    const closeBtn = document.getElementById("modalClose");
    if (!overlay || !closeBtn) return null;

    const title = document.getElementById("modalTitle");
    const body = document.getElementById("modalBody");
    const image = document.getElementById("modalImage");
    let lastFocus = null;

    const close = () => {
        overlay.classList.remove("is-open");
        overlay.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        image.hidden = true;
        if (lastFocus) lastFocus.focus();
    };

    const open = (project) => {
        lastFocus = document.activeElement;
        title.textContent = project.name;
        image.src = `images/${project.image}`;
        image.alt = project.name;
        image.hidden = false;
        body.innerHTML = `
            <p><strong>Category:</strong> ${project.category}</p>
            <p><strong>Year:</strong> ${project.year}</p>
            <p><strong>Technologies:</strong> ${project.technologies}</p>
            <p>${project.description}</p>
            <p><a href="${project.url}" target="_blank" rel="noopener noreferrer">Visit Project →</a></p>
        `;
        overlay.classList.add("is-open");
        overlay.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        closeBtn.focus();
    };

    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && overlay.classList.contains("is-open")) close();
    });

    return { open, close };
}
