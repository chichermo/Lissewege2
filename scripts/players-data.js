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
            id: 'staff-001',
            fullName: 'Dieter Maenhout',
            photo: null,
            jerseyNumber: null,
            position: 'STAF',
            positionFull: 'Trainer',
            age: null,
            team: 'eersteElftallen'
        },
        {
            id: 'staff-002',
            fullName: 'Jenko',
            photo: null,
            jerseyNumber: null,
            position: 'STAF',
            positionFull: 'Assistent-trainer (TVJO)',
            age: null,
            team: 'eersteElftallen'
        },
        {
            id: 'staff-003',
            fullName: 'Kevin',
            photo: null,
            jerseyNumber: null,
            position: 'STAF',
            positionFull: 'Jeugdtrainer',
            age: null,
            team: 'eersteElftallen'
        },
        {
            id: 'staff-004',
            fullName: 'Stefaan',
            photo: null,
            jerseyNumber: null,
            position: 'STAF',
            positionFull: 'Jeugdtrainer',
            age: null,
            team: 'eersteElftallen'
        },
        {
            id: 'staff-005',
            fullName: 'Bjarne',
            photo: null,
            jerseyNumber: null,
            position: 'STAF',
            positionFull: 'Jeugdtrainer',
            age: null,
            team: 'eersteElftallen'
        },
        {
            id: 'staff-006',
            fullName: 'Ferdi',
            photo: null,
            jerseyNumber: null,
            position: 'STAF',
            positionFull: 'Jeugdtrainer',
            age: null,
            team: 'eersteElftallen'
        },
        {
            id: 'staff-007',
            fullName: 'Robin',
            photo: null,
            jerseyNumber: null,
            position: 'STAF',
            positionFull: 'Jeugdtrainer',
            age: null,
            team: 'eersteElftallen'
        },
        {
            id: 'staff-008',
            fullName: 'Dauwens Johan',
            photo: null,
            jerseyNumber: null,
            position: 'STAF',
            positionFull: 'Voorzitter',
            age: null,
            team: 'eersteElftallen'
        },
        {
            id: 'staff-009',
            fullName: 'Vandeweghe Jama',
            photo: null,
            jerseyNumber: null,
            position: 'STAF',
            positionFull: 'Secretaris GC',
            age: null,
            team: 'eersteElftallen'
        }
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
        'FW': '#f59e0b',    // Naranja para delanteros
        'STAF': '#8b5cf6'   // Púrpura para staff
    };
    return colors[position] || '#6b7280';
}

// Función helper para obtener el icono de la posición
function getPositionIcon(position) {
    const icons = {
        'GK': 'fas fa-hand-paper',      // Portero
        'DF': 'fas fa-shield-alt',      // Defensa
        'MF': 'fas fa-circle',          // Mediocampista
        'FW': 'fas fa-bullseye',         // Delantero
        'STAF': 'fas fa-user-tie'       // Staff icon
    };
    return icons[position] || 'fas fa-user';
}

// Exportar datos y funciones
window.PLAYERS_DATA = PLAYERS_DATA;
window.getFullName = getFullName;
window.getPlayerPhoto = getPlayerPhoto;
window.getPositionColor = getPositionColor;
window.getPositionIcon = getPositionIcon;

