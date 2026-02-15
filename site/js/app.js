/* ============================================
   FPT Hub — App Logic
   ============================================ */

/**
 * Toggle mobile nav
 */
function toggleNav() {
    const links = document.getElementById('navLinks');
    if (links) links.classList.toggle('navbar__links--open');
}

/**
 * Search & Filter cards
 */
let currentFilter = 'all';

function setFilter(filter, btnEl) {
    currentFilter = filter;
    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('filter-tab--active'));
    if (btnEl) btnEl.classList.add('filter-tab--active');
    filterCards();
}

function filterCards() {
    const searchVal = (document.getElementById('searchInput')?.value || '').toLowerCase();
    const cards = document.querySelectorAll('.card[data-category]');

    cards.forEach(card => {
        const category = card.dataset.category || '';
        const title = (card.dataset.title || '').toLowerCase();
        const desc = (card.querySelector('.card__desc')?.textContent || '').toLowerCase();

        const matchesFilter = currentFilter === 'all' || category === currentFilter;
        const matchesSearch = !searchVal || title.includes(searchVal) || desc.includes(searchVal);

        if (matchesFilter && matchesSearch) {
            card.style.display = '';
            card.style.animation = 'fadeIn 300ms ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
}

/**
 * Lightbox for images
 */
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    if (lightbox && img) {
        img.src = src;
        lightbox.classList.add('lightbox--active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('lightbox--active');
        document.body.style.overflow = '';
    }
}

// Close lightbox on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

/**
 * Scroll-based navbar effect
 */
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 15, 17, 0.95)';
    } else {
        navbar.style.background = 'rgba(15, 15, 17, 0.8)';
    }
});

/**
 * Animate elements on scroll (Intersection Observer)
 */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 500ms ease forwards';
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .guide__step').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

/**
 * Initialize guide page — make images clickable for lightbox
 */
function initGuideImages() {
    document.querySelectorAll('.guide__step-img img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => openLightbox(img.src));
    });
}

/**
 * Init
 */
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initGuideImages();
});
