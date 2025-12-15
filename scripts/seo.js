// ============================================
// SEO ENHANCEMENTS
// ============================================
function initSEO() {
    // Update meta tags dynamically based on current page
    updateMetaTags();

    // Add structured data (Schema.org)
    addStructuredData();

    // Add Open Graph tags
    addOpenGraphTags();
}

function updateMetaTags() {
    const currentPage = window.location.hash.substring(1) || 'home';
    const pageData = {
        'home': {
            title: 'R.F.C. Lissewege - Voetbalclub in Lissewege, Brugge',
            description: 'R.F.C. Lissewege - Samen sterk, op naar de overwinning! Voetbalclub in Lissewege, Brugge. Jeugdteams, trainingen en activiteiten.',
            keywords: 'voetbal, Lissewege, Brugge, jeugdvoetbal, voetbalclub, RFC Lissewege'
        },
        'teams': {
            title: 'Teams - R.F.C. Lissewege',
            description: 'Ontdek onze jeugdteams bij R.F.C. Lissewege. Van U7 tot U15, voor elke leeftijd een passend team.',
            keywords: 'voetbalteams, jeugdteams, Lissewege, voetbal'
        },
        'contact': {
            title: 'Contact - R.F.C. Lissewege',
            description: 'Neem contact op met R.F.C. Lissewege. Adres: Pol Dhondtstraat 70, 8380 Lissewege. Tel: 0477 792 803',
            keywords: 'contact, RFC Lissewege, adres, telefoon'
        }
    };

    const data = pageData[currentPage] || pageData['home'];
    
    document.title = data.title;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
    }
    metaDescription.content = data.description;

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = data.keywords;
}

function addStructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "SportsOrganization",
        "name": "R.F.C. Lissewege",
        "url": window.location.origin,
        "logo": window.location.origin + "/images/logos/100b.jpeg",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Pol Dhondtstraat 70",
            "addressLocality": "Lissewege",
            "postalCode": "8380",
            "addressCountry": "BE"
        },
        "telephone": "+32477792803",
        "email": "rfcl@telenet.be",
        "sport": "Soccer",
        "foundingDate": "1947"
    };

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
}

function addOpenGraphTags() {
    const ogTags = {
        'og:title': 'R.F.C. Lissewege - Voetbalclub',
        'og:description': 'R.F.C. Lissewege - Samen sterk, op naar de overwinning!',
        'og:type': 'website',
        'og:url': window.location.href,
        'og:image': window.location.origin + '/images/logos/100b.jpeg',
        'og:locale': 'nl_BE'
    };

    Object.entries(ogTags).forEach(([property, content]) => {
        let tag = document.querySelector(`meta[property="${property}"]`);
        if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute('property', property);
            document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
    });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSEO);
} else {
    initSEO();
}

// Update on page change
document.addEventListener('pageChanged', (e) => {
    if (e.detail && e.detail.pageId) {
        setTimeout(updateMetaTags, 100);
    }
});

