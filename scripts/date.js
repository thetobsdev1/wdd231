// scripts/date.js

const year =
    document.querySelector("#year");

const lastModified =
    document.querySelector("#lastModified");

year.textContent =
    new Date().getFullYear();

lastModified.textContent =
    `Last Modified: ${document.lastModified}`;