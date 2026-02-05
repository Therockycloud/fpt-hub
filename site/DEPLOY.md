# Deploy FPT HUB (GitHub Pages)

## Option A: Publish from `/site` folder on main
1. Vào GitHub repo → Settings → Pages.
2. Source: `Deploy from a branch`.
3. Branch: `main`, folder: `/site`.
4. Save → đợi GitHub Pages build.

## Option B: Publish from `gh-pages` branch
1. Tạo branch `gh-pages`.
2. Chỉ push nội dung của `site/` lên branch này (root).
3. Settings → Pages → Branch `gh-pages`.

## Notes
- Tất cả asset/JS/CSS đều nằm trong `site/`.
- Nếu đổi cấu trúc thư mục, nhớ update đường dẫn trong HTML.
