const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("primary-nav");

function setMenuOpen(open) {
    if (!toggle || !nav) return;

    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    toggle.setAttribute(
        "aria-label",
        open ? "Close navigation menu" : "Open navigation menu"
    );
}

if (toggle && nav) {
    toggle.addEventListener("click", () => {
        const open = toggle.getAttribute("aria-expanded") === "true";
        setMenuOpen(!open);
    });

    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setMenuOpen(false));
    });
}
