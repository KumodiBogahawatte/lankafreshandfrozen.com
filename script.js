const COMPANY_EMAIL = "info@lankafreshandfrozen.com";
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

document.getElementById("enquiryForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent("Website enquiry - Lanka Fresh");
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\nCompany: ${data.get("company") || "Not provided"}\nEmail: ${data.get("email")}\n\nMessage:\n${data.get("message")}`,
  );
  document.getElementById("formStatus").textContent =
    "Your email application should open with the enquiry prepared.";
  window.location.href = `mailto:${COMPANY_EMAIL}?subject=${subject}&body=${body}`;
});
