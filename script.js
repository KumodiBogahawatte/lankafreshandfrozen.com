document.getElementById("year").textContent = new Date().getFullYear();

const menuButton = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.textContent = open ? "×" : "☰";
});
nav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  }),
);

const enquiryForm = document.getElementById("enquiryForm");

enquiryForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const submitButton = form.querySelector('button[type="submit"]');
  const formStatus = document.getElementById("formStatus");

  const formData = new FormData(form);

  const data = {
    name: formData.get("name"),
    company: formData.get("company"),
    email: formData.get("email"),
    message: formData.get("message"),
    website: formData.get("website"),
  };

  submitButton.disabled = true;
  form.setAttribute("aria-busy", "true");
  formStatus.textContent = "Sending your enquiry…";

  try {
    const response = await fetch("/api/enquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Submission failed.");
    }

    form.reset();
    formStatus.textContent = "Your enquiry was sent successfully.";

    window.alert("Thank you! Your enquiry was sent successfully.");
  } catch (error) {
    console.error("Unable to send enquiry:", error);

    formStatus.textContent =
      "We couldn't send your enquiry. Please try again or email info@lankafreshandfrozen.com directly.";
  } finally {
    submitButton.disabled = false;
    form.removeAttribute("aria-busy");
  }
});
