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
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

window.searchSite = debounce(() => {
    const query = document.getElementById('search-input').value.toLowerCase();
    document.querySelectorAll('section').forEach(section => {
        if (section.textContent.toLowerCase().includes(query)) section.scrollIntoView({ behavior: 'smooth' });
    });
}, 300);

// Video Controls
let isPlaying = false;
window.toggleVideo = () => {
    const video = document.getElementById('youtubeVideo');
    if (isPlaying) {
        video.src = video.src.replace("&autoplay=1", "");
    } else {
        video.src += "&autoplay=1";
    }
    isPlaying = !isPlaying;
};

// Mobile Menu Toggle
document.querySelector('.menu-toggle').addEventListener('click', () => {
    const navUl = document.querySelector('nav ul');
    navUl.classList.toggle('active');
});

// Form Validation
document.getElementById('volunteer-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('volunteer-name').value;
    const email = document.getElementById('volunteer-email').value;
    if (!name || !email) {
        alert('Please fill out all required fields.');
    } else {
        alert('Thank you for signing up! We will contact you soon.');
        e.target.reset();
    }
});

document.getElementById('donation-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const cardNumber = document.getElementById('card-number').value;
    const amount = document.getElementById('amount').value;
    if (!cardNumber || !amount) {
        alert('Please fill out all required fields.');
    } else {
        alert('Thank you for your donation!');
        e.target.reset();
    }
});

// Back to Top Button
window.addEventListener('scroll', () => {
    const backToTopButton = document.getElementById('back-to-top');
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Loading Spinner
window.addEventListener('load', () => {
    document.getElementById('loading-spinner').style.display = 'none';
});