const cards = document.getElementById("cards");
const search = document.getElementById("search");

let data = [];
let filter = "all";
let timeout;

/* ================= FETCH ================= */
async function load() {
    try {
        const res = await fetch("data/members.json");

        if (!res.ok) throw new Error("JSON not found");

        data = await res.json();

        console.log("Loaded data:", data); // DEBUG

        render();
        updateStats();

    } catch (err) {
        console.error("Error loading JSON:", err);
        cards.innerHTML = "<p style='color:red'>Failed to load data</p>";
    }
}

/* ================= STATS ================= */
function updateStats() {
    const gold = data.filter(m => m.membership == 3).length;
    const silver = data.filter(m => m.membership == 2).length;
    const member = data.filter(m => m.membership == 1).length;

    animateCount("goldCount", gold);
    animateCount("silverCount", silver);
    animateCount("memberCount", member);
    animateCount("allCount", data.length);
}

/* ================= COUNT ANIMATION ================= */
function animateCount(id, target) {
    let el = document.getElementById(id);
    let count = 0;

    let interval = setInterval(() => {
        if (count >= target) return clearInterval(interval);
        el.textContent = ++count;
    }, 40);
}

/* ================= RENDER ================= */
function render() {
    let filtered = [...data];

    if (filter !== "all") {
        filtered = filtered.filter(m => m.membership == filter);
    }

    const query = search.value.toLowerCase();
    if (query) {
        filtered = filtered.filter(m =>
            (m.name || "").toLowerCase().includes(query) ||
            (m.address || "").toLowerCase().includes(query) ||
            (m.industry || "").toLowerCase().includes(query)
        );
    }

    cards.innerHTML = "";

    filtered.forEach((m, i) => {
        const div = document.createElement("div");
        div.className = "card";
        div.style.animationDelay = `${i * 0.05}s`;

        const badge =
            m.membership == 3 ? "gold" :
                m.membership == 2 ? "silver" : "member";

        const label =
            m.membership == 3 ? "Gold Member" :
                m.membership == 2 ? "Silver Member" : "Member";

        div.innerHTML = `
            <img src="images/${m.image || 'tech.jpg'}" loading="lazy" alt="${m.name}" class="card-img">

            <div class="card-header">
                <h3>${m.name}</h3>
                <span class="badge ${badge}">${label}</span>
            </div>

            <p class="industry">🏷️ ${m.industry || ''}</p>
            <p class="desc">${m.description || ''}</p>

            <div class="meta">
                <p>📍 ${m.address || ''}</p>
                <p>📞 ${m.phone || ''}</p>
            </div>

            <a class="visit" href="${m.website || '#'}" target="_blank">Visit Website →</a>
        `;

        cards.appendChild(div);
    });
}

/* ================= SEARCH ================= */
search.addEventListener("input", () => {
    clearTimeout(timeout);
    timeout = setTimeout(render, 300);
});

/* ================= FILTER ================= */
document.querySelectorAll(".chip").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".chip").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        filter = btn.dataset.filter;
        render();
    });
});

/* ================= VIEW ================= */
document.getElementById("gridBtn").onclick = () => cards.className = "grid";
document.getElementById("listBtn").onclick = () => cards.className = "list";

/* ================= DARK MODE ================= */
document.getElementById("darkModeToggle").onclick = () => {
    document.body.classList.toggle("dark");
};

/* ================= FOOTER ================= */
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

/* ================= CANVAS BG ================= */
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];

for (let i = 0; i < 60; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();

        p.y += 0.3;
        if (p.y > canvas.height) p.y = 0;
    });

    requestAnimationFrame(draw);
}

draw();

/* ================= INIT ================= */
load();