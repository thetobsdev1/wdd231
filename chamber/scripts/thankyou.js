function setFooterDates() {
    const yearEl = document.getElementById("year");
    const lastModifiedEl = document.getElementById("lastModified");

    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (lastModifiedEl) lastModifiedEl.textContent = document.lastModified;
}

function safeText(value) {
    if (!value) return "—";
    return value.toString();
}

function formatTimestamp(value) {
    if (!value) return "—";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function displaySubmittedInfo() {
    const params = new URLSearchParams(window.location.search);

    const first = params.get("first");
    const last = params.get("last");
    const email = params.get("email");
    const phone = params.get("phone");
    const business = params.get("business");
    const timestamp = params.get("timestamp");

    const outFirst = document.getElementById("outFirst");
    const outLast = document.getElementById("outLast");
    const outEmail = document.getElementById("outEmail");
    const outPhone = document.getElementById("outPhone");
    const outBusiness = document.getElementById("outBusiness");
    const outTimestamp = document.getElementById("outTimestamp");

    if (outFirst) outFirst.textContent = safeText(first);
    if (outLast) outLast.textContent = safeText(last);
    if (outEmail) outEmail.textContent = safeText(email);
    if (outPhone) outPhone.textContent = safeText(phone);
    if (outBusiness) outBusiness.textContent = safeText(business);
    if (outTimestamp) outTimestamp.textContent = formatTimestamp(timestamp);
}

setFooterDates();
displaySubmittedInfo();

