// Smooth Scrolling
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Slider Logic
let currentSlide = 0;
const slider = document.getElementById('slider');
const dotsContainer = document.getElementById('dots');

function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 33.33}%)`;
    document.querySelectorAll('.slider-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Initialize Slider Dots
Array.from({ length: slider.children.length }).forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'slider-dot';
    dot.addEventListener('click', () => { currentSlide = i; updateSlider(); });
    dotsContainer.appendChild(dot);
});

document.getElementById('prev').addEventListener('click', () => {
    currentSlide = (currentSlide > 0) ? currentSlide - 1 : slider.children.length - 1;
    updateSlider();
});

document.getElementById('next').addEventListener('click', () => {
    currentSlide = (currentSlide < slider.children.length - 1) ? currentSlide + 1 : 0;
    updateSlider();
});

// Auto-Advance Slider
setInterval(() => {
    currentSlide = (currentSlide < slider.children.length - 1) ? currentSlide + 1 : 0;
    updateSlider();
}, 5000); // Change slide every 5 seconds

// Modal Logic
const modal = document.getElementById('auth-modal');
document.getElementById('login-btn').addEventListener('click', () => {
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('active'), 10);
});
document.querySelector('.close').addEventListener('click', () => {
    modal.classList.remove('active');
    setTimeout(() => modal.style.display = 'none', 300);
});
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = 'none', 300);
    }
});

// Search Functionality
window.searchSite = () => {
    const query = document.getElementById('search-input').value.toLowerCase();
    document.querySelectorAll('section').forEach(section => {
        if (section.textContent.toLowerCase().includes(query)) section.scrollIntoView({ behavior: 'smooth' });
    });
};

// Video Controls
window.playVideo = () => document.getElementById('youtubeVideo').src += "&autoplay=1";
window.pauseVideo = () => document.getElementById('youtubeVideo').src = document.getElementById('youtubeVideo').src.replace("&autoplay=1", "");
window.halfSize = () => { const v = document.getElementById('youtubeVideo'); v.width = 450; v.height = 253; };
window.normalSize = () => { const v = document.getElementById('youtubeVideo'); v.width = 900; v.height = 506; };

// Mobile Menu Toggle
document.querySelector('.menu-toggle').addEventListener('click', () => {
    const navUl = document.querySelector('nav ul');
    navUl.classList.toggle('active');
    const isExpanded = document.querySelector('.menu-toggle').getAttribute('aria-expanded') === 'true';
    document.querySelector('.menu-toggle').setAttribute('aria-expanded', !isExpanded);
});

// Form Validation
document.getElementById('volunteer-form').addEventListener('submit', (e) => {
    const name = document.getElementById('volunteer-name').value;
    const email = document.getElementById('volunteer-email').value;
    if (!name || !email) {
        e.preventDefault();
        alert('Please fill out all required fields.');
    }
});

document.getElementById('donation-form').addEventListener('submit', (e) => {
    const cardNumber = document.getElementById('card-number').value;
    const amount = document.getElementById('amount').value;
    if (!cardNumber || !amount) {
        e.preventDefault();
        alert('Please fill out all required fields.');
    }
});
