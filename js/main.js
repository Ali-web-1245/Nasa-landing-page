/* ==========================================
   GLOBAL NASA INSPIRED JS (main.js)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initCounters();
  initSlider();
  initScrollTop();
  renderHomeDynamicData();
});

/* 1. Navbar & Mobile Menu Handler */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const searchToggle = document.getElementById('searchToggle');
  const searchOverlay = document.getElementById('searchOverlay');
  const closeSearch = document.getElementById('closeSearch');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Close menu when clicking a link on mobile
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu) navMenu.classList.remove('active');
    });
  });

  if (searchToggle) {
    searchToggle.addEventListener('click', () => searchOverlay.classList.toggle('active'));
  }
  if (closeSearch) {
    closeSearch.addEventListener('click', () => searchOverlay.classList.remove('active'));
  }
}

/* 2. Scroll Reveal Animations (IntersectionObserver) */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
}

/* 3. Animated Counter Functionality */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute('data-target');
        let count = 0;
        const speed = target / 50;
        const updateCount = () => {
          count += speed;
          if (count < target) {
            entry.target.innerText = Math.ceil(count) + '+';
            setTimeout(updateCount, 30);
          } else {
            entry.target.innerText = target + '+';
          }
        };
        updateCount();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* 4. Interactive Hero Image Slider */
function initSlider() {
  const wrapper = document.getElementById('sliderWrapper');
  if (!wrapper) return;

  const slides = wrapper.querySelectorAll('.slide');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  let currentIndex = 0;
  let autoSlideInterval;

  function showSlide(index) {
    if (index >= slides.length) currentIndex = 0;
    else if (index < 0) currentIndex = slides.length - 1;
    else currentIndex = index;

    wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  if (nextBtn) nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
  if (prevBtn) prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => showSlide(currentIndex + 1), 5000);
  }

  wrapper.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
  wrapper.addEventListener('mouseleave', startAutoSlide);

  startAutoSlide();
}

/* 5. Scroll To Top Button */
function initScrollTop() {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) btn.classList.add('show');
    else btn.classList.remove('show');
  });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* 6. Populate Home Page Dynamic Content */
function renderHomeDynamicData() {
  const storiesGrid = document.getElementById('homeStoriesGrid');
  const missionsGrid = document.getElementById('homeMissionsGrid');

  if (storiesGrid) {
    const stories = [
      { title: "Europa Clipper In-Flight Calibration", cat: "Deep Space", img: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=500&auto=format&fit=crop", desc: "Engineers confirm optical sensor suite health during solar transit." },
      { title: "Lunar South Pole Resource Mapping", cat: "Artemis", img: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=500&auto=format&fit=crop", desc: "Orbital radar scans reveal deep volatile ice pockets inside permanently shadowed craters." },
      { title: "International Space Station Science Shift", cat: "ISS", img: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=500&auto=format&fit=crop", desc: "Astronauts execute zero-g crystal growth study targeting new pharmaceutical structures." }
    ];

    storiesGrid.innerHTML = stories.map(s => `
      <div class="card reveal">
        <div class="card-img"><img src="${s.img}" alt="${s.title}"></div>
        <div class="card-body">
          <span class="badge">${s.cat}</span>
          <h3 class="card-title">${s.title}</h3>
          <p>${s.desc}</p>
          <a href="news.html" class="card-link">Read Story &rarr;</a>
        </div>
      </div>
    `).join('');
  }

  if (missionsGrid) {
    const flagshipMissions = [
      { name: "Artemis III", status: "Active Target 2026", img: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=400&auto=format&fit=crop" },
      { name: "Mars Perseverance", status: "Surface Exploring", img: "https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?q=80&w=400&auto=format&fit=crop" },
      { name: "James Webb Observatory", status: "L2 Orbit Active", img: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=400&auto=format&fit=crop" },
      { name: "ISS Orbit Crew", status: "Continuous Habitability", img: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=400&auto=format&fit=crop" }
    ];

    missionsGrid.innerHTML = flagshipMissions.map(m => `
      <div class="card reveal text-center">
        <div class="card-img"><img src="${m.img}" alt="${m.name}"></div>
        <div class="card-body">
          <h3 class="card-title">${m.name}</h3>
          <p style="color:var(--accent-cyan); font-size:0.85rem; font-weight:600;">${m.status}</p>
        </div>
      </div>
    `).join('');
  }
}