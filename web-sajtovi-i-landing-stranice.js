const siteHeader = document.getElementById("siteHeader");
const scrollProgressBar = document.getElementById("scrollProgressBar");
const scrollTopBtn = document.getElementById("scrollTopBtn");
const navToggle = document.getElementById("navToggle");
const navMobile = document.getElementById("navMobile");

// Hero elementi za animacije
const heroSection = document.querySelector(".hero");
const heroImage = document.querySelector(".hero-image img");

// Scroll handler (header, progress, back to top)
function handleScroll() {
  const scrollY = window.scrollY || window.pageYOffset;

  // header background / shadow
  if (scrollY > 20) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }

  // progress bar
  const docHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
  if (scrollProgressBar) {
    scrollProgressBar.style.width = progress + "%";
  }

  // back to top visibility
  if (scrollY > 320) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
}

window.addEventListener("scroll", handleScroll);
handleScroll(); // initial

// Mobile menu toggle
if (navToggle && navMobile) {
  navToggle.addEventListener("click", () => {
    navMobile.classList.toggle("open");
  });

  // Close menu when clicking a link
  navMobile.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navMobile.classList.remove("open"));
  });
}

// Back to top
if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Smooth scroll for on-page anchors
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const rect = target.getBoundingClientRect();
    const offset = rect.top + window.pageYOffset - 80; // header height
    window.scrollTo({ top: offset, behavior: "smooth" });
  });
});

// Year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Scroll reveal animation
(function () {
  const revealSelectors = [".hero-content", ".section", ".cta-wrap"];

  const targets = document.querySelectorAll(revealSelectors.join(","));
  if (!targets.length) return;

  // inicijalno dodamo .reveal na sve ciljeve
  targets.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target); // jednom i gotovo
        }
      });
    },
    { threshold: 0.18 }
  );

  targets.forEach((el) => observer.observe(el));
})();

// Hero image – suptilan tilt / parallax na miša (samo za desktop miševe)
if (
  heroSection &&
  heroImage &&
  window.matchMedia("(pointer: fine)").matches
) {
  heroSection.addEventListener("mousemove", (e) => {
    const rect = heroSection.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 do 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    const moveX = relX * 14; // px
    const moveY = relY * 10;

    heroImage.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(1.03)`;
  });

  heroSection.addEventListener("mouseleave", () => {
    heroImage.style.transform = "translate3d(0, 0, 0) scale(1.02)";
  });
}


