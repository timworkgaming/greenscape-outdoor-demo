document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // Automatic footer year
  const year = document.getElementById("currentYear");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Mobile navigation
  const menuToggle = document.getElementById("menuToggle");
  const primaryNav = document.getElementById("primaryNav");

  if (menuToggle && primaryNav) {
    function closeMenu() {
      menuToggle.classList.remove("active");
      primaryNav.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    }

    menuToggle.addEventListener("click", function () {
      const isOpen = !primaryNav.classList.contains("active");

      menuToggle.classList.toggle("active", isOpen);
      primaryNav.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    primaryNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", function (event) {
      if (
        !primaryNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });
  }

  // Back to top
  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    function updateBackToTop() {
      backToTop.classList.toggle("show", window.scrollY > 400);
    }

    updateBackToTop();

    window.addEventListener("scroll", updateBackToTop, {
      passive: true
    });

    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Demo form: does not send or collect visitor information
  const quoteForm = document.getElementById("quoteForm");
  const formStatus = document.getElementById("formStatus");

  if (quoteForm) {
    quoteForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (formStatus) {
        formStatus.textContent =
          "Demo preview only — this form is not connected. No information has been sent.";

        formStatus.setAttribute("role", "status");
        formStatus.setAttribute("aria-live", "polite");
      }
    });
  }

  // FAQ accessibility
  document.querySelectorAll(".faq-list details").forEach(function (item) {
    item.addEventListener("toggle", function () {
      const summary = item.querySelector("summary");

      if (summary) {
        summary.setAttribute(
          "aria-expanded",
          String(item.open)
        );
      }
    });
  });
});