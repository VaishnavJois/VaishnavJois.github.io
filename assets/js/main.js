document.addEventListener("DOMContentLoaded", function () {
  const modeToggle = document.getElementById("mode-toggle");
  const body = document.body;

  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "light") {
    body.classList.remove("dark-mode");
    modeToggle.setAttribute("aria-checked", "false");
  } else if (!savedTheme && !prefersDark) {
    body.classList.remove("dark-mode");
    modeToggle.setAttribute("aria-checked", "false");
  }

  modeToggle.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark-mode");
    modeToggle.setAttribute("aria-checked", String(isDark));
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", () => {
    body.classList.toggle("nav-open");
    navMenu.classList.toggle("active");
  });

  document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
      if (body.classList.contains("nav-open")) {
        body.classList.remove("nav-open");
        navMenu.classList.remove("active");
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });
});
