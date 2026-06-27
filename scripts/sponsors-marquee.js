// Sponsors marquee — barra superior
const SPONSOR_MARQUEE = [
    { href: 'https://www.bossypaints.be/', src: 'images/sponsors/Bossy.jpeg', alt: 'Bossypain' },
    { href: 'https://www.jovado.be/', src: 'images/sponsors/Jovado.jpeg', alt: 'KOFFIE JOVADO' },
    { href: 'https://ks-construct-kh.be/', src: 'images/sponsors/LOGO tcd.jpeg', alt: 'KS CONSTRUCT' },
    { href: 'https://visitlissewege.be/cafe-den-ouden-toren-lissewege/', src: 'images/sponsors/Den ouden toren.jpeg', alt: 'Den Ouden Toren' },
    { href: 'https://dauwens.be/', src: 'images/sponsors/1 dauwens-5.jpeg', alt: 'Dauwens' },
    { href: 'https://denieuweblauwetoren.be/', src: 'images/sponsors/blauwe toren klein.jpeg', alt: 'Blauwe Toren' },
    { href: 'https://voetbalschool-legein.webnode.be/', src: 'images/sponsors/voetbalschool_Devriendt_Logo-04.jpeg', alt: 'Voetbalschool Devriendt-Lebein' },
    { href: 'https://www.facebook.com/p/MAX-dak-en-schrijnwerken-100057594483544/', src: 'images/sponsors/max nieuw.jpeg', alt: "MAX' Dak- en Schrijnwerken" },
    { href: 'https://www.terdoest.be/nl/', src: 'images/sponsors/jenko  terdoest.jpeg', alt: 'Hostellerie Ter Doest' },
    { href: 'https://nl.flandersroadservices.com/', src: 'images/sponsors/LOGO FRS (003).jpeg', alt: 'Flanders Road Services' },
    { href: 'https://www.contrast-interieur.be/', src: 'images/sponsors/Logo_Contrast_Interieur.png', alt: 'Contrast' },
    { href: 'https://staelen.be/', src: 'images/sponsors/Logo_Staelen_Nick_opt-768x513.png', alt: 'Staelen Nick' }
];

function initSponsorsMarquee() {
    const track = document.getElementById('sponsorsTopbarTrack');
    if (!track) return;

    const items = [...SPONSOR_MARQUEE, ...SPONSOR_MARQUEE];
    track.innerHTML = items.map((s) => {
        const safeAlt = s.alt.replace(/'/g, "\\'");
        return `<a href="${s.href}" target="_blank" rel="noopener noreferrer" class="sponsors-topbar-item" title="${s.alt}">
            <img src="${s.src}" alt="${s.alt}" loading="lazy" decoding="async" onerror="this.style.opacity='0.4'">
        </a>`;
    }).join('');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSponsorsMarquee);
} else {
    initSponsorsMarquee();
}
