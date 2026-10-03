/* ==========================================
   NEWS PAGE LOGIC (news.js)
   ========================================== */

const newsArticles = [
  { title: "Webb Identifies Complex Organic Molecules in Planetary Disk", category: "Space", date: "Sept 28, 2026", img: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=500&auto=format&fit=crop", desc: "Pre-biotic chemistry discovered surrounding a young stellar system 400 light years distant." },
  { title: "Earth-Observing Satellites Track Polar Ice Volumetric Flow", category: "Earth", date: "Sept 20, 2026", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=500&auto=format&fit=crop", desc: "High-resolution elevation radar reveals changing glacier dynamics across Antarctic coastal regions." },
  { title: "Solar Array Upgrade Completed During Space Station Spacewalk", category: "Technology", date: "Sept 15, 2026", img: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=500&auto=format&fit=crop", desc: "Astronauts finish 7-hour EVA attaching roll-out arrays to boost total station power capacity." },
  { title: "Mars Helicopter Concept Tested in Cryogenic Wind Tunnel", category: "Science", date: "Aug 30, 2026", img: "https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?q=80&w=500&auto=format&fit=crop", desc: "Rotor designs achieve lift equilibrium inside simulated rarefied carbon dioxide atmosphere." }
];

document.addEventListener('DOMContentLoaded', () => {
  renderNews(newsArticles);

  const searchInput = document.getElementById('newsSearchInput');
  const filterBtns = document.querySelectorAll('#newsFilterBar .filter-btn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      const filtered = newsArticles.filter(a => a.title.toLowerCase().includes(term) || a.desc.toLowerCase().includes(term));
      renderNews(filtered);
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const cat = e.target.getAttribute('data-category');
      const filtered = cat === 'all' ? newsArticles : newsArticles.filter(a => a.category === cat);
      renderNews(filtered);
    });
  });
});

function renderNews(list) {
  const grid = document.getElementById('newsGrid');
  if (!grid) return;
  grid.innerHTML = list.map(item => `
    <div class="card reveal active">
      <div class="card-img"><img src="${item.img}" alt="${item.title}"></div>
      <div class="card-body">
        <span class="badge">${item.category}</span>
        <h3 class="card-title">${item.title}</h3>
        <p class="date-text" style="font-size:0.8rem; margin-bottom:10px;">${item.date}</p>
        <p>${item.desc}</p>
        <a href="#" class="card-link">Read Full News Story &rarr;</a>
      </div>
    </div>
  `).join('');
}