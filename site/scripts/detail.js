async function loadDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const res = await fetch('data/resources.json');
  const data = await res.json();
  const item = data.find(r => r.id === id);
  const root = document.querySelector('[data-detail]');

  const backUrl = new URL('directory.html', window.location.href);

  if (!item) {
    root.innerHTML = '<div class="detail-card">Không tìm thấy tài nguyên.</div>';
    return;
  }

  const feidNotice = item.category === 'Thủ tục' && (item.source_url || '').includes('fpt.edu.vn')
    ? '<div class="notice">Link sẽ mở tab mới. Vui lòng đăng nhập FeID để tiếp tục.</div>'
    : '';

  root.innerHTML = `
    <div class="detail-card">
      <img src="${item.image_path}" alt="${item.title}" style="width:100%;height:220px;object-fit:contain;background:#fbf7f1;border-radius:12px;padding:10px;">
      <h1>${item.title}</h1>
      <p>${item.summary}</p>
      ${feidNotice}
      <div style="margin-top:12px;display:flex;gap:10px;flex-wrap:wrap;">
        ${item.source_url ? `<a class="btn" href="${item.source_url}" target="_blank" rel="noreferrer">${item.cta_label || 'Mở link'}</a>` : ''}
        <a class="btn" style="background:transparent;color:var(--ink);" href="${backUrl.toString()}">Quay lại danh mục</a>
      </div>
    </div>
    <div class="detail-card">
      <h3>Thông tin chi tiết</h3>
      <div class="kv">
        <div>Danh mục</div><div>${item.category}</div>
        <div>Nhóm</div><div>${item.sub_category || '-'}</div>
        <div>Tags</div><div>${item.tags || '-'}</div>
        <div>Trạng thái</div><div>${item.status}</div>
        <div>Last verified</div><div>${item.last_verified}</div>
        <div>Ghi chú</div><div>${item.notes || '-'}</div>
      </div>
    </div>
  `;
}

window.addEventListener('DOMContentLoaded', loadDetail);
