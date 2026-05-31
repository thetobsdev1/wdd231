function initNav() {
    const toggle = document.getElementById("navToggle") || document.querySelector(".nav-toggle");
    const nav = document.getElementById("primary-nav");

    if (!toggle || !nav) return;

    function setMenuOpen(open) {
        toggle.setAttribute("aria-expanded", String(open));
        nav.classList.toggle("is-open", open);
        toggle.setAttribute(
            "aria-label",
            open ? "Close navigation menu" : "Open navigation menu"
        );
    }

    toggle.addEventListener("click", (event) => {
        event.stopPropagation();
        const open = toggle.getAttribute("aria-expanded") === "true";
        setMenuOpen(!open);
    });

    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setMenuOpen(false));
    });

    document.addEventListener("click", (event) => {
        if (!nav.classList.contains("is-open")) return;

        const target = event.target;
        if (target instanceof Node && !nav.contains(target) && !toggle.contains(target)) {
            setMenuOpen(false);
        }
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNav);
} else {
    initNav();
}
