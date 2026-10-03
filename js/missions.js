/* ==========================================
   MISSIONS PAGE LOGIC (missions.js)
   ========================================== */

const missionsData = [
  { name: "Artemis III", category: "Moon", status: "Preparing Launch", img: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=600&auto=format&fit=crop", desc: "Landing astronauts at the lunar South Pole to explore ice reserves." },
  { name: "Perseverance Rover", category: "Mars", status: "Active Surface Operations", img: "https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?q=80&w=600&auto=format&fit=crop", desc: "Collecting drill cores in Jezero crater to scan for ancient bio-signatures." },
  { name: "James Webb Telescope", category: "Space Telescope", status: "Observing Deep Space", img: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=600&auto=format&fit=crop", desc: "Capturing infrared spectra from the earliest cosmic star clusters." },
  { name: "NISAR Satellite", category: "Earth", status: "Assembly & Testing", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop", desc: "Dual-frequency radar mapping global surface ecosystem changes." },
  { name: "Deep Space Optical Comm", category: "Technology", status: "In-Flight Demonstration", img: "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=600&auto=format&fit=crop", desc: "Testing high-rate laser data communication across interplanetary distances." },
  { name: "Europa Clipper", category: "Space Telescope", status: "En Route to Jupiter", img: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=600&auto=format&fit=crop", desc: "Investigating whether Jupiter's icy moon harbors habitable sub-surface conditions." }
];

document.addEventListener('DOMContentLoaded', () => {
  renderMissions('all');
  initMissionFilters();
});

function renderMissions(filter) {
  const grid = document.getElementById('missionsGrid');
  if(!grid) return;
  
  grid.innerHTML = '';
  const filtered = filter === 'all' ? missionsData : missionsData.filter(m => m.category === filter);

  filtered.forEach(m => {
    const card = document.createElement('div');
    card.className = 'card reveal active';
    card.innerHTML = `
      <div class="card-img"><img src="${m.img}" alt="${m.name}"></div>
      <div class="card-body">
        <span class="badge">${m.category}</span>
        <h3 class="card-title">${m.name}</h3>
        <p class="status-tag" style="color:var(--accent-cyan); font-size:0.8rem; font-weight:700; margin-bottom:8px;">● ${m.status}</p>
        <p>${m.desc}</p>
        <a href="#" class="card-link">Mission Overview &rarr;</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

function initMissionFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderMissions(e.target.getAttribute('data-filter'));
    });
  });
}