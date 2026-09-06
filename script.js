const fallbackImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 520'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%230b203b'/%3E%3Cstop offset='1' stop-color='%233d88b9'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='900' height='520' fill='url(%23g)'/%3E%3Cpath d='M0 415 260 260l150 85 180-150 310 170v155H0z' fill='%23071629' fill-opacity='.38'/%3E%3Ctext x='450' y='250' fill='white' font-family='Arial,sans-serif' font-size='70' font-weight='700' text-anchor='middle'%3ESTV%3C/text%3E%3C/svg%3E";

document.querySelectorAll("img").forEach((image) => {
  image.addEventListener("error", () => {
    if (image.dataset.failed) return;
    image.dataset.failed = "true";
    image.classList.add("is-missing");
    image.src = fallbackImage;
  });
});

const header = document.querySelector("[data-header]");
const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 18);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
menuToggle?.addEventListener("click", () => {
  const open = navigation.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const quoteForm = document.querySelector("[data-quote-form]");
quoteForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const status = quoteForm.querySelector(".form-status");
  const company = new FormData(quoteForm).get("company");
  status.textContent = `Richiesta preparata per ${company || "la tua azienda"}. Per completarla contatta info@vanalistv.it o (+39) 035 23 74 43.`;
  status.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

const lightbox = document.querySelector("[data-lightbox-dialog]");
const lightboxTitle = document.querySelector("[data-lightbox-title]");
const closeLightbox = () => {
  if (lightbox?.open) lightbox.close();
  document.body.classList.remove("no-scroll");
};

document.querySelectorAll("[data-lightbox]").forEach((item) => {
  item.addEventListener("click", () => {
    if (!lightbox) return;
    lightboxTitle.textContent = item.dataset.lightbox || "Immagine STV";
    lightbox.showModal();
    document.body.classList.add("no-scroll");
  });
});

document.querySelector("[data-lightbox-close]")?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
lightbox?.addEventListener("close", () => document.body.classList.remove("no-scroll"));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});
