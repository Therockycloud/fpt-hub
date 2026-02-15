/* ============================================
   FPT Hub — Firebase Authentication
   ============================================ */

// Firebase config — replace with your project config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Allowed email domain
const ALLOWED_DOMAIN = 'fpt.edu.vn';

// Initialize Firebase
let app, auth;
try {
    app = firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
} catch (e) {
    console.warn('Firebase not configured yet. Running in demo mode.');
}

// Track current user
let currentUser = null;

/**
 * Check if email domain is allowed
 */
function isAllowedEmail(email) {
    if (!email) return false;
    return email.toLowerCase().endsWith('@' + ALLOWED_DOMAIN);
}

/**
 * Handle Google Sign-In
 */
async function handleLogin() {
    // Demo mode - if Firebase not configured
    if (!auth || firebaseConfig.apiKey === "YOUR_API_KEY") {
        showDemoMode();
        return;
    }

    const loadingEl = document.getElementById('loadingScreen');
    if (loadingEl) loadingEl.style.display = 'flex';

    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        // Force account selection
        provider.setCustomParameters({ prompt: 'select_account' });
        // Restrict to FPT domain hint
        provider.setCustomParameters({ hd: ALLOWED_DOMAIN });

        const result = await auth.signInWithPopup(provider);
        const user = result.user;

        if (!isAllowedEmail(user.email)) {
            await auth.signOut();
            showError('Chỉ email @fpt.edu.vn được phép truy cập. Vui lòng đăng nhập bằng email trường.');
            if (loadingEl) loadingEl.style.display = 'none';
            return;
        }

        onAuthSuccess(user);

    } catch (error) {
        console.error('Login error:', error);
        if (loadingEl) loadingEl.style.display = 'none';

        if (error.code === 'auth/popup-closed-by-user') {
            return; // User cancelled
        }
        showError('Đăng nhập thất bại. Vui lòng thử lại.');
    }
}

/**
 * Handle Sign Out
 */
async function handleLogout() {
    if (auth && firebaseConfig.apiKey !== "YOUR_API_KEY") {
        await auth.signOut();
    }
    currentUser = null;
    localStorage.removeItem('fpthub_demo_user');
    updateUI(null);
}

/**
 * Called on successful authentication
 */
function onAuthSuccess(user) {
    currentUser = {
        uid: user.uid || 'demo',
        email: user.email,
        displayName: user.displayName || user.email.split('@')[0],
        photoURL: user.photoURL || null
    };

    const loadingEl = document.getElementById('loadingScreen');
    if (loadingEl) loadingEl.style.display = 'none';

    updateUI(currentUser);
}

/**
 * Update navigation UI based on auth state
 */
function updateUI(user) {
    const loginBtn = document.getElementById('loginBtn');
    const heroLoginBtn = document.getElementById('heroLoginBtn');
    const authBtnWrap = document.getElementById('authBtnWrap');
    const userWrap = document.getElementById('userWrap');
    const userName = document.getElementById('userName');
    const userAvatar = document.getElementById('userAvatar');

    if (user) {
        // Logged in
        if (authBtnWrap) authBtnWrap.style.display = 'none';
        if (heroLoginBtn) {
            heroLoginBtn.textContent = '📚 Xem tài liệu';
            heroLoginBtn.onclick = function () {
                document.getElementById('resources').scrollIntoView({ behavior: 'smooth' });
            };
        }
        if (userWrap) {
            userWrap.style.display = 'flex';
            if (userName) userName.textContent = user.displayName;
            if (userAvatar) {
                userAvatar.src = user.photoURL || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="%23942e00"/><text x="20" y="26" text-anchor="middle" fill="white" font-size="16" font-weight="bold">' + (user.displayName ? user.displayName[0].toUpperCase() : 'U') + '</text></svg>';
                userAvatar.alt = user.displayName;
            }
        }
    } else {
        // Logged out
        if (authBtnWrap) authBtnWrap.style.display = 'block';
        if (heroLoginBtn) {
            heroLoginBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.9 33 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 5.9 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.9z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.3 15.7 18.8 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 5.9 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.8 13.4-5.1l-6.2-5.2C29.2 35.2 26.7 36 24 36c-5.2 0-9.6-3-11.7-7.4l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4-4.1 5.2l6.2 5.2C36.8 38.9 44 34 44 24c0-1.3-.1-2.7-.4-3.9z"/></svg> Đăng nhập bằng Google FPT';
            heroLoginBtn.onclick = handleLogin;
        }
        if (userWrap) userWrap.style.display = 'none';
    }
}

/**
 * Demo mode — when Firebase is not configured
 */
function showDemoMode() {
    const demoUser = {
        uid: 'demo-user',
        email: 'student@fpt.edu.vn',
        displayName: 'Demo Student',
        photoURL: null
    };

    localStorage.setItem('fpthub_demo_user', JSON.stringify(demoUser));
    currentUser = demoUser;
    updateUI(currentUser);

    // Show demo notification
    const notification = document.createElement('div');
    notification.style.cssText = 'position:fixed;bottom:1rem;right:1rem;z-index:9999;background:var(--bg-card);border:1px solid var(--brand-accent);border-radius:var(--radius-md);padding:1rem 1.5rem;color:var(--text-primary);font-size:0.875rem;max-width:360px;box-shadow:var(--shadow-lg);animation:slideUp 300ms ease;';
    notification.innerHTML = '<strong style="color:var(--brand-accent);">🔧 Chế độ Demo</strong><br><span style="color:var(--text-secondary);">Firebase chưa được cấu hình. Đang chạy ở chế độ demo. Tất cả tài liệu đều có thể truy cập.</span>';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 5000);
}

/**
 * Show error message
 */
function showError(message) {
    const errorEl = document.querySelector('.login__error');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    } else {
        alert(message);
    }
}

/**
 * Check auth state on page load
 */
function initAuth() {
    // Check demo mode
    const demoUser = localStorage.getItem('fpthub_demo_user');
    if (demoUser) {
        currentUser = JSON.parse(demoUser);
        updateUI(currentUser);
        return;
    }

    // Firebase auth state
    if (auth && firebaseConfig.apiKey !== "YOUR_API_KEY") {
        auth.onAuthStateChanged((user) => {
            if (user && isAllowedEmail(user.email)) {
                onAuthSuccess(user);
            } else {
                updateUI(null);
            }
        });
    }
}

/**
 * Check if user is authenticated (for protected pages)
 */
function requireAuth() {
    // In demo mode or if Firebase not configured, always allow
    if (currentUser || localStorage.getItem('fpthub_demo_user')) return true;
    if (!auth || firebaseConfig.apiKey === "YOUR_API_KEY") return true;
    return !!auth.currentUser;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initAuth);
