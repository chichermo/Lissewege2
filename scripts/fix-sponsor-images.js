// ============================================
// FIX SPONSOR IMAGES IN MOBILE BANNER
// ============================================
// Corrige las rutas de las imágenes de sponsors en el banner móvil
// codificando correctamente los espacios y agregando atributos de carga

(function() {
    'use strict';
    
    function encodeImagePath(path) {
        // Codificar espacios y caracteres especiales en la URL
        return path
            .replace(/ /g, '%20')
            .replace(/\(/g, '%28')
            .replace(/\)/g, '%29')
            .replace(/'/g, '%27');
    }
    
    function fixSponsorImages() {
        const sponsorImages = document.querySelectorAll('.sponsors-mobile-banner img, .sponsor-image, .sponsor-item img, .sponsors-track img');
        
        console.log(`[Fix Sponsor Images] Encontradas ${sponsorImages.length} imágenes en el banner móvil`);
        
        if (sponsorImages.length === 0) {
            console.warn('[Fix Sponsor Images] No se encontraron imágenes. El banner puede no estar visible aún.');
            return;
        }
        
        sponsorImages.forEach((img, index) => {
            // Obtener la ruta original del atributo src
            let originalSrc = img.getAttribute('src');
            
            if (!originalSrc) {
                console.warn(`[Fix Sponsor Images] Imagen ${index} no tiene atributo src`);
                return;
            }
            
            // Si la ruta tiene espacios o caracteres especiales, codificarla
            if (originalSrc.includes(' ') || originalSrc.includes('(') || originalSrc.includes(')')) {
                const encodedSrc = encodeImagePath(originalSrc);
                console.log(`[Fix Sponsor Images] Imagen ${index}: Codificando ruta "${originalSrc}" -> "${encodedSrc}"`);
                img.src = encodedSrc;
                originalSrc = encodedSrc; // Actualizar para el siguiente paso
            }
            
            // Si la imagen ya tiene una src pero no se está mostrando, forzar recarga
            if (img.complete && img.naturalHeight === 0 && img.naturalWidth === 0) {
                console.warn(`[Fix Sponsor Images] Imagen ${index} parece estar rota, reintentando carga: ${originalSrc}`);
                const currentSrc = img.src;
                img.src = '';
                setTimeout(() => {
                    img.src = currentSrc;
                }, 100);
            }
            
            // Agregar atributos de carga si no existen
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'eager');
            }
            if (!img.hasAttribute('decoding')) {
                img.setAttribute('decoding', 'async');
            }
            
            // Agregar manejador de errores para debug
            img.addEventListener('error', function(e) {
                console.error(`[Fix Sponsor Images] Error cargando imagen: ${this.src}`);
                // Intentar cargar con ruta codificada si aún no está codificada
                const currentSrc = this.getAttribute('src');
                if (currentSrc && currentSrc.includes(' ')) {
                    const encodedSrc = encodeImagePath(currentSrc);
                    console.log(`[Fix Sponsor Images] Reintentando con ruta codificada: ${encodedSrc}`);
                    this.src = encodedSrc;
                }
            });
            
            img.addEventListener('load', function() {
                console.log(`[Fix Sponsor Images] Imagen cargada exitosamente: ${this.src}`);
            });
            
            // Asegurar que las imágenes se muestren correctamente
            img.style.display = 'block';
            img.style.visibility = 'visible';
            img.style.opacity = '1';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'contain';
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';
            
            // Forzar recarga si la imagen ya estaba cargada pero no se muestra
            if (img.complete && img.naturalHeight === 0) {
                const currentSrc = img.src;
                img.src = '';
                setTimeout(() => {
                    img.src = currentSrc;
                }, 100);
            }
        });
    }
    
    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixSponsorImages);
    } else {
        fixSponsorImages();
    }
    
    // También ejecutar después de delays para asegurar que todo esté cargado
    setTimeout(fixSponsorImages, 500);
    setTimeout(fixSponsorImages, 1000);
    setTimeout(fixSponsorImages, 2000);
    
    // Escuchar cambios en la sección de sponsors
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                const hasSponsorImages = Array.from(mutation.addedNodes).some(node => 
                    node.nodeType === 1 && (
                        node.classList?.contains('sponsors-mobile-banner') ||
                        node.querySelector?.('.sponsors-mobile-banner')
                    )
                );
                if (hasSponsorImages) {
                    setTimeout(fixSponsorImages, 100);
                }
            }
        });
    });
    
    // Observar cambios en el documento
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    window.fixSponsorImages = fixSponsorImages;
})();

