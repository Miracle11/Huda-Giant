// Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenuButton.classList.toggle('hamburger-active');
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile menu if open
                    mobileMenu.classList.add('hidden');
                    mobileMenuButton.classList.remove('hamburger-active');
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Testimonial slider functionality for mobile
        let testimonialIndex = 0;
        const testimonialSlider = document.querySelector('.testimonial-slider');
        const testimonialDots = document.querySelectorAll('.flex.justify-center.md\\:hidden div');
        
        function updateTestimonialSlider() {
            if (window.innerWidth < 768) {
                const scrollAmount = testimonialIndex * (window.innerWidth * 0.85 + 24); // 85% width + margin
                testimonialSlider.scrollTo({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
                
                // Update dots
                testimonialDots.forEach((dot, index) => {
                    if (index === testimonialIndex) {
                        dot.classList.remove('bg-gray-300');
                        dot.classList.add('bg-[#49B6A3]');
                    } else {
                        dot.classList.remove('bg-[#49B6A3]');
                        dot.classList.add('bg-gray-300');
                    }
                });
            }
        }
        
        // Auto-rotate testimonials on mobile
        setInterval(() => {
            if (window.innerWidth < 768) {
                testimonialIndex = (testimonialIndex + 1) % 3;
                updateTestimonialSlider();
            }
        }, 5000);
        
        // Click dots to navigate
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                testimonialIndex = index;
                updateTestimonialSlider();
            });
        });
        
        // Form validation
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation
            const inputs = contactForm.querySelectorAll('input, select, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('ring-2', 'ring-red-500');
                } else {
                    input.classList.remove('ring-2', 'ring-red-500');
                }
            });
            
            if (isValid) {
                // In a real implementation, you would send the form data to a server
                alert('Thank you for your inquiry! We will contact you shortly.');
                contactForm.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
        
        // Sticky header background on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.classList.add('shadow-lg', 'bg-white/95', 'backdrop-blur-sm');
            } else {
                header.classList.remove('shadow-lg', 'bg-white/95', 'backdrop-blur-sm');
            }
        });

        // Hero Slider Functionality
        document.addEventListener('DOMContentLoaded', function() {
            const slides = document.querySelectorAll('.hero-slide');
            const indicators = document.querySelectorAll('.slide-indicator');
            const prevBtn = document.getElementById('prev-slide');
            const nextBtn = document.getElementById('next-slide');
            
            let currentSlide = 0;
            const totalSlides = slides.length;
            let slideInterval;
            
            // Function to show a specific slide
            function showSlide(index) {
                // Remove active class from all slides and indicators
                slides.forEach(slide => {
                    slide.classList.remove('active');
                    slide.style.opacity = '0';
                    slide.style.zIndex = '0';
                });
                
                indicators.forEach(indicator => {
                    indicator.classList.remove('active');
                    indicator.style.width = '12px';
                    indicator.style.backgroundColor = '';
                });
                
                // Add active class to current slide and indicator
                slides[index].classList.add('active');
                slides[index].style.opacity = '1';
                slides[index].style.zIndex = '10';
                
                indicators[index].classList.add('active');
                indicators[index].style.width = '24px';
                indicators[index].style.backgroundColor = '#7FC843';
                
                currentSlide = index;
            }
            
            // Function to go to next slide
            function nextSlide() {
                const nextIndex = (currentSlide + 1) % totalSlides;
                showSlide(nextIndex);
            }
            
            // Function to go to previous slide
            function prevSlide() {
                const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
                showSlide(prevIndex);
            }
            
            // Initialize the slider
            function initSlider() {
                showSlide(0);
                
                // Auto-advance slides every 5 seconds
                slideInterval = setInterval(nextSlide, 5000);
                
                // Add event listeners for manual controls
                prevBtn.addEventListener('click', () => {
                    clearInterval(slideInterval);
                    prevSlide();
                    slideInterval = setInterval(nextSlide, 5000);
                });
                
                nextBtn.addEventListener('click', () => {
                    clearInterval(slideInterval);
                    nextSlide();
                    slideInterval = setInterval(nextSlide, 5000);
                });
                
                // Add event listeners for indicators
                indicators.forEach((indicator, index) => {
                    indicator.addEventListener('click', () => {
                        clearInterval(slideInterval);
                        showSlide(index);
                        slideInterval = setInterval(nextSlide, 5000);
                    });
                });
            }
            
            // Initialize slider when DOM is loaded
            initSlider();
        });

        