const FORMSPREE_ENDPOINT = "https://formspree.io/f/myeeovlq";
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

enquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const submitButton = form.querySelector('button[type="submit"]');
  const formStatus = document.getElementById("formStatus");
  const data = new FormData(form);
  data.append("_subject", "Website enquiry - Lanka Fresh");

  submitButton.disabled = true;
  form.setAttribute("aria-busy", "true");
  formStatus.textContent = "Sending your enquiry…";

  fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    body: data,
    headers: { Accept: "application/json" },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Form submission failed with status ${response.status}`);
      }

      form.reset();
      formStatus.textContent = "Your enquiry was sent successfully.";
      window.alert("Thank you! Your enquiry was sent successfully.");
    })
    .catch((error) => {
      console.error("Unable to send enquiry:", error);
      formStatus.textContent =
        "We couldn't send your enquiry. Please try again or email info@lankafreshandfrozen.com directly.";
    })
    .finally(() => {
      submitButton.disabled = false;
      form.removeAttribute("aria-busy");
    });
});
