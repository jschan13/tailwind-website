// Initialize mobile menu (call this after header is injected)
function initMenu() {
  const menuBtn = document.querySelector("#menu-btn");
  const mobileMenu = document.querySelector("#mobile-menu");
  if (menuBtn && mobileMenu) {
    // Remove any duplicate listeners first (safe to call multiple times)
    menuBtn.replaceWith(menuBtn.cloneNode(true));
    const freshBtn = document.querySelector("#menu-btn");
    // set ARIA
    freshBtn.setAttribute('aria-expanded', 'false');
    freshBtn.addEventListener("click", (e) => {
      const isHidden = mobileMenu.classList.toggle("hidden");
      // toggle returns whether classList contains class AFTER toggle in some browsers — normalize
      const expanded = !mobileMenu.classList.contains('hidden');
      freshBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });

    // Close when clicking a link in the mobile menu
    mobileMenu.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (a) {
        mobileMenu.classList.add('hidden');
        freshBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close when clicking outside the menu
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !freshBtn.contains(e.target)) {
        if (!mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          freshBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });

    // Close the mobile menu when resizing to a large viewport (lg breakpoint)
    const LG_BREAKPOINT = 1024; // Tailwind's default lg is 1024px
    const onResize = () => {
      if (window.innerWidth >= LG_BREAKPOINT) {
        if (!mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          freshBtn.setAttribute('aria-expanded', 'false');
        }
      }
    };
    window.addEventListener('resize', onResize);

    // Ensure correct initial state on load
    onResize();
  }
}

// Load Components
// returns a Promise that resolves when the component has been injected (or rejected on error)
async function loadComponent(id, file) {
  const element = document.getElementById(id);
  if (!element) return Promise.resolve();

  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`Failed to fetch ${file}: ${res.status}`);
    element.innerHTML = await res.text();
    return Promise.resolve();
  } catch (err) {
    console.warn(err);
    return Promise.resolve();
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  // Use relative paths so pages served from the same root can resolve components
  const headerPath = "/components/header.html";
  const footerPath = "/components/footer.html";

  await Promise.all([
    loadComponent("header", headerPath),
    loadComponent("footer", footerPath),
  ]);

  // Initialize any interactive behavior that lives inside injected components
  initMenu();
});