document.addEventListener("DOMContentLoaded", () => {
  const enterButton = document.getElementById("enterButton");
  const landingPage = document.getElementById("landingPage");
  const header = document.querySelector("header");
  const sections = document.querySelectorAll("main section");
  const navButtons = document.querySelectorAll("nav button");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  /* ---------------- Enter portfolio ---------------- */
  enterButton.addEventListener("click", () => {
    landingPage.style.transition = "opacity 0.4s ease";
    landingPage.style.opacity = "0";
    setTimeout(() => {
      landingPage.style.display = "none";
      header.classList.remove("hidden");
      const about = document.getElementById("about");
      about.classList.remove("hidden");
      requestAnimationFrame(() => about.scrollIntoView({ behavior: "smooth" }));
    }, 380);
  });

  /* ---------------- Nav switching ---------------- */
  function showSection(targetId) {
    sections.forEach((section) => {
      if (section.id === targetId) {
        section.classList.remove("hidden");
        // retrigger animation
        section.style.animation = "none";
        void section.offsetWidth;
        section.style.animation = "";
      } else {
        section.classList.add("hidden");
      }
    });
    navButtons.forEach((b) => b.classList.toggle("active", b.dataset.section === targetId));
  }

  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.section;
      showSection(targetId);
      window.scrollTo({ top: 0, behavior: "smooth" });
      closeMenu();
    });
  });

  /* ---------------- Brand click -> about ---------------- */
  document.querySelector(".brand")?.addEventListener("click", (e) => {
    e.preventDefault();
    showSection("about");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------------- Mobile menu ---------------- */
  function closeMenu() {
    mainNav?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  /* ---------------- Close menu on outside click ---------------- */
  document.addEventListener("click", (e) => {
    if (!mainNav?.classList.contains("open")) return;
    if (mainNav.contains(e.target) || menuToggle.contains(e.target)) return;
    closeMenu();
  });
});