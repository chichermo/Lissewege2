// ============================================
// TESTIMONIALS SECTION
// ============================================
function initTestimonials() {
    const aboutSection = document.getElementById('over-ons');
    if (!aboutSection) return;

    // Create testimonials section
    const testimonialsHTML = `
        <div class="testimonials-section">
            <div class="section-header">
                <span class="section-tag">Testimonials</span>
                <h2 class="section-title">Wat Zeggen Onze Leden?</h2>
            </div>
            <div class="testimonials-carousel" id="testimonialsCarousel">
                <div class="testimonial-item">
                    <div class="testimonial-content">
                        <div class="testimonial-stars">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <p class="testimonial-text">"Mijn zoon heeft zoveel geleerd bij RFC Lissewege. De trainers zijn geweldig en de sfeer is fantastisch!"</p>
                        <div class="testimonial-author">
                            <div class="testimonial-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="testimonial-info">
                                <h4>Ouder van U10 speler</h4>
                                <p>Lid sinds 2023</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="testimonial-item">
                    <div class="testimonial-content">
                        <div class="testimonial-stars">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <p class="testimonial-text">"Een geweldige club met een echte familiegevoel. Mijn dochter voelt zich hier helemaal thuis!"</p>
                        <div class="testimonial-author">
                            <div class="testimonial-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="testimonial-info">
                                <h4>Ouder van U8 speler</h4>
                                <p>Lid sinds 2024</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    aboutSection.insertAdjacentHTML('beforeend', testimonialsHTML);

    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
        .testimonials-section {
            margin-top: 5rem;
            padding-top: 5rem;
            border-top: 2px solid rgba(13, 77, 46, 0.1);
        }
        .testimonials-carousel {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        .testimonial-item {
            background: var(--white);
            padding: 2.5rem;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            border: 1px solid rgba(13, 77, 46, 0.08);
        }
        .testimonial-stars {
            color: #fbbf24;
            margin-bottom: 1.5rem;
            font-size: 1.25rem;
        }
        .testimonial-text {
            font-size: 1.1rem;
            line-height: 1.8;
            color: var(--text-color);
            margin-bottom: 2rem;
            font-style: italic;
        }
        .testimonial-author {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        .testimonial-avatar {
            width: 60px;
            height: 60px;
            background: var(--gradient-primary);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--white);
            font-size: 1.5rem;
        }
        .testimonial-info h4 {
            font-size: 1rem;
            font-weight: 700;
            color: var(--dark-color);
            margin-bottom: 0.25rem;
        }
        .testimonial-info p {
            font-size: 0.85rem;
            color: var(--text-light);
            margin: 0;
        }
    `;
    document.head.appendChild(style);
}

// Initialize when about section is shown
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initTestimonials, 500);
    });
} else {
    setTimeout(initTestimonials, 500);
}

