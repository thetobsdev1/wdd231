const STORAGE_KEY = "chamber-theme";
const toggle = document.getElementById("themeToggle");

function applyTheme(theme) {
    const isLight = theme === "light";

    if (isLight) {
        document.documentElement.setAttribute("data-theme", "light");
    } else {
        document.documentElement.removeAttribute("data-theme");
    }

    if (toggle) {
        toggle.setAttribute(
            "aria-label",
            isLight ? "Switch to dark mode" : "Switch to light mode"
        );
        toggle.setAttribute("title", isLight ? "Dark mode" : "Light mode");
    }
}

function initTheme() {
    applyTheme(localStorage.getItem(STORAGE_KEY) || "dark");
}

if (toggle) {
    toggle.addEventListener("click", () => {
        const isLight = document.documentElement.getAttribute("data-theme") === "light";
        const next = isLight ? "dark" : "light";
        localStorage.setItem(STORAGE_KEY, next);
        applyTheme(next);
    });
}

initTheme();
