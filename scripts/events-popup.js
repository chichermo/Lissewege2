document.addEventListener('DOMContentLoaded', () => {
    const popupOverlay = document.getElementById('eventPopupOverlay');
    if (!popupOverlay) return;

    const popupImage = document.getElementById('eventPopupImage');
    const popupTag = document.getElementById('eventPopupTag');
    const popupTitle = document.getElementById('eventPopupTitle');
    const popupDescription = document.getElementById('eventPopupDescription');
    const popupCounter = document.getElementById('eventPopupCounter');
    const closeBtn = popupOverlay.querySelector('.event-popup-close');
    const prevBtn = document.getElementById('eventPopupPrev');
    const nextBtn = document.getElementById('eventPopupNext');

    if (!popupImage || !popupTitle || !popupDescription || !closeBtn || !prevBtn || !nextBtn) {
        return;
    }

    const events = [
        {
            title: 'Event 1',
            description: 'Ontdek het speciale clubevent van dit jaar en mis geen enkele update.',
            image: 'images/1.jpg',
            tag: 'Event 2026'
        },
        {
            title: 'Event 2',
            description: 'Een ontmoeting voor de hele RFC Lissewege-familie.',
            image: 'images/2.jpg',
            tag: 'Event 2026'
        }
    ];

    let currentIndex = 0;
    let previousBodyOverflow = '';
    let autoOpened = false;

    const renderPopup = () => {
        const eventData = events[currentIndex];
        popupImage.src = eventData.image;
        popupImage.alt = eventData.title;
        popupTag.textContent = eventData.tag;
        popupTitle.textContent = eventData.title;
        popupDescription.textContent = eventData.description;
        popupCounter.textContent = `${currentIndex + 1} / ${events.length}`;
        prevBtn.disabled = currentIndex === 0;
        nextBtn.innerHTML = currentIndex === events.length - 1
            ? 'Sluiten <i class="fas fa-times"></i>'
            : 'Volgende <i class="fas fa-chevron-right"></i>';
    };

    const openPopup = (index = 0) => {
        currentIndex = Math.min(Math.max(index, 0), events.length - 1);
        renderPopup();
        previousBodyOverflow = document.body.style.overflow;
        popupOverlay.classList.add('active');
        popupOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closePopup = () => {
        popupOverlay.classList.remove('active');
        popupOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = previousBodyOverflow;
    };

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex -= 1;
            renderPopup();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < events.length - 1) {
            currentIndex += 1;
            renderPopup();
        } else {
            closePopup();
        }
    });

    closeBtn.addEventListener('click', closePopup);

    popupOverlay.addEventListener('click', (event) => {
        if (event.target === popupOverlay) {
            closePopup();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && popupOverlay.classList.contains('active')) {
            closePopup();
        }
    });

    document.querySelectorAll('.event-card-btn').forEach((button) => {
        button.addEventListener('click', () => {
            const index = Number(button.dataset.eventIndex) || 0;
            openPopup(index);
        });
    });

    setTimeout(() => {
        if (!autoOpened) {
            autoOpened = true;
            openPopup(0);
        }
    }, 2000);
});
