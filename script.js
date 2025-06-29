document.addEventListener('DOMContentLoaded', () => {

    // --- 1. INTERAKTIVER SPOTLIGHT-EFFEKT ---
    const spotlight = document.getElementById('hero-spotlight');

    if (spotlight) {
        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const rect = spotlight.getBoundingClientRect();
            const x = clientX - rect.left;
            const y = clientY - rect.top;
            
            // Aktualisiert die CSS-Variablen in Echtzeit
            spotlight.style.setProperty('--x', `${x}px`);
            spotlight.style.setProperty('--y', `${y}px`);
        });
    }

    // --- 2. SCROLL-ANIMATIONEN ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.15 // Etwas früher auslösen für einen flüssigeren Effekt
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // Versetzte (staggered) Animation für Karten
    const animatedCards = document.querySelectorAll('.animated-card');
    animatedCards.forEach((card, index) => {
        // Setzt eine CSS-Variable für die Animationsverzögerung
        card.style.setProperty('--i', index);
    });
});
