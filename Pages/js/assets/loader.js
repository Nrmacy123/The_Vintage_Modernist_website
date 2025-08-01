// File: js/assets/loader.js

/**
 * A reusable function to fetch HTML content and inject it into a specified placeholder element.
 * @param {string} placeholderId - The ID of the div to inject the HTML into.
 * @param {string} filePath - The path to the HTML file to fetch.
 */
export async function loadComponent(placeholderId, filePath) {
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