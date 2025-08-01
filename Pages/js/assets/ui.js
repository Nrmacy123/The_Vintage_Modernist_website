// File: js/assets/ui.js

/**
 * Initializes the mobile menu toggle functionality.
 */
export function initializeMobileMenu() {
  const menuToggle = document.querySelector(".header__menu-toggle");
  const nav = document.querySelector(".header__nav");

  if (!menuToggle || !nav) {
    console.error("Mobile menu elements not found. Check header.html.");
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
 * Adds the 'active' class to the navigation link matching the current page.
 */
export function setActiveNavLink() {
  const navLinks = document.querySelectorAll(".header__nav-link");
  if (navLinks.length === 0) {
    console.error("Navigation links not found. Check header.html.");
    return;
  }

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop() || "index.html";
    link.classList.toggle("active", linkPage === currentPage);
  });
}