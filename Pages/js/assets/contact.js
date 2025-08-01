/* File: js/assets/contact.js (New)
  Project: The Vintage Modernist
  Description: Handles contact form submission, provides user feedback, and resets the form.
*/
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (!contactForm) return;

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    formStatus.textContent = "";
    formStatus.className = "form-status";

    // In a real application, you would send this data to a serverless function
    // or a backend endpoint. Here, we'll simulate the process.
    console.log(
      "Form submitted. In a real app, this would be sent to a server."
    );

    // Simulate a network request
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // To simulate an error, uncomment the next line:
      // throw new Error("Simulated server error");

      formStatus.textContent = "Thank you! Your message has been sent.";
      formStatus.classList.add("success");
      contactForm.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      formStatus.textContent = "Sorry, something went wrong. Please try again.";
      formStatus.classList.add("error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";
    }
  });
});
