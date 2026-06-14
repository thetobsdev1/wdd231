import { initTheme, initNav, initFooter } from "./app.js";

initTheme();
initNav();
initFooter();

const params = new URLSearchParams(window.location.search);
const fields = [
    ["outFirst", "first"],
    ["outLast", "last"],
    ["outEmail", "email"],
    ["outPhone", "phone"],
    ["outSubject", "subject"],
    ["outMessage", "message"]
];

fields.forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = params.get(key) || "—";
});

const timestamp = document.getElementById("outTimestamp");
if (timestamp) {
    timestamp.textContent = new Date().toLocaleString();
}
