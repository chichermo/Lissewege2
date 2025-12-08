# R.F.C. Lissewege - Sitio Web Moderno

Sitio web moderno y dinámico para el club de fútbol R.F.C. Lissewege, reconstruido con un diseño innovador, más contenido y mejor experiencia de usuario.

## 🚀 Características

- **Diseño Moderno**: Interfaz limpia y profesional con animaciones suaves
- **Totalmente Responsive**: Optimizado para todos los dispositivos (móvil, tablet, desktop)
- **Navegación Intuitiva**: Menú fijo con scroll suave y indicadores activos
- **Secciones Mejoradas**:
  - Hero section con estadísticas animadas
  - Sobre Nosotros con tarjetas informativas
  - Equipos con información detallada
  - Noticias y actualizaciones
  - Galería de imágenes
  - Calendario de eventos
  - Lista de precios actualizada
  - Información del equipo
  - Patrocinadores
  - Formulario de contacto
  - Suscripción a newsletter

## 📁 Estructura del Proyecto

```
Lissewege/
├── index.html          # Página principal
├── styles/
│   └── main.css        # Estilos principales
├── scripts/
│   └── main.js         # JavaScript para interactividad
└── README.md           # Documentación
```

## 🎨 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con variables CSS, flexbox y grid
- **JavaScript (Vanilla)**: Interactividad sin dependencias
- **Font Awesome**: Iconos
- **Google Fonts (Poppins)**: Tipografía moderna

## 🚀 Cómo Usar

1. Abre `index.html` en tu navegador
2. O sirve los archivos usando un servidor local:
   ```bash
   # Con Python
   python -m http.server 8000
   
   # Con Node.js (http-server)
   npx http-server
   ```

## 📱 Secciones del Sitio

### Home
- Hero section con llamada a la acción
- Estadísticas animadas del club
- Diseño impactante con animaciones

### Over Ons (Sobre Nosotros)
- Misión, visión y valores del club
- Información sobre la filosofía del club

### Teams (Equipos)
- Información de todos los equipos juveniles
- Detalles de entrenamientos y ubicación
- Destacado especial para el nuevo equipo U15

### Nieuws (Noticias)
- Últimas actualizaciones del club
- Noticias destacadas y eventos importantes

### Galerij (Galería)
- Galería de imágenes con efecto hover
- Momentos destacados del club

### Kalender (Calendario)
- Próximos eventos y partidos
- Fechas importantes del club

### Prijslijst (Lista de Precios)
- Membresías y productos disponibles
- Tarjetas de precios claras y atractivas

### Team (Equipo)
- Información sobre entrenadores, directivos y árbitros
- Tarjetas con información de contacto

### Sponsors (Patrocinadores)
- Sección para mostrar patrocinadores
- Llamada a la acción para nuevos patrocinadores

### Contact (Contacto)
- Información de contacto completa
- Formulario de contacto funcional
- Mapa de ubicación (preparado para integración)

## 🎯 Mejoras Implementadas

1. **Diseño Visual**:
   - Paleta de colores moderna y profesional
   - Animaciones suaves y transiciones
   - Efectos hover interactivos
   - Diseño de tarjetas moderno

2. **Experiencia de Usuario**:
   - Navegación intuitiva y fácil
   - Scroll suave entre secciones
   - Menú móvil responsive
   - Formularios con validación

3. **Contenido**:
   - Más secciones que el sitio original
   - Información más detallada
   - Mejor organización del contenido
   - Llamadas a la acción claras

4. **Rendimiento**:
   - Código optimizado
   - Lazy loading de imágenes
   - Animaciones con Intersection Observer
   - Sin dependencias pesadas

## 🔧 Personalización

### Colores
Los colores principales se pueden cambiar en las variables CSS en `styles/main.css`:

```css
:root {
    --primary-color: #1a5f3f;
    --secondary-color: #2d8f5f;
    --accent-color: #ff6b35;
    /* ... más variables */
}
```

### Contenido
Todo el contenido está en `index.html` y puede ser fácilmente modificado.

### Imágenes
Las imágenes actualmente usan URLs de Pexels. Puedes reemplazarlas con imágenes propias del club.

## 📞 Información de Contacto

- **Dirección**: Pol Dhondtstraat 70, 8380 Lissewege
- **Teléfono**: 0477 792 803
- **Email**: rfcl@telenet.be

## 📝 Notas

- El formulario de contacto actualmente muestra una alerta. Para producción, necesitarás integrar con un backend.
- Las imágenes son placeholders de Pexels. Reemplázalas con fotos reales del club.
- Los enlaces de redes sociales están preparados pero apuntan a "#" - actualiza con los enlaces reales.

## 🌐 Compatibilidad

- Chrome (últimas versiones)
- Firefox (últimas versiones)
- Safari (últimas versiones)
- Edge (últimas versiones)
- Navegadores móviles modernos

## 🔌 Integración con APIs Reales

El sitio está preparado para conectarse a APIs reales de fútbol para obtener:
- **Partidos en tiempo real**
- **Tablas de posiciones actualizadas**
- **Estadísticas de equipos**
- **Logos de equipos**

### Configuración de APIs

1. **API-Football (RapidAPI)**
   - Registro: https://rapidapi.com/api-sports/api/api-football
   - Tier gratuito: 100 requests/día
   - Agrega tu API key en `scripts/api-config.js`

2. **Football-Data.org**
   - Registro: https://www.football-data.org/register
   - Tier gratuito: 10 requests/minuto
   - Agrega tu token en `scripts/api-config.js`

Ver `API_SETUP.md` para instrucciones detalladas.

### Logos de Equipos

Para agregar logos reales:
1. Descarga los logos de los equipos
2. Guárdalos en `/images/logos/teams/`
3. Agrega el mapeo en `scripts/team-logos.js`

El sistema intentará obtener logos automáticamente con fallback al logo del club.

## 📄 Licencia

Este proyecto fue creado para R.F.C. Lissewege.

---

**Desarrollado con ❤️ para R.F.C. Lissewege**

