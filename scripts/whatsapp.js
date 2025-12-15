// ============================================
// WHATSAPP FLOATING BUTTON
// ============================================
function initWhatsApp() {
    const phoneNumber = '32477792803'; // Format: country code + number without +
    const defaultMessage = 'Hallo! Ik heb een vraag over R.F.C. Lissewege.';

    // Create WhatsApp button
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.setAttribute('aria-label', 'Contacteer ons via WhatsApp');
    whatsappBtn.target = '_blank';
    whatsappBtn.rel = 'noopener noreferrer';
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    
    document.body.appendChild(whatsappBtn);

    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
        .whatsapp-float {
            position: fixed;
            bottom: 2rem;
            left: 2rem;
            width: 60px;
            height: 60px;
            background: #25D366;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.75rem;
            box-shadow: 0 4px 16px rgba(37, 211, 102, 0.4);
            z-index: 9998;
            transition: all 0.3s ease;
            animation: pulse-whatsapp 2s infinite;
        }
        .whatsapp-float:hover {
            transform: scale(1.1);
            box-shadow: 0 8px 24px rgba(37, 211, 102, 0.5);
        }
        @keyframes pulse-whatsapp {
            0%, 100% {
                box-shadow: 0 4px 16px rgba(37, 211, 102, 0.4);
            }
            50% {
                box-shadow: 0 4px 24px rgba(37, 211, 102, 0.6);
            }
        }
        @media (max-width: 768px) {
            .whatsapp-float {
                width: 56px;
                height: 56px;
                font-size: 1.5rem;
                bottom: 1.5rem;
                left: 1.5rem;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhatsApp);
} else {
    initWhatsApp();
}

