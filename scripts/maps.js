// ============================================
// GOOGLE MAPS INTEGRATION
// ============================================
function initMaps() {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    // Create map container
    const mapContainer = document.createElement('div');
    mapContainer.id = 'map';
    mapContainer.className = 'google-map';
    mapContainer.setAttribute('aria-label', 'Locatie van R.F.C. Lissewege');

    // Find contact info section
    const contactInfo = contactSection.querySelector('.contact-info');
    if (contactInfo) {
        contactInfo.insertAdjacentElement('afterend', mapContainer);
    }

    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
        .google-map {
            width: 100%;
            height: 400px;
            border-radius: 12px;
            overflow: hidden;
            margin-top: 3rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        .google-map iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
    `;
    document.head.appendChild(style);

    // Load Google Maps
    const address = 'Pol Dhondtstraat 70, 8380 Lissewege, Brugge';
    const encodedAddress = encodeURIComponent(address);
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedAddress}`;
    
    // For now, use a simple iframe (replace YOUR_API_KEY with actual key)
    // Or use a static map image as fallback
    mapContainer.innerHTML = `
        <iframe 
            src="https://www.google.com/maps?q=${encodedAddress}&output=embed"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
        </iframe>
    `;
}

// Initialize when contact section is shown
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMaps);
} else {
    initMaps();
}

