/* ==========================================
   GALLERY PAGE LIGHTBOX LOGIC (gallery.js)
   ========================================== */

const galleryItems = [
  { title: "Deep Cosmic Galaxy Field", category: "Galaxy", img: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1200&auto=format&fit=crop" },
  { title: "Earth Limb at Sunrise", category: "Earth", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop" },
  { title: "Crater Rim on Mars", category: "Mars", img: "https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?q=80&w=1200&auto=format&fit=crop" },
  { title: "Astronaut EVA Maintenance", category: "Astronauts", img: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1200&auto=format&fit=crop" },
  { title: "Full Lunar Surface Panorama", category: "Moon", img: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1200&auto=format&fit=crop" },
  { title: "Interstellar Dust Pillars", category: "Galaxy", img: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1200&auto=format&fit=crop" }
];

let activeIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  renderGallery('all');
  initLightbox();

  document.querySelectorAll('#galleryFilterBar .filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('#galleryFilterBar .filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderGallery(e.target.dataset.filter);
    });
  });
});

function renderGallery(filter) {
  const grid = document.getElementById('galleryGrid');
  if(!grid) return;

  const filtered = filter === 'all' ? galleryItems : galleryItems.filter(g => g.category === filter);
  grid.innerHTML = filtered.map((item, index) => `
    <div class="card gallery-card reveal active" onclick="openLightbox(${index})">
      <div class="card-img" style="height:250px;"><img src="${item.img}" alt="${item.title}"></div>
      <div class="card-body text-center">
        <h4>${item.title}</h4>
        <span class="badge" style="margin-top:5px;">${item.category}</span>
      </div>
    </div>
  `).join('');
}

function initLightbox() {
  const modal = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  if (!modal) return;

  closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  prevBtn.addEventListener('click', () => {
    activeIndex = (activeIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightbox();
  });
  nextBtn.addEventListener('click', () => {
    activeIndex = (activeIndex + 1) % galleryItems.length;
    updateLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') modal.classList.remove('active');
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
  });
}

function openLightbox(index) {
  activeIndex = index;
  updateLightbox();
  document.getElementById('lightbox').classList.add('active');
}

function updateLightbox() {
  const img = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');
  const item = galleryItems[activeIndex];

  img.src = item.img;
  caption.innerHTML = `<h3>${item.title}</h3><p>${item.category}</p>`;
}