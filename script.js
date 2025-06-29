document.addEventListener('DOMContentLoaded', (event) => {

    // Intersection Observer für Scroll-Animationen
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1 // Löst aus, wenn 10% des Elements sichtbar sind
    });

    // Wähle alle Elemente aus, die animiert werden sollen
    const hiddenElements = document.querySelectorAll('.hidden');
    
    // Beobachte jedes dieser Elemente
    hiddenElements.forEach(el => observer.observe(el));

});
