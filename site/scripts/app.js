const state = {
  resources: [],
  filtered: []
};

async function loadResources() {
  const res = await fetch('data/resources.json');
  state.resources = await res.json();
  state.filtered = state.resources;
  return state.resources;
}

function qs(sel) {
  return document.querySelector(sel);
}

function qsa(sel) {
  return Array.from(document.querySelectorAll(sel));
}

function renderCards(list, container) {
  container.innerHTML = '';
  list.forEach(item => {
    const card = document.createElement('article');
    card.className = 'card';
    const statusBadge = item.status === 'Update'
      ? '<span class="badge warn">Cần cập nhật</span>'
      : '<span class="badge">Đã audit</span>';
    const feidBadge = (item.source_url || '').includes('fpt.edu.vn') && item.category === 'Thủ tục'
      ? '<span class="badge warn">Đăng nhập FeID</span>'
      : '';
    card.innerHTML = `
      <img src="${item.image_path}" alt="${item.title}">
      <div>
        <div class="meta">
          <span>${item.category}</span>
          ${item.sub_category ? `<span>• ${item.sub_category}</span>` : ''}
        </div>
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
        <div class="meta">${statusBadge} ${feidBadge}</div>
      </div>
      <a class="btn" href="detail.html?id=${encodeURIComponent(item.id)}">${item.cta_label || 'Xem thêm'}</a>
    `;
    container.appendChild(card);
  });
}

function buildChips(list, container, onSelect) {
  container.innerHTML = '';
  const all = document.createElement('button');
  all.className = 'chip active';
  all.textContent = 'Tất cả';
  all.addEventListener('click', () => onSelect(''));
  container.appendChild(all);

  list.forEach(label => {
    const chip = document.createElement('button');
    chip.className = 'chip';
    chip.textContent = label;
    chip.addEventListener('click', () => onSelect(label));
    container.appendChild(chip);
  });
}

function setActiveChip(container, label) {
  qsa('.chip', container).forEach(chip => {
    chip.classList.toggle('active', chip.textContent === (label || 'Tất cả'));
  });
}

function applyFilters({ term = '', category = '', status = '' } = {}) {
  const norm = term.trim().toLowerCase();
  state.filtered = state.resources.filter(item => {
    const matchesTerm = !norm || [item.title, item.summary, item.tags].join(' ').toLowerCase().includes(norm);
    const matchesCategory = !category || item.category === category;
    const matchesStatus = !status || item.status === status;
    return matchesTerm && matchesCategory && matchesStatus;
  });
}

async function initIndex() {
  await loadResources();
  const chips = qs('[data-chips]');
  const featured = qs('[data-featured]');
  const searchInput = qs('[data-search]');

  const categories = [...new Set(state.resources.map(r => r.category))];
  buildChips(categories, chips, (label) => {
    setActiveChip(chips, label);
    applyFilters({ term: searchInput.value, category: label });
    renderCards(state.filtered.slice(0, 6), featured);
  });

  searchInput.addEventListener('input', () => {
    const active = qsa('.chip', chips).find(ch => ch.classList.contains('active'));
    const label = active && active.textContent !== 'Tất cả' ? active.textContent : '';
    applyFilters({ term: searchInput.value, category: label });
    renderCards(state.filtered.slice(0, 6), featured);
  });

  renderCards(state.resources.slice(0, 6), featured);
}

async function initDirectory() {
  await loadResources();
  const list = qs('[data-list]');
  const searchInput = qs('[data-search]');
  const categorySelect = qs('[data-category]');
  const statusSelect = qs('[data-status]');

  const categories = [''].concat([...new Set(state.resources.map(r => r.category))]);
  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat || 'Tất cả';
    categorySelect.appendChild(opt);
  });

  function run() {
    applyFilters({ term: searchInput.value, category: categorySelect.value, status: statusSelect.value });
    renderCards(state.filtered, list);
  }

  [searchInput, categorySelect, statusSelect].forEach(el => el.addEventListener('input', run));
  run();
}

window.appInit = function () {
  const page = document.body.dataset.page;
  if (page === 'index') initIndex();
  if (page === 'directory') initDirectory();
};
