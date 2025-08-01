/*
  File: js/main.js
  Project: The Vintage Modernist
  Description: Handles all global site interactivity with a robust, 
  race-condition-free initialization sequence.
  Date: 2025-07-31T13:06:00.000Z
*/
// --- 1. CORE LOADER FUNCTION ---
import { loadComponent } from './assets/loader.js';
import { initializeMobileMenu, setActiveNavLink } from './assets/ui.js';
import { getDeviceType } from './assets/get_device_type.js';
import { openMapsForDevice } from './assets/maps.js';
window.openMapsForDevice = openMapsForDevice;

// --- 3. INITIALIZE THE SITE ---
// Runs once the entire HTML page is ready.
document.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
  // Promise.all allows us to load the header and footer concurrently for better performance.
  // The script will wait here until BOTH are finished loading before proceeding.
  await Promise.all([
    loadComponent("header-placeholder", "./assets/sections/header.html"),
    loadComponent("footer-placeholder", "./assets/sections/footer.html"),
  ])

  // Once the header and footer are guaranteed to be on the page,
  // we can safely initialize the components that depend on them.
  initializeMobileMenu();
  setActiveNavLink();
  const userDevice = getDeviceType();
  console.log('Detected Device:', userDevice);
}

