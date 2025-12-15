// ============================================
// COMPETITIONS DATA - BELGIAN FOOTBALL STRUCTURE
// ============================================
// Datos estructurados sobre el sistema de competencias belgas
// Extraído de información de voetbalinbelgie.be

const BELGIAN_COMPETITIONS = {
    provinces: {
        'west-vlaanderen': {
            name: 'West-Vlaanderen',
            nameNL: 'West-Vlaanderen',
            nameFR: 'Flandre-Occidentale',
            code: 'WV',
            divisions: {
                mannen: {
                    '1': { name: '1e Provinciale', level: 1 },
                    '2a': { name: '2e Provinciale A', level: 2 },
                    '2b': { name: '2e Provinciale B', level: 2 },
                    '3a': { name: '3e Provinciale A', level: 3 },
                    '3b': { name: '3e Provinciale B', level: 3 },
                    '3c': { name: '3e Provinciale C', level: 3 },
                    '4a': { name: '4e Provinciale A', level: 4 },
                    '4b': { name: '4e Provinciale B', level: 4 },
                    '4c': { name: '4e Provinciale C', level: 4 }, // RFC Lissewege está aquí
                    '4d': { name: '4e Provinciale D', level: 4 },
                    '4e': { name: '4e Provinciale E', level: 4 }
                },
                vrouwen: {
                    '1': { name: '1e Provinciale', level: 1 },
                    '2': { name: '2e Provinciale', level: 2 },
                    '3': { name: '3e Provinciale', level: 3 }
                }
            }
        },
        'oost-vlaanderen': {
            name: 'Oost-Vlaanderen',
            code: 'OV',
            divisions: {
                mannen: {
                    '1': { name: '1e Provinciale', level: 1 },
                    '2a': { name: '2e Provinciale A', level: 2 },
                    '2b': { name: '2e Provinciale B', level: 2 },
                    '2c': { name: '2e Provinciale C', level: 2 },
                    '3a': { name: '3e Provinciale A', level: 3 },
                    '3b': { name: '3e Provinciale B', level: 3 },
                    '3c': { name: '3e Provinciale C', level: 3 },
                    '3d': { name: '3e Provinciale D', level: 3 },
                    '3e': { name: '3e Provinciale E', level: 3 },
                    '4a': { name: '4e Provinciale A', level: 4 },
                    '4b': { name: '4e Provinciale B', level: 4 },
                    '4c': { name: '4e Provinciale C', level: 4 },
                    '4d': { name: '4e Provinciale D', level: 4 },
                    '4e': { name: '4e Provinciale E', level: 4 },
                    '4f': { name: '4e Provinciale F', level: 4 }
                }
            }
        },
        'antwerpen': {
            name: 'Antwerpen',
            code: 'A',
            divisions: {
                mannen: {
                    '1': { name: '1e Provinciale', level: 1 },
                    '2a': { name: '2e Provinciale A', level: 2 },
                    '2b': { name: '2e Provinciale B', level: 2 },
                    '3a': { name: '3e Provinciale A', level: 3 },
                    '3b': { name: '3e Provinciale B', level: 3 },
                    '3c': { name: '3e Provinciale C', level: 3 },
                    '4a': { name: '4e Provinciale A', level: 4 },
                    '4b': { name: '4e Provinciale B', level: 4 },
                    '4c': { name: '4e Provinciale C', level: 4 },
                    '4d': { name: '4e Provinciale D', level: 4 },
                    '4e': { name: '4e Provinciale E', level: 4 },
                    '4f': { name: '4e Provinciale F', level: 4 },
                    '4g': { name: '4e Provinciale G', level: 4 }
                }
            }
        }
    },
    
    national: {
        mannen: {
            'eerste-klasse-a': { name: 'Eerste klasse A', level: 1 },
            'eerste-klasse-b': { name: 'Eerste klasse B', level: 1 },
            'eerste-nationale-vv': { name: 'Eerste nationale VV', level: 2 },
            'tweede-afdeling-a': { name: 'Tweede afdeling A VV', level: 3 },
            'tweede-afdeling-b': { name: 'Tweede afdeling B VV', level: 3 },
            'derde-afdeling-a': { name: 'Derde afdeling A VV', level: 4 },
            'derde-afdeling-b': { name: 'Derde afdeling B VV', level: 4 }
        },
        vrouwen: {
            'eerste-klasse': { name: 'Eerste klasse (v)', level: 1 },
            'eerste-nationale': { name: 'Eerste nationale', level: 2 },
            'interprovinciale-a': { name: 'Interprovinciale A VV', level: 3 },
            'interprovinciale-b': { name: 'Interprovinciale B VV', level: 3 },
            'interprovinciale-c': { name: 'Interprovinciale ACFF', level: 3 }
        }
    }
};

// Información específica de RFC Lissewege
const RFC_LISSEWEGE_INFO = {
    clubName: 'RFC Lissewege',
    province: 'west-vlaanderen',
    division: '4c',
    gender: 'mannen',
    currentCompetition: '4e Provinciale C West-Vlaanderen',
    level: 4,
    location: {
        city: 'Lissewege',
        postalCode: '8380',
        address: 'Pol Dhondtstraat 70',
        province: 'West-Vlaanderen',
        region: 'Vlaanderen'
    },
    founded: 1947,
    website: 'https://www.rfclissewege.be',
    email: 'rfcl@telenet.be',
    phone: '0477 792 803'
};

// Función para obtener información de la competencia actual
function getCurrentCompetitionInfo() {
    const province = BELGIAN_COMPETITIONS.provinces[RFC_LISSEWEGE_INFO.province];
    const division = province.divisions[RFC_LISSEWEGE_INFO.gender][RFC_LISSEWEGE_INFO.division];
    
    return {
        ...division,
        province: province.name,
        provinceCode: province.code,
        fullName: `${division.name} ${province.name}`,
        level: division.level,
        clubInfo: RFC_LISSEWEGE_INFO
    };
}

// Función para obtener todas las divisiones de una provincia
function getProvinceDivisions(provinceCode, gender = 'mannen') {
    const province = BELGIAN_COMPETITIONS.provinces[provinceCode];
    if (!province) return null;
    
    return province.divisions[gender] || null;
}

// Exportar para uso global
window.BELGIAN_COMPETITIONS = BELGIAN_COMPETITIONS;
window.RFC_LISSEWEGE_INFO = RFC_LISSEWEGE_INFO;
window.getCurrentCompetitionInfo = getCurrentCompetitionInfo;
window.getProvinceDivisions = getProvinceDivisions;

