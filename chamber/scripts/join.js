function setFooterDates() {
    const yearEl = document.getElementById("year");
    const lastModifiedEl = document.getElementById("lastModified");

    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (lastModifiedEl) lastModifiedEl.textContent = document.lastModified;
}

function setTimestamp() {
    const timestamp = document.getElementById("timestamp");
    if (!timestamp) return;
    timestamp.value = new Date().toISOString();
}

function wireModals() {
    const links = document.querySelectorAll(".level-more[data-modal]");

    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            const modalId = link.getAttribute("data-modal");
            if (!modalId) return;

            const dialog = document.getElementById(modalId);
            if (!(dialog instanceof HTMLDialogElement)) return;

            dialog.showModal();
        });
    });

    const dialogs = document.querySelectorAll("dialog.membership-modal");
    dialogs.forEach((dialog) => {
        const closeBtn = dialog.querySelector(".modal-close");
        if (closeBtn) {
            closeBtn.addEventListener("click", () => dialog.close());
        }

        dialog.addEventListener("click", (e) => {
            if (e.target === dialog) dialog.close();
        });
    });
}

setFooterDates();
setTimestamp();
wireModals();

