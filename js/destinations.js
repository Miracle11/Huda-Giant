// Destinations Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider
    const heroSlides = document.querySelectorAll('.hero-slider .hero-slide');
    let currentHeroSlide = 0;
    let heroSlideInterval;
    
    function showHeroSlide(index) {
        heroSlides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
            slide.style.zIndex = '0';
        });
        
        heroSlides[index].classList.add('active');
        heroSlides[index].style.opacity = '1';
        heroSlides[index].style.zIndex = '10';
        
        currentHeroSlide = index;
    }
    
    function nextHeroSlide() {
        const nextIndex = (currentHeroSlide + 1) % heroSlides.length;
        showHeroSlide(nextIndex);
    }
    
    // Initialize hero slider
    if (heroSlides.length > 0) {
        showHeroSlide(0);
        heroSlideInterval = setInterval(nextHeroSlide, 5000);
    }
    
    // Package Filtering System
    const destinationCards = document.querySelectorAll('.destination-card');
    const viewToggles = document.querySelectorAll('.view-toggle');
    const packageCards = document.querySelectorAll('.package-card');
    const packagesGrid = document.getElementById('packages-grid');
    const noResults = document.getElementById('no-results');
    
    let currentCategory = 'all';
    let currentView = 'featured';
    
    // Destination Card Filtering
    destinationCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active state from all cards
            destinationCards.forEach(c => {
                c.style.transform = 'translateY(0)';
                c.style.boxShadow = 'none';
            });
            
            // Add active state to clicked card
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            
            // Filter packages by category
            filterPackages(category, currentView);
        });
    });
    
    // View Toggle Functionality
    viewToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            
            // Update active toggle
            viewToggles.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            currentView = view;
            
            // Filter packages
            filterPackages(currentCategory, view);
        });
    });
    
    // Filter Packages Function
    function filterPackages(category, view) {
        let visibleCount = 0;
        
        packageCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const isFeatured = card.getAttribute('data-featured') === 'true';
            
            let shouldShow = true;
            
            // Apply category filter
            if (category !== 'all' && cardCategory !== category) {
                shouldShow = false;
            }
            
            // Apply view filter
            if (view === 'featured' && !isFeatured) {
                shouldShow = false;
            }
            
            // Show/hide card
            if (shouldShow) {
                card.style.display = 'block';
                visibleCount++;
                
                // Add fade in animation
                card.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show/hide no results message
        if (visibleCount === 0) {
            packagesGrid.style.display = 'none';
            noResults.classList.remove('hidden');
        } else {
            packagesGrid.style.display = 'grid';
            noResults.classList.add('hidden');
        }
        
        // Update current category
        currentCategory = category;
    }
    
    // Package Card Click Handler
    packageCards.forEach(card => {
        const button = card.querySelector('button');
        button.addEventListener('click', function() {
            const packageTitle = card.querySelector('h3').textContent;
            alert(`Thank you for your interest in "${packageTitle}". Our team will contact you shortly with more details.`);
        });
    });
    
    // Download Brochure Handler
    const downloadBrochureBtn = document.getElementById('download-brochure');
    if (downloadBrochureBtn) {
        downloadBrochureBtn.addEventListener('click', function() {
            alert('Our brochure will be available for download soon! In the meantime, please contact us for more information.');
        });
    }
    
    // Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);