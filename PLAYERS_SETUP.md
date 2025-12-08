# Guía para Agregar Jugadores

Este documento explica cómo agregar información de jugadores a la sección "Spelers" del sitio web.

## Estructura de Datos

Los datos de los jugadores se almacenan en `scripts/players-data.js` en el objeto `PLAYERS_DATA`.

### Esquema de Datos para Cada Jugador

```javascript
{
    id: string,              // ID único del jugador (ej: 'player-001')
    firstName: string,       // Nombre (ej: 'Jurgen')
    lastName: string,        // Apellido (ej: 'Belpaire')
    fullName: string,        // Nombre completo (opcional, se genera automáticamente si no se proporciona)
    photo: string,          // Ruta a la foto del jugador (ej: '/images/players/jurgen-belpaire.jpg')
    jerseyNumber: number,    // Número de camiseta (ej: 1)
    position: string,        // Posición corta: 'GK' (Portero), 'DF' (Defensa), 'MF' (Mediocampista), 'FW' (Delantero)
    positionFull: string,     // Nombre completo de la posición en holandés (ej: 'Doelman', 'Verdediger', 'Middenvelder', 'Aanvaller')
    age: number,             // Edad (opcional, se calcula automáticamente si se proporciona birthYear)
    birthYear: number,       // Año de nacimiento (opcional)
    team: string,            // Equipo: 'u7', 'u8', 'u9', 'u10', 'u13', 'u15'
    height: number,          // Altura en cm (opcional)
    joinedYear: number,      // Año en que se unió al club (opcional)
    isCaptain: boolean,      // ¿Es capitán? (opcional, default: false)
    isViceCaptain: boolean   // ¿Es vice-capitán? (opcional, default: false)
}
```

## Códigos de Posición

- **GK** (Doelman): Portero
- **DF** (Verdediger): Defensa
- **MF** (Middenvelder): Mediocampista
- **FW** (Aanvaller): Delantero

## Equipos Disponibles

- **u7**: U7 Team - Mini's (Geboren 2018-2019)
- **u8**: U8 Team - Benjamins (Geboren 2017)
- **u9**: U9 Team - Preminiemen (Geboren 2016)
- **u10**: U10 Team - Miniemen (Geboren 2015)
- **u13**: U13 Team - Pupillen (Geboren 2012-2013)
- **u15**: U15 Team - Nieuw Team! (Geboren 2011-2013)
- **eersteElftallen**: Primer Equipo (Eerste Elftallen B)

## Cómo Agregar un Jugador

### Paso 1: Preparar la Foto

1. Coloca la foto del jugador en el directorio `images/players/`
2. Usa un nombre descriptivo, por ejemplo: `jurgen-belpaire.jpg`
3. Formatos recomendados: JPG, PNG
4. Tamaño recomendado: mínimo 400x400px, preferiblemente cuadrada

### Paso 2: Agregar los Datos

Abre `scripts/players-data.js` y agrega el jugador al array correspondiente del equipo:

```javascript
{
    id: 'player-011',                    // ID único (incrementar el número)
    firstName: 'Nombre',
    lastName: 'Apellido',
    photo: '/images/players/nombre-apellido.jpg',
    jerseyNumber: 10,
    position: 'FW',
    positionFull: 'Aanvaller',
    age: 25,                              // Opcional
    birthYear: 2000,                      // Opcional (si no se proporciona age)
    team: 'u13',                          // Equipo al que pertenece
    height: 175,                          // Opcional
    joinedYear: 2020,                     // Opcional
    isCaptain: false,                     // Opcional
    isViceCaptain: false                  // Opcional
}
```

### Ejemplo Completo

```javascript
// En scripts/players-data.js, dentro del array del equipo correspondiente:
u13: [
    // ... otros jugadores ...
    {
        id: 'player-011',
        firstName: 'Jan',
        lastName: 'Janssen',
        photo: '/images/players/jan-janssen.jpg',
        jerseyNumber: 7,
        position: 'MF',
        positionFull: 'Middenvelder',
        birthYear: 2012,
        team: 'u13',
        height: 160,
        joinedYear: 2023,
        isCaptain: false,
        isViceCaptain: false
    }
]
```

## Características Especiales

### Capitán y Vice-Capitán

Los jugadores con `isCaptain: true` o `isViceCaptain: true` mostrarán una insignia especial en su tarjeta.

### Ordenamiento

Los jugadores se ordenan automáticamente por:
1. Número de camiseta (si existe)
2. Apellido (si no hay número de camiseta)

### Placeholders

Si un jugador no tiene foto, se mostrará un icono de usuario como placeholder. El sistema maneja automáticamente los errores de carga de imágenes.

## Actualización en Tiempo Real

Los cambios en `scripts/players-data.js` se reflejarán automáticamente al recargar la página. No es necesario modificar otros archivos.

## Notas

- Los campos opcionales pueden omitirse del objeto
- Si no se proporciona `age` pero sí `birthYear`, la edad se calculará automáticamente
- Si no se proporciona `fullName`, se generará automáticamente como `firstName + ' ' + lastName`
- Las fotos deben estar en formato relativo desde la raíz del sitio: `/images/players/nombre.jpg`

