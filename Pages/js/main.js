/*
  File: js/main.js (v4 - Corrected and Refactored)
  Project: The Vintage Modernist
  Description: Handles all global site interactivity with a robust, 
  race-condition-free initialization sequence.
  Date: 2025-07-31T13:06:00.000Z
*/

// --- 3. INITIALIZE THE SITE ---
// This is the single entry point. It runs once the entire HTML page is ready.
document.addEventListener("DOMContentLoaded", initializeApp);

/**
 * Main app initialization function. Orchestrates the loading of partials
 * and the initialization of interactive components.
 */
async function initializeApp() {
  // Promise.all allows us to load the header and footer concurrently for better performance.
  // The script will wait here until BOTH are finished loading before proceeding.
  await Promise.all([
    loadComponent("header-placeholder", "/pages/assets/sections/header.html"),
    loadComponent("footer-placeholder", "/pages/assets/sections/footer.html"),
  ]);

  // Once the header and footer are guaranteed to be on the page,
  // we can safely initialize the components that depend on them.
  initializeMobileMenu();
  setActiveNavLink();
}

// --- 1. CORE LOADER FUNCTION ---

/**
 * A reusable function to fetch HTML content and inject it into a specified placeholder element.
 * @param {string} placeholderId - The ID of the div to inject the HTML into.
 * @param {string} filePath - The path to the HTML file to fetch.
 */
async function loadComponent(placeholderId, filePath) {
  const placeholder = document.getElementById(placeholderId);
  if (!placeholder) {
    console.error(`Placeholder element with ID "${placeholderId}" not found!`);
    return;
  }
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${filePath}. Status: ${response.status}`
      );
    }
    placeholder.innerHTML = await response.text();
  } catch (error) {
    console.error(`Error loading component into "${placeholderId}":`, error);
    placeholder.innerHTML = `<p style="text-align:center; color:red;">Error: Could not load content from ${filePath}.</p>`;
  }
}

// --- 2. HELPER FUNCTIONS ---

/**
 * Finds the mobile menu toggle button and navigation menu (once they are loaded)
 * and attaches the click event listener to make them work.
 */
function initializeMobileMenu() {
  const menuToggle = document.querySelector(".header__menu-toggle");
  const nav = document.querySelector(".header__nav");

  if (!menuToggle || !nav) {
    console.error(
      "Mobile menu elements not found after load. Check header.html."
    );
    return;
  }

  menuToggle.addEventListener("click", () => {
    const isOpened = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !isOpened);
    nav.classList.toggle("active");
    document.body.style.overflow = nav.classList.contains("active")
      ? "hidden"
      : "";
  });
}

/**
 * Finds all navigation links and adds the 'active' class to the one
 * that matches the current page, highlighting it for the user.
 */
function setActiveNavLink() {
  const navLinks = document.querySelectorAll(".header__nav-link");
  if (navLinks.length === 0) {
    console.error("Navigation links not found after load. Check header.html.");
    return;
  }

  // Use 'index.html' as a fallback for the root path
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop() || "index.html";

    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
