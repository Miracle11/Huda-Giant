// Contact Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const submitLoading = document.getElementById('submitLoading');
    const formMessage = document.getElementById('formMessage');
    
    // Error elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const serviceError = document.getElementById('serviceError');
    const messageError = document.getElementById('messageError');
    
    // FAQ Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    // Initialize Google Map (Basic implementation)
    function initMap() {
        // This is a basic implementation. In production, you would use Google Maps API
        const mapContainer = document.getElementById('map');
        
        // Create a simple interactive map alternative
        const mapImage = mapContainer.querySelector('img');
        if (mapImage) {
            mapImage.style.cursor = 'grab';
            
            let isDragging = false;
            let startX, startY, translateX = 0, translateY = 0;
            let scale = 1;
            
            mapImage.addEventListener('mousedown', (e) => {
                isDragging = true;
                startX = e.clientX - translateX;
                startY = e.clientY - translateY;
                mapImage.style.cursor = 'grabbing';
            });
            
            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                e.preventDefault();
                translateX = e.clientX - startX;
                translateY = e.clientY - startY;
                mapImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
            });
            
            document.addEventListener('mouseup', () => {
                isDragging = false;
                mapImage.style.cursor = 'grab';
            });
            
            // Zoom functionality
            mapContainer.addEventListener('wheel', (e) => {
                e.preventDefault();
                const delta = e.deltaY * -0.01;
                scale = Math.min(Math.max(0.5, scale + delta), 3);
                mapImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
            });
            
            // Add zoom controls
            const zoomControls = document.createElement('div');
            zoomControls.className = 'absolute bottom-4 right-4 flex flex-col space-y-2';
            zoomControls.innerHTML = `
                <button class="zoom-in w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#102A43] hover:bg-gray-100">
                    <i class="fas fa-plus"></i>
                </button>
                <button class="zoom-out w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#102A43] hover:bg-gray-100">
                    <i class="fas fa-minus"></i>
                </button>
            `;
            mapContainer.style.position = 'relative';
            mapContainer.appendChild(zoomControls);
            
            // Add zoom control functionality
            zoomControls.querySelector('.zoom-in').addEventListener('click', () => {
                scale = Math.min(3, scale + 0.2);
                mapImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
            });
            
            zoomControls.querySelector('.zoom-out').addEventListener('click', () => {
                scale = Math.max(0.5, scale - 0.2);
                mapImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
            });
        }
    }
    
    // Initialize FAQ functionality
    function initFAQ() {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                const icon = this.querySelector('i');
                
                // Toggle active class
                this.classList.toggle('active');
                
                // Toggle answer visibility
                if (answer.classList.contains('hidden')) {
                    answer.classList.remove('hidden');
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    answer.classList.add('hidden');
                    icon.style.transform = 'rotate(0deg)';
                }
                
                // Close other FAQs
                faqQuestions.forEach(otherQuestion => {
                    if (otherQuestion !== this) {
                        otherQuestion.classList.remove('active');
                        const otherAnswer = otherQuestion.nextElementSibling;
                        const otherIcon = otherQuestion.querySelector('i');
                        otherAnswer.classList.add('hidden');
                        otherIcon.style.transform = 'rotate(0deg)';
                    }
                });
            });
        });
    }
    
    // Form validation
    function validateForm() {
        let isValid = true;
        
        // Reset errors
        [nameError, emailError, phoneError, serviceError, messageError].forEach(error => {
            error.classList.add('hidden');
        });
        
        // Validate name
        const name = document.getElementById('fullName').value.trim();
        if (!name) {
            nameError.classList.remove('hidden');
            isValid = false;
        }
        
        // Validate email
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            emailError.classList.remove('hidden');
            isValid = false;
        }
        
        // Validate phone
        const phone = document.getElementById('phone').value.trim();
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        if (!phone || !phoneRegex.test(phone)) {
            phoneError.classList.remove('hidden');
            isValid = false;
        }
        
        // Validate service
        const service = document.getElementById('service').value;
        if (!service) {
            serviceError.classList.remove('hidden');
            isValid = false;
        }
        
        // Validate message
        const message = document.getElementById('message').value.trim();
        if (!message) {
            messageError.classList.remove('hidden');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm()) {
                showFormMessage('Please fill in all required fields correctly.', 'error');
                return;
            }
            
            // Show loading state
            submitText.classList.add('hidden');
            submitLoading.classList.remove('hidden');
            submitBtn.disabled = true;
            
            // Simulate form submission (in production, this would be a real API call)
            setTimeout(() => {
                // Get form data
                const formData = {
                    name: document.getElementById('fullName').value.trim(),
                    email: document.getElementById('email').value.trim(),
                    phone: document.getElementById('phone').value.trim(),
                    service: document.getElementById('service').value,
                    subject: document.getElementById('subject').value.trim(),
                    message: document.getElementById('message').value.trim(),
                    timestamp: new Date().toISOString()
                };
                
                // In a real application, you would send this to your backend
                console.log('Form submitted:', formData);
                
                // Show success message
                showFormMessage('Thank you for your message! Our dedicated travel consultant will respond within 24 hours.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset button state
                submitText.classList.remove('hidden');
                submitLoading.classList.add('hidden');
                submitBtn.disabled = false;
                
                // Scroll to form message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
            }, 1500); // Simulate network delay
        });
    }
    
    // Show form message
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'p-4 rounded-xl';
        
        if (type === 'success') {
            formMessage.classList.add('success-message');
        } else {
            formMessage.classList.add('error-message');
        }
        
        formMessage.classList.remove('hidden');
        
        // Auto-hide message after 5 seconds
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 5000);
    }
    
    // Initialize page functionality
    initMap();
    initFAQ();
    
    // Smooth scrolling for navigation
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
    
    // Real-time form validation
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#f87171';
            } else if (this.type === 'email' && this.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.value.trim())) {
                    this.style.borderColor = '#f87171';
                } else {
                    this.style.borderColor = '#49B6A3';
                }
            } else if (this.value.trim()) {
                this.style.borderColor = '#49B6A3';
            }
        });
    });
});