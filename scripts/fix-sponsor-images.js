// ============================================
// FIX SPONSOR IMAGES IN MOBILE BANNER
// ============================================
// Corrige las rutas de las imágenes de sponsors en el banner móvil
// codificando correctamente los espacios y agregando atributos de carga

(function() {
    'use strict';
    
    function fixSponsorImages() {
        const sponsorImages = document.querySelectorAll('.sponsors-mobile-banner img');
        
        sponsorImages.forEach(img => {
            // Codificar espacios y caracteres especiales en la URL
            if (img.src && img.src.includes('images/sponsors/')) {
                const originalSrc = img.getAttribute('src');
                if (originalSrc && originalSrc.includes(' ')) {
                    // Codificar espacios y otros caracteres especiales
                    const encodedSrc = originalSrc.replace(/ /g, '%20')
                        .replace(/\(/g, '%28')
                        .replace(/\)/g, '%29');
                    img.src = encodedSrc;
                }
            }
            
            // Agregar atributos de carga si no existen
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'eager');
            }
            if (!img.hasAttribute('decoding')) {
                img.setAttribute('decoding', 'async');
            }
            
            // Asegurar que las imágenes se muestren correctamente
            img.style.display = 'block';
            img.style.visibility = 'visible';
            img.style.opacity = '1';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'contain';
        });
    }
    
    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixSponsorImages);
    } else {
        fixSponsorImages();
    }
    
    // También ejecutar después de un pequeño delay para asegurar que todo esté cargado
    setTimeout(fixSponsorImages, 500);
})();

