// ============================================
// PLAYERS DATA SCHEMA
// ============================================
// Este archivo contiene el esquema y los datos de los jugadores
// Los datos se pueden actualizar cuando se proporcionen las fotos y nombres

// Esquema de datos para cada jugador:
/*
{
    id: string,              // ID único del jugador
    firstName: string,        // Nombre
    lastName: string,         // Apellido
    fullName: string,        // Nombre completo (opcional, se genera si no se proporciona)
    photo: string,          // Ruta a la foto del jugador (placeholder por ahora)
    jerseyNumber: number,    // Número de camiseta
    position: string,         // Posición: 'GK' (Portero), 'DF' (Defensa), 'MF' (Mediocampista), 'FW' (Delantero)
    positionFull: string,     // Nombre completo de la posición en holandés
    age: number,             // Edad
    birthYear: number,      // Año de nacimiento
    team: string,            // Equipo: 'u7', 'u8', 'u9', 'u10', 'u13', 'u15'
    height: number,          // Altura en cm (opcional)
    joinedYear: number,      // Año en que se unió al club (opcional)
    isCaptain: boolean,      // ¿Es capitán? (opcional)
    isViceCaptain: boolean  // ¿Es vice-capitán? (opcional)
}
*/

// Datos de jugadores por equipo
// NOTA: Estos son datos de ejemplo basados en la información proporcionada
// Se actualizarán cuando se proporcionen las fotos y nombres reales

const PLAYERS_DATA = {
    // Primer Equipo (Eerste Elftallen B) - Basado en Voetbal Vlaanderen
    // Estos jugadores pueden estar en U13 o U15 dependiendo de su edad
    eersteElftallen: [
        {
            id: 'player-001',
            firstName: 'Jurgen',
            lastName: 'Belpaire',
            photo: '/images/players/jurgen-belpaire.jpg', // Placeholder
            jerseyNumber: 1,
            position: 'GK',
            positionFull: 'Doelman',
            age: 52,
            birthYear: 1973,
            team: 'u13', // o 'u15' dependiendo de la categoría real
            height: null,
            joinedYear: null,
            isCaptain: false,
            isViceCaptain: false
        },
        {
            id: 'player-002',
            firstName: 'Nana',
            lastName: 'Osei-Berkoe',
            photo: '/images/players/nana-osei-berkoe.jpg', // Placeholder
            jerseyNumber: 9,
            position: 'FW',
            positionFull: 'Aanvaller',
            age: 34,
            birthYear: 1991,
            team: 'u13', // o 'u15' dependiendo de la categoría real
            height: null,
            joinedYear: null,
            isCaptain: false,
            isViceCaptain: false
        },
        {
            id: 'player-003',
            firstName: 'Amijs',
            lastName: 'Damon',
            photo: '/images/players/amijs-damon.jpg', // Placeholder
            jerseyNumber: null,
            position: 'MF',
            positionFull: 'Middenvelder',
            age: null,
            birthYear: null,
            team: 'u13',
            height: null,
            joinedYear: null,
            isCaptain: false,
            isViceCaptain: false
        },
        {
            id: 'player-004',
            firstName: 'Antonio',
            lastName: 'Adao',
            photo: '/images/players/antonio-adao.jpg', // Placeholder
            jerseyNumber: null,
            position: 'DF',
            positionFull: 'Verdediger',
            age: null,
            birthYear: null,
            team: 'u13',
            height: null,
            joinedYear: null,
            isCaptain: false,
            isViceCaptain: false
        },
        {
            id: 'player-005',
            firstName: 'Billiet',
            lastName: 'Billie',
            photo: '/images/players/billiet-billie.jpg', // Placeholder
            jerseyNumber: null,
            position: 'MF',
            positionFull: 'Middenvelder',
            age: null,
            birthYear: null,
            team: 'u13',
            height: null,
            joinedYear: null,
            isCaptain: false,
            isViceCaptain: false
        },
        {
            id: 'player-006',
            firstName: 'Borrizée',
            lastName: 'Jaron',
            photo: '/images/players/borrizee-jaron.jpg', // Placeholder
            jerseyNumber: null,
            position: 'FW',
            positionFull: 'Aanvaller',
            age: null,
            birthYear: null,
            team: 'u13',
            height: null,
            joinedYear: null,
            isCaptain: false,
            isViceCaptain: false
        },
        {
            id: 'player-007',
            firstName: 'Bossuyt',
            lastName: 'Björn',
            photo: '/images/players/bossuyt-bjorn.jpg', // Placeholder
            jerseyNumber: null,
            position: 'DF',
            positionFull: 'Verdediger',
            age: null,
            birthYear: null,
            team: 'u13',
            height: null,
            joinedYear: null,
            isCaptain: false,
            isViceCaptain: false
        },
        {
            id: 'player-008',
            firstName: 'Braems',
            lastName: 'Gino',
            photo: '/images/players/braems-gino.jpg', // Placeholder
            jerseyNumber: null,
            position: 'MF',
            positionFull: 'Middenvelder',
            age: null,
            birthYear: null,
            team: 'u13',
            height: null,
            joinedYear: null,
            isCaptain: false,
            isViceCaptain: false
        },
        {
            id: 'player-009',
            firstName: 'Clevers',
            lastName: 'Fabrice',
            photo: '/images/players/clevers-fabrice.jpg', // Placeholder
            jerseyNumber: null,
            position: 'DF',
            positionFull: 'Verdediger',
            age: null,
            birthYear: null,
            team: 'u13',
            height: null,
            joinedYear: null,
            isCaptain: false,
            isViceCaptain: false
        },
        {
            id: 'player-010',
            firstName: 'Compernolle',
            lastName: 'Dante',
            photo: '/images/players/compernolle-dante.jpg', // Placeholder
            jerseyNumber: null,
            position: 'FW',
            positionFull: 'Aanvaller',
            age: null,
            birthYear: null,
            team: 'u13',
            height: null,
            joinedYear: null,
            isCaptain: false,
            isViceCaptain: false
        }
        // Más jugadores se agregarán cuando se proporcionen las fotos y nombres
    ],

    // U7 Team - Mini's (Geboren 2018-2019)
    u7: [
        // Se agregarán cuando se proporcionen las fotos y nombres
    ],

    // U8 Team - Benjamins (Geboren 2017)
    u8: [
        // Se agregarán cuando se proporcionen las fotos y nombres
    ],

    // U9 Team - Preminiemen (Geboren 2016)
    u9: [
        // Se agregarán cuando se proporcionen las fotos y nombres
    ],

    // U10 Team - Miniemen (Geboren 2015)
    u10: [
        // Se agregarán cuando se proporcionen las fotos y nombres
    ],

    // U13 Team - Pupillen (Geboren 2012-2013)
    u13: [
        // Algunos jugadores del primer equipo pueden estar aquí
        // Se agregarán cuando se proporcionen las fotos y nombres
    ],

    // U15 Team - Nieuw Team! (Geboren 2011-2013)
    u15: [
        // Se agregarán cuando se proporcionen las fotos y nombres
    ]
};

// Función helper para obtener el nombre completo
function getFullName(player) {
    if (player.fullName) {
        return player.fullName;
    }
    return `${player.firstName} ${player.lastName}`;
}

// Función helper para obtener la ruta de la foto (con fallback)
function getPlayerPhoto(player) {
    if (player.photo && player.photo !== '/images/players/placeholder.jpg') {
        return player.photo;
    }
    return null; // Retornar null para usar el placeholder del CSS
}

// Función helper para obtener el color de la posición
function getPositionColor(position) {
    const colors = {
        'GK': '#ef4444',    // Rojo para porteros
        'DF': '#3b82f6',    // Azul para defensas
        'MF': '#10b981',    // Verde para mediocampistas
        'FW': '#f59e0b'     // Naranja para delanteros
    };
    return colors[position] || '#6b7280';
}

// Función helper para obtener el icono de la posición
function getPositionIcon(position) {
    const icons = {
        'GK': 'fas fa-hand-paper',      // Portero
        'DF': 'fas fa-shield-alt',      // Defensa
        'MF': 'fas fa-circle',          // Mediocampista
        'FW': 'fas fa-bullseye'          // Delantero
    };
    return icons[position] || 'fas fa-user';
}

// Exportar datos y funciones
window.PLAYERS_DATA = PLAYERS_DATA;
window.getFullName = getFullName;
window.getPlayerPhoto = getPlayerPhoto;
window.getPositionColor = getPositionColor;
window.getPositionIcon = getPositionIcon;

