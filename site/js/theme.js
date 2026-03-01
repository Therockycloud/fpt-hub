// Theme Toggle — light (default) / dark
(function () {
    const saved = localStorage.getItem('fpt-hub-theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
})();

function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    if (next === 'light') {
        html.removeAttribute('data-theme');
    } else {
        html.setAttribute('data-theme', 'dark');
    }
    localStorage.setItem('fpt-hub-theme', next);
    updateThemeIcon();
}

function updateThemeIcon() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.querySelectorAll('.theme-toggle__icon').forEach(function (el) {
        el.textContent = isDark ? '☀️' : '🌙';
    });
}

document.addEventListener('DOMContentLoaded', updateThemeIcon);
