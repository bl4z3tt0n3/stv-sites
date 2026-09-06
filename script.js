const markImageFallback = (image) => {
  if (image.dataset.failed) return;
  image.dataset.failed = "true";
  image.classList.add("is-missing");
  image.closest("[data-image-frame]")?.classList.add("has-error");
  image.closest(".brand")?.classList.add("is-missing");
};

document.querySelectorAll("img").forEach((image) => {
  image.addEventListener("error", () => markImageFallback(image));
});

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

const closeNavigation = () => {
  navigation?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
};

menuToggle?.addEventListener("click", () => {
  const open = navigation?.classList.toggle("is-open") ?? false;
  menuToggle.setAttribute("aria-expanded", String(open));
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeNavigation);
});

const desktopMedia = window.matchMedia("(min-width: 761px)");
desktopMedia.addEventListener?.("change", closeNavigation);

const quoteForm = document.querySelector("[data-quote-form]");
const formStatus = document.querySelector("[data-form-status]");
const submitButton = document.querySelector("[data-submit-button]");
const submitLabel = document.querySelector("[data-submit-label]");

const setFormStatus = (message, state = "") => {
  if (!formStatus) return;
  formStatus.textContent = message;
  if (state) formStatus.dataset.state = state;
  else delete formStatus.dataset.state;
};

quoteForm?.addEventListener("input", () => {
  if (formStatus?.dataset.state === "success") setFormStatus("");
});

quoteForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!quoteForm.checkValidity()) {
    setFormStatus("Controlla i campi obbligatori e riprova.", "error");
    quoteForm.querySelector(":invalid")?.focus();
    return;
  }

  const company = new FormData(quoteForm).get("company") || "la tua azienda";
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.setAttribute("aria-busy", "true");
  }
  if (submitLabel) submitLabel.textContent = "Preparazione in corso";
  setFormStatus("Preparazione della richiesta...");

  window.setTimeout(() => {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.removeAttribute("aria-busy");
    }
    if (submitLabel) submitLabel.textContent = "Prepara la richiesta";
    setFormStatus(`Richiesta pronta per ${company}. Completa il contatto via info@vanalistv.it o (+39) 035 23 74 43.`, "success");
  }, 450);
});

const lightbox = document.querySelector("[data-lightbox-dialog]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxTitle = document.querySelector("[data-lightbox-title]");
const lightboxFrame = lightboxImage?.closest("[data-image-frame]");

const closeLightbox = () => {
  if (lightbox?.open) lightbox.close();
  else lightbox?.removeAttribute("open");
  document.body.classList.remove("no-scroll");
};

document.querySelectorAll("[data-lightbox]").forEach((item) => {
  item.addEventListener("click", () => {
    if (!lightbox || !lightboxImage || !lightboxTitle) return;
    const image = item.querySelector("img");
    if (image) {
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      delete lightboxImage.dataset.failed;
      lightboxImage.classList.remove("is-missing");
      lightboxFrame?.classList.remove("has-error");
    }
    lightboxTitle.textContent = item.dataset.lightbox || "Immagine STV";
    if (typeof lightbox.showModal === "function") lightbox.showModal();
    else lightbox.setAttribute("open", "true");
    document.body.classList.add("no-scroll");
  });
});

document.querySelector("[data-lightbox-close]")?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

lightbox?.addEventListener("close", () => document.body.classList.remove("no-scroll"));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNavigation();
    closeLightbox();
  }
});
