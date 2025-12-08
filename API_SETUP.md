# Configuración de APIs Reales

Este sitio está configurado para usar APIs reales de fútbol. Para activar las APIs, necesitas obtener las claves de API y configurarlas.

## APIs Disponibles

### 1. API-Football (RapidAPI)
- **URL**: https://rapidapi.com/api-sports/api/api-football
- **Tier Gratuito**: 100 requests/día
- **Registro**: https://rapidapi.com/api-sports/api/api-football

**Configuración:**
1. Regístrate en RapidAPI
2. Suscríbete al plan gratuito de API-Football
3. Copia tu API Key
4. Edita `scripts/football-api-real.js` y agrega tu clave:
```javascript
apiFootball: {
    key: 'TU_API_KEY_AQUI',
    headers: {
        'X-RapidAPI-Key': 'TU_API_KEY_AQUI',
        ...
    }
}
```

### 2. Football-Data.org
- **URL**: https://www.football-data.org/
- **Tier Gratuito**: 10 requests/minuto
- **Registro**: https://www.football-data.org/register

**Configuración:**
1. Regístrate en Football-Data.org
2. Obtén tu API Token
3. Edita `scripts/football-api-real.js` y agrega tu token:
```javascript
footballData: {
    key: 'TU_API_TOKEN_AQUI',
    headers: {
        'X-Auth-Token': 'TU_API_TOKEN_AQUI'
    }
}
```

## Logos de Equipos

### Opción 1: Subir logos manualmente
1. Descarga los logos de los equipos
2. Guárdalos en `/images/logos/teams/`
3. Nombra los archivos según el nombre del equipo (ej: `fc-brugge.png`)
4. Agrega el mapeo en `scripts/team-logos.js`:
```javascript
const TEAM_LOGOS = {
    'FC Brugge': '/images/logos/teams/fc-brugge.png',
    'RFC Lissewege': '/images/logos/100b.jpeg',
    // ... más equipos
};
```

### Opción 2: Usar API de logos
El código intentará obtener logos automáticamente de:
- Football-Data.org (si tienes team IDs)
- Clearbit Logo API
- Archivos locales

## Datos de la Liga Belga

### League IDs
- **Pro League**: BL1 (Football-Data.org) o 144 (API-Football)
- **First Division B**: BL2 (Football-Data.org)

### Nota sobre Ligas Juveniles
Las ligas juveniles belgas pueden no estar disponibles en todas las APIs públicas. Puedes:
1. Contactar directamente con la KBVB (Real Federación Belga de Fútbol)
2. Usar datos manuales actualizados regularmente
3. Integrar con sistemas de gestión de ligas locales

## Verificación

Después de configurar las APIs, abre la consola del navegador (F12) y verifica:
- Si las APIs están funcionando, verás datos reales
- Si no están configuradas, verás mensajes de advertencia pero el sitio seguirá funcionando con datos de respaldo

## Fallback

Si las APIs no están disponibles o fallan, el sitio usará datos de respaldo para mantener la funcionalidad.

