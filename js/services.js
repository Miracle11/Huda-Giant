// Service Selector Functionality
document.addEventListener('DOMContentLoaded', function() {
    const serviceChips = document.querySelectorAll('.service-chip');
    const serviceResult = document.getElementById('service-result');
    const recommendedServices = document.getElementById('recommended-services');
    
    // Service recommendations mapping
    const serviceRecommendations = {
        pilgrimage: [
            { name: 'Umrah, Hajj & Islamic Tours', icon: '🕌', desc: 'Professionally guided sacred journeys' },
            { name: 'Visa Assistance & Documentation', icon: '📋', desc: 'Expert guidance through visa processes' }
        ],
        educational: [
            { name: 'Educational Tours World-Wide', icon: '🎓', desc: 'Structured, safe academic tours' },
            { name: 'Flight Ticket Bookings', icon: '✈️', desc: 'Competitive international flight bookings' },
            { name: 'Hotel Reservations Worldwide', icon: '🏨', desc: 'Carefully vetted accommodation options' }
        ],
        family: [
            { name: 'Family & Leisure Travel', icon: '👨‍👩‍👧‍👦', desc: 'Curated global adventures' },
            { name: 'Domestic Tourism Across Nigeria', icon: '🇳🇬', desc: 'Expertly arranged local tours' },
            { name: 'Hotel Reservations Worldwide', icon: '🏨', desc: 'Family-friendly accommodation options' }
        ],
        business: [
            { name: 'Business Travel Logistics', icon: '💼', desc: 'Precision-focused corporate solutions' },
            { name: 'Flight Ticket Bookings', icon: '✈️', desc: 'Flexible business flight options' },
            { name: 'Hotel Reservations Worldwide', icon: '🏨', desc: 'Business-class accommodation' }
        ],
        domestic: [
            { name: 'Domestic Tourism Across Nigeria', icon: '🇳🇬', desc: 'Rediscover Nigeria\'s beauty' },
            { name: 'Flight Ticket Bookings', icon: '✈️', desc: 'Domestic flight arrangements' },
            { name: 'Hotel Reservations Worldwide', icon: '🏨', desc: 'Local accommodation options' }
        ],
        flights: [
            { name: 'Flight Ticket Bookings', icon: '✈️', desc: 'Competitive domestic & international flights' },
            { name: 'Hotel Reservations Worldwide', icon: '🏨', desc: 'Accommodation matching your needs' }
        ]
    };
    
    // Add click event listeners to service chips
    serviceChips.forEach(chip => {
        chip.addEventListener('click', function() {
            // Remove active class from all chips
            serviceChips.forEach(c => {
                c.classList.remove('active');
                c.classList.remove('bg-[#49B6A3]');
                c.classList.remove('text-white');
                c.classList.add('bg-white');
                c.classList.add('text-[#49B6A3]');
            });
            
            // Add active class to clicked chip
            this.classList.add('active');
            this.classList.add('bg-[#49B6A3]');
            this.classList.add('text-white');
            this.classList.remove('bg-white');
            this.classList.remove('text-[#49B6A3]');
            
            // Get selected service type
            const serviceType = this.getAttribute('data-service');
            
            // Show recommendations
            showRecommendations(serviceType);
        });
    });
    
    // Function to show recommendations
    function showRecommendations(serviceType) {
        // Clear previous recommendations
        recommendedServices.innerHTML = '';
        
        // Get recommendations for selected service type
        const recommendations = serviceRecommendations[serviceType];
        
        // Create recommendation elements
        recommendations.forEach(service => {
            const serviceElement = document.createElement('div');
            serviceElement.className = 'bg-white rounded-xl p-6 flex items-start border border-gray-100';
            serviceElement.innerHTML = `
                <div class="w-12 h-12 rounded-full bg-gradient-to-r from-[#49B6A3]/20 to-[#7FC843]/20 flex items-center justify-center mr-4 flex-shrink-0">
                    <span class="text-xl">${service.icon}</span>
                </div>
                <div>
                    <h4 class="text-lg font-bold text-[#102A43] mb-1">${service.name}</h4>
                    <p class="text-[#4A4A4A] text-sm">${service.desc}</p>
                </div>
            `;
            recommendedServices.appendChild(serviceElement);
        });
        
        // Show result container
        serviceResult.classList.remove('hidden');
        serviceResult.classList.add('animate-fadeIn');
        
        // Scroll to result
        serviceResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // Smooth scroll for service cards
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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