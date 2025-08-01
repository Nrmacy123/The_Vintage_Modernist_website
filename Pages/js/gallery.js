/* File: js/gallery.js (v2)
  Project: The Vintage Modernist
  Description: Fetches gallery data and populates the grid with skeleton loaders for improved UX.
*/
document.addEventListener("DOMContentLoaded", () => {
  const galleryGrid = document.getElementById("gallery-grid");
  const dataPath = "assets/data/gallery-data.json";

  if (!galleryGrid) return;

  const createGalleryCard = (item) => {
    const card = document.createElement("div");
    card.className = "gallery-card";
    card.innerHTML = `
            <div class="gallery-card__image-container">
                <img src="${item.imageUrl}" alt="${item.title}" class="gallery-card__image" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/600x400/eee/ccc?text=Image+Not+Found';">
            </div>
            <div class="gallery-card__content">
                <h3 class="gallery-card__title">${item.title}</h3>
                <p class="gallery-card__description">${item.description}</p>
            </div>
        `;
    return card;
  };

  const showSkeletons = (count = 6) => {
    galleryGrid.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const skeleton = document.createElement("div");
      skeleton.className = "gallery-card skeleton";
      skeleton.innerHTML = `
                <div class="gallery-card__image-container"></div>
                <div class="gallery-card__content">
                    <div class="skeleton-line title"></div>
                    <div class="skeleton-line"></div>
                    <div class="skeleton-line short"></div>
                </div>
            `;
      galleryGrid.appendChild(skeleton);
    }
  };

  const loadGallery = async () => {
    showSkeletons();
    try {
      // Simulate network delay for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await fetch(dataPath);
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const items = await response.json();

      galleryGrid.innerHTML = ""; // Clear skeletons

      if (items.length === 0) {
        galleryGrid.innerHTML =
          "<p>The collection is currently empty. Please check back soon!</p>";
        return;
      }

      items.forEach((item) => {
        const card = createGalleryCard(item);
        galleryGrid.appendChild(card);
      });
    } catch (error) {
      console.error("Could not load gallery data:", error);
      galleryGrid.innerHTML =
        '<p class="error-message">Sorry, we couldn\'t load the collection. Please try again later.</p>';
    }
  };

  loadGallery();
});
