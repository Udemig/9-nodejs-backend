(function () {
  const header = document.getElementById("header");
  const nav = document.getElementById("nav");
  const menuBtn = document.getElementById("menuBtn");
  const dropdown = document.querySelector("[data-dropdown]");
  const dropBtn = dropdown.querySelector(".dropdown-btn");
  const accentBtn = document.getElementById("accentBtn");
  const modal = document.getElementById("modal");
  const form = document.getElementById("accessForm");
  const formOk = document.getElementById("formOk");
  const billingToggle = document.getElementById("billingToggle");
  const densityToggle = document.getElementById("densityToggle");
  const demoCanvas = document.getElementById("demoCanvas");
  const demoCaption = document.getElementById("demoCaption");
  const demoLog = document.getElementById("demoLog");
  const accents = ["violet", "cyan", "amber"];
  let accentIndex = 0;
  let yearly = false;

  const views = {
    canvas: "Spatial board · 18 live nodes",
    pulse: "Presence layer · 6 huddles in orbit",
    vault: "Encrypted vault · 3 regional keys",
  };

  window.addEventListener("scroll", function () {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  });

  menuBtn.addEventListener("click", function () {
    const open = document.body.classList.toggle("nav-open");
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      document.body.classList.remove("nav-open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });

  dropBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    const open = !dropdown.classList.contains("open");
    dropdown.classList.toggle("open", open);
    dropBtn.setAttribute("aria-expanded", String(open));
  });

  document.addEventListener("click", function () {
    dropdown.classList.remove("open");
    dropBtn.setAttribute("aria-expanded", "false");
  });

  accentBtn.addEventListener("click", function () {
    accentIndex = (accentIndex + 1) % accents.length;
    document.body.dataset.accent = accents[accentIndex];
  });

  function openModal() {
    modal.hidden = false;
    form.hidden = false;
    formOk.hidden = true;
    const field = modal.querySelector("input");
    if (field) field.focus();
  }

  function closeModal() {
    modal.hidden = true;
  }

  document.querySelectorAll("[data-open-modal]").forEach(function (el) {
    el.addEventListener("click", openModal);
  });

  document.querySelectorAll("[data-close-modal]").forEach(function (el) {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
      dropdown.classList.remove("open");
      document.body.classList.remove("nav-open");
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    form.hidden = true;
    formOk.hidden = false;
  });

  billingToggle.addEventListener("click", function () {
    yearly = !yearly;
    billingToggle.setAttribute("aria-checked", String(yearly));
    document.querySelectorAll("[data-month]").forEach(function (el) {
      const value = yearly ? el.dataset.year : el.dataset.month;
      el.textContent = "$" + value;
    });
  });

  document.querySelectorAll(".tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      document.querySelectorAll(".tab").forEach(function (other) {
        other.classList.remove("is-active");
        other.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      const view = tab.dataset.view;
      demoCanvas.dataset.view = view;
      demoCaption.textContent = views[view];
      demoLog.textContent = "View switched to " + view + ".";
    });
  });

  densityToggle.addEventListener("change", function () {
    demoCanvas.classList.toggle("is-compact", densityToggle.checked);
    demoLog.textContent = densityToggle.checked
      ? "Compact density enabled."
      : "Expanded density restored.";
  });

  document.querySelectorAll(".demo-node").forEach(function (node) {
    node.addEventListener("click", function () {
      document.querySelectorAll(".demo-node").forEach(function (other) {
        other.classList.remove("is-live");
      });
      node.classList.add("is-live");
      demoLog.textContent = "Routing signal through “" + node.textContent + "”.";
    });
  });

  const counters = document.querySelectorAll("[data-count]");
  const counterObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const end = Number(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const started = performance.now();
        const duration = 1200;

        function tick(now) {
          const progress = Math.min((now - started) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(end * eased) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach(function (el) {
    counterObserver.observe(el);
  });
})();
