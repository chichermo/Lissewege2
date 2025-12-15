// ============================================
// TEAM LOGOS FETCHER - Obtener logos desde APIs
// ============================================

// Mapeo de nombres de equipos a posibles fuentes de logos
const TEAM_LOGO_SOURCES = {
    // RFC Lissewege - Ya tenemos el logo
    'RFC Lissewege': '/images/logos/100b.jpeg',
    'R.F.C. Lissewege': '/images/logos/100b.jpeg',

    // Intentar obtener logos desde APIs o crear placeholders
    'KVV Aartrijke': null,
    'KFC Damme': null,
    'VV Eendracht Brugge': null,
    'KSK Steenbrugge': null,
    'KFC Sint-Joris Sportief': null,
    'K. Excelsior Zedelgem B': null,
    'KSKD Hertsberge': null,
    'VVC Beernem B': null,
    'VKSO Zerkegem B': null,
    'KFC Heist B': null,
    'FC Zeebrugge': null,
    'KSV Bredene B': null,
    'VC Vamos Zandvoorde': null
};

// Función para generar un logo placeholder con las iniciales del equipo
function generatePlaceholderLogo(teamName) {
    // Extraer iniciales del nombre del equipo
    const words = teamName.split(' ').filter(word => {
        // Filtrar palabras comunes que no queremos en las iniciales
        const skipWords = ['FC', 'KFC', 'KVV', 'VV', 'VC', 'KSK', 'KSKD', 'VKSO', 'VVC', 'KSV', 'K.', 'B'];
        return !skipWords.includes(word.toUpperCase());
    });

    let initials = '';
    if (words.length >= 2) {
        // Tomar primera letra de las dos primeras palabras significativas
        initials = words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
    } else if (words.length === 1) {
        // Si solo hay una palabra, tomar las dos primeras letras
        initials = words[0].substring(0, 2).toUpperCase();
    } else {
        // Fallback: tomar las primeras dos letras del nombre completo
        initials = teamName.replace(/[^A-Za-z]/g, '').substring(0, 2).toUpperCase();
    }

    // Crear un SVG con las iniciales
    const svg = `
        <svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad-${teamName.replace(/[^A-Za-z0-9]/g, '')}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#1a7a4a;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#0d4d2e;stop-opacity:1" />
                </linearGradient>
            </defs>
            <circle cx="40" cy="40" r="38" fill="url(#grad-${teamName.replace(/[^A-Za-z0-9]/g, '')})" stroke="#fff" stroke-width="2"/>
            <text x="40" y="40" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle" dominant-baseline="central">${initials}</text>
        </svg>
    `;

    // Convertir SVG a data URL
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    return URL.createObjectURL(blob);
}

// Función para intentar obtener logo desde Clearbit Logo API
async function fetchLogoFromClearbit(teamName) {
    // Limpiar el nombre del equipo para la API
    const cleanName = teamName
        .replace(/FC|KFC|KVV|VV|VC|KSK|KSKD|VKSO|VVC|KSV|K\./g, '')
        .replace(/\s+B$/, '') // Remover " B" al final
        .trim();

    // Intentar diferentes variaciones del nombre
    const variations = [
        cleanName,
        cleanName.replace(/\s+/g, ''),
        cleanName.split(' ')[0] // Primera palabra
    ];

    for (const variation of variations) {
        try {
            const url = `https://logo.clearbit.com/${variation.toLowerCase().replace(/\s+/g, '')}.com`;
            const response = await fetch(url, { method: 'HEAD' });
            if (response.ok) {
                return url;
            }
        } catch (error) {
            // Continuar con la siguiente variación
            continue;
        }
    }

    return null;
}

// Función para obtener logo desde Football-Data.org (si está disponible)
async function fetchLogoFromFootballData(teamName) {
    // Esta función requeriría una API key y acceso a Football-Data.org
    // Por ahora, retornamos null
    return null;
}

// Función principal para obtener logo de un equipo
async function getTeamLogoAsync(teamName) {
    // Verificar si ya tenemos el logo en el mapeo
    if (TEAM_LOGO_SOURCES[teamName] && TEAM_LOGO_SOURCES[teamName] !== null) {
        return TEAM_LOGO_SOURCES[teamName];
    }

    // Verificar si existe en el sistema de logos existente
    if (window.getTeamLogo) {
        const existingLogo = window.getTeamLogo(teamName);
        if (existingLogo && existingLogo !== '/images/logos/100b.jpeg') {
            // Verificar si el archivo existe (solo en producción con servidor)
            return existingLogo;
        }
    }

    // Intentar obtener desde Clearbit (solo para equipos conocidos)
    try {
        const clearbitLogo = await fetchLogoFromClearbit(teamName);
        if (clearbitLogo) {
            return clearbitLogo;
        }
    } catch (error) {
        console.warn(`Could not fetch logo from Clearbit for ${teamName}:`, error);
    }

    // Generar placeholder con iniciales
    return generatePlaceholderLogo(teamName);
}

// Función para actualizar todos los logos en la página
async function updateAllTeamLogos() {
    // Obtener todos los elementos que muestran logos de equipos
    const logoElements = document.querySelectorAll('[data-team-name], .team-logo-placeholder, .match-result-logo, .match-team-logo-small');

    for (const element of logoElements) {
        let teamName = element.getAttribute('data-team-name');

        // Si no tiene atributo, intentar obtener del contexto
        if (!teamName) {
            const parent = element.closest('.match-result-team, .match-team-upcoming, .team-home, .team-away');
            if (parent) {
                const nameElement = parent.querySelector('.team-name, .match-result-team-name');
                if (nameElement) {
                    teamName = nameElement.textContent.trim();
                }
            }
        }

        if (teamName) {
            try {
                const logoUrl = await getTeamLogoAsync(teamName);

                if (element.tagName === 'IMG') {
                    element.src = logoUrl;
                    element.onerror = function () {
                        this.src = generatePlaceholderLogo(teamName);
                    };
                } else {
                    // Check if img already exists inside container
                    let img = element.querySelector('img');
                    if (!img) {
                        img = document.createElement('img');
                        // Use correct class based on container context
                        img.className = element.className.includes('match-result-logo') ? 'match-result-logo' :
                            element.className.includes('match-team-logo-small') ? 'match-team-logo-small' :
                                'team-logo-img';
                        element.appendChild(img);
                    }

                    img.src = logoUrl;
                    img.alt = `${teamName} logo`;
                    img.onerror = function () {
                        this.src = generatePlaceholderLogo(teamName);
                    };

                    // Hide override icon if present
                    const icon = element.querySelector('i');
                    if (icon) {
                        icon.style.display = 'none';
                    }
                }
            } catch (error) {
                console.warn(`Error updating logo for ${teamName}:`, error);
            }
        }
    }
}

// Exportar funciones
window.getTeamLogoAsync = getTeamLogoAsync;
window.generatePlaceholderLogo = generatePlaceholderLogo;
window.updateAllTeamLogos = updateAllTeamLogos;

// Auto-actualizar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Esperar un poco para que otros scripts se carguen
    setTimeout(() => {
        updateAllTeamLogos();
    }, 1000);
});

