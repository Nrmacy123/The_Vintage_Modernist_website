/* File: js/assets/contact.js
 * Project: The Vintage Modernist
 * Description: Handles contact form submission by sending data to a Cloudflare Worker.
 */
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  // --- This function was missing, added for "Get Directions" button ---
  window.openMapsForDevice = function (address) {
    const encodedAddress = encodeURIComponent(address);
    // Detect if the user is on a mobile device
    if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      // Mobile: Open in native maps app
      window.open(`maps:?q=${encodedAddress}`);
    } else {
      // Desktop: Open in Google Maps in a new tab
      window.open(`https://www.google.com/maps?q=${encodedAddress}`, '_blank');
    }
  };

  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    // --- Start: Update Form Status ---
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    formStatus.textContent = '';
    formStatus.className = 'form-status';
    // --- End: Update Form Status ---

    try {
      // --- This is the new part that sends data to your Worker ---
      const response = await fetch(
        'https://your-worker-name.your-account.workers.dev', // <-- PASTE YOUR WORKER URL HERE
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
      // --- End of new part ---

      formStatus.textContent = 'Thank you! Your message has been sent.';
      formStatus.classList.add('success');
      contactForm.reset();
    } catch (error) {
      console.error('Form submission error:', error);
      formStatus.textContent = 'Sorry, something went wrong. Please try again.';
      formStatus.classList.add('error');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    }
  });
});