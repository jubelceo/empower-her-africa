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

    // Update Progress Bar
    const progressBar = document.querySelector('.progress-bar div');
    const progressText = document.getElementById('progress-percentage');
    const currentProgress = parseInt(progressText.textContent);
    const newProgress = currentProgress + parseInt(amount);
    const goal = 10000;

    if (newProgress <= goal) {
        const progressPercentage = (newProgress / goal) * 100;
        progressBar.style.width = progressPercentage + '%';
        progressText.textContent = progressPercentage;
    } else {
        progressBar.style.width = '100%';
        progressText.textContent = '100';
    }
});

// FAQ Toggle Functionality
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', !isExpanded);
        answer.style.maxHeight = isExpanded ? '0' : answer.scrollHeight + 'px';
    });
});

// User Stories Submission
document.getElementById('story-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('story-name').value;
    const title = document.getElementById('story-title').value;
    const content = document.getElementById('story-content').value;
    const image = document.getElementById('story-image').files[0];

    const storyElement = document.createElement('div');
    storyElement.classList.add('user-story');
    storyElement.innerHTML = `
        <h3>${title}</h3>
        <p><strong>By ${name}:</strong> ${content}</p>
    `;

    if (image) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imgElement = document.createElement('img');
            imgElement.src = event.target.result;
            imgElement.alt = title;
            storyElement.appendChild(imgElement);
        };
        reader.readAsDataURL(image);
    }

    document.getElementById('user-stories-display').appendChild(storyElement);
    document.getElementById('story-form').reset();
});

// Chat Widget Toggle
document.getElementById('chat-toggle').addEventListener('click', () => {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.style.display = chatWindow.style.display === 'block' ? 'none' : 'block';
});

// Simple Chat Functionality
document.getElementById('chat-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const message = e.target.value;
        if (message.trim()) {
            addMessageToChat('User', message);
            // Simulate a bot response
            setTimeout(() => addMessageToChat('Bot', 'This is a simulated response.'), 500);
            e.target.value = '';
        }
    }
});

function addMessageToChat(sender, message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    messageElement.classList.add(sender.toLowerCase());
    messageElement.textContent = `${sender}: ${message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Timeline Initialization
document.addEventListener('DOMContentLoaded', () => {
    const timeline = new vis.Timeline(document.getElementById('timeline-container'));
    timeline.setOptions({
        orientation: 'top',
        zoomable: false,
        moveable: true,
        selectable: true,
        stack: true
    });

    // Example data
    const items = new vis.DataSet([
        { id: 1, content: 'Founded Empower Her Africa', start: new Date(2020, 0, 1) },
        { id: 2, content: 'Launched first project', start: new Date(2021, 5, 15) },
        { id: 3, content: 'Expanded to 5 countries', start: new Date(2022, 11, 1) },
        { id: 4, content: 'Achieved 50,000 pad distribution', start: new Date(2023, 6, 10) }
    ]);

    timeline.setItems(items);
});


