// Projects dataset
const projects = [
    {
        id: "hands",
        title: "Sweaters Tiger & Mixed Media",
        image: "assets/project-hands.jpg",
        categories: ["photography", "graphic-design"]
    },
    {
        id: "perfume",
        title: "Sophia B. Z. Lavanda Perfume",
        image: "assets/project-perfume.jpg",
        categories: ["graphic-design", "brand-design", "photography"]
    },
    {
        id: "polaroid",
        title: "Analog Portrait (Sophia & Friends)",
        image: "assets/home-polaroid.jpg",
        categories: ["photography"]
    },
    {
        id: "sloth",
        title: "Sloth Jester Character Sketch",
        image: "assets/sloth-doodle.png",
        categories: ["graphic-design"]
    }
];

// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section');
const categoryButtons = document.querySelectorAll('.category-btn');
const galleryContainer = document.getElementById('work-gallery');

// Tab Routing System
function switchTab(targetTabId) {
    if (!targetTabId) targetTabId = 'home';
    
    // Deactivate all nav links and sections
    navLinks.forEach(link => {
        const isTarget = link.getAttribute('data-target') === targetTabId;
        link.classList.toggle('active', isTarget);
        link.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });

    sections.forEach(section => {
        section.classList.toggle('active', section.id === targetTabId);
    });

    // Scroll to top of the page when changing tabs
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Event Listeners for Nav Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('data-target');
        window.location.hash = target;
        switchTab(target);
    });
});

// Sync tab with URL hash on load
window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1);
    switchTab(hash || 'home');
    renderGallery('all');
});

// Sync tab with hashchange events (back/forward navigation)
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    switchTab(hash || 'home');
});

// Render dynamic project gallery
function renderGallery(filter) {
    if (!galleryContainer) return;
    
    // Clear container
    galleryContainer.innerHTML = '';
    
    // Filter projects
    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(p => p.categories.includes(filter));
        
    // Generate markup
    filteredProjects.forEach(proj => {
        const card = document.createElement('div');
        card.className = 'work-project-card';
        
        // Convert tags to user-friendly label
        const tagLabels = proj.categories.map(c => c.replace('-', ' '));
        
        card.innerHTML = `
            <div class="project-img-wrapper">
                <img src="${proj.image}" alt="${proj.title}" class="project-img">
            </div>
            <div class="work-project-title">${proj.title}</div>
            <div class="work-project-tag">${tagLabels.join(' / ')}</div>
        `;
        
        galleryContainer.appendChild(card);
    });
}

// Category filter button listeners
categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Toggle active button style
        categoryButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Animate gallery container update
        galleryContainer.style.opacity = '0';
        setTimeout(() => {
            const filter = btn.getAttribute('data-filter');
            renderGallery(filter);
            galleryContainer.style.opacity = '1';
        }, 200);
    });
});

// Card hover zoom interaction enhancement
document.addEventListener('mouseover', (e) => {
    const card = e.target.closest('.project-card, .work-project-card');
    if (card) {
        const img = card.querySelector('.project-img');
        if (img) img.style.transform = 'scale(1.02)';
    }
});

document.addEventListener('mouseout', (e) => {
    const card = e.target.closest('.project-card, .work-project-card');
    if (card) {
        const img = card.querySelector('.project-img');
        if (img) img.style.transform = 'scale(1)';
    }
});
