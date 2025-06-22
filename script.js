document.addEventListener('DOMContentLoaded', () => {
    // Diese Funktion wird ausgeführt, sobald das gesamte HTML-Dokument geladen und geparst ist.

    // 1. Sanftes Scrollen für Navigationslinks
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Überprüfen, ob der Anker ein gültiges Ziel hat (z.B. nicht nur "#")
        if (anchor.getAttribute('href').length > 1) {
            anchor.addEventListener('click', function (e) {
                e.preventDefault(); // Verhindert das Standardverhalten des Links (sofortiges Springen)

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth' // Sorgt für sanftes Scrollen
                    });
                }
            });
        }
    });

    // 2. Intersection Observer für Fade-in-Animationen beim Scrollen
    const faders = document.querySelectorAll('.fade-in'); // Wählt alle Elemente mit der Klasse 'fade-in'

    const appearOptions = {
        threshold: 0.1, // Das Element muss zu 10% im Viewport sein, damit der Effekt ausgelöst wird
        rootMargin: "0px 0px -50px 0px" // Startet den Effekt 50px früher, bevor das Element vollständig sichtbar ist
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                // Wenn das Element nicht sichtbar ist, mache nichts oder setze es zurück (hier: nichts)
                return;
            } else {
                // Wenn das Element sichtbar wird
                entry.target.classList.add('visible'); // Fügt die 'visible'-Klasse hinzu (für Fade-in)
                observer.unobserve(entry.target); // Beobachtung einstellen, da der Effekt einmalig ist
            }
        });
    }, appearOptions);

    // Füge die 'fade-in'-Klasse zu den Abschnitten hinzu, die animiert werden sollen
    // Stelle sicher, dass diese Klassen auch im HTML vorhanden sind!
    const sectionsToFade = [
        document.querySelector('.hero-section'),
        document.querySelector('.features-section'),
        document.querySelector('.call-to-action-section')
    ];

    sectionsToFade.forEach(section => {
        if (section) { // Überprüfe, ob das Element existiert
            section.classList.add('fade-in');
            appearOnScroll.observe(section); // Starte die Beobachtung
        }
    });


    // 3. Interaktiver 3D-Effekt für das MK-Logo auf Mausbewegung
    const mkLogoBox = document.querySelector('.mk-logo-box');
    if (mkLogoBox) { // Stelle sicher, dass das Element existiert
        const maxRotation = 18; // Maximale Rotationsgrade
        const rect = mkLogoBox.getBoundingClientRect(); // Initial Rect

        mkLogoBox.addEventListener('mousemove', (e) => {
            // Aktualisiere die Rect, da sich das Element durch Scrollen bewegen könnte
            const currentRect = mkLogoBox.getBoundingClientRect();
            const x = e.clientX - currentRect.left; // X-Position relativ zum Element
            const y = e.clientY - currentRect.top;  // Y-Position relativ zum Element

            // Berechne die Rotation basierend auf der Mausposition
            // Maus links -> dreht nach rechts (positive Y-Achse)
            // Maus oben -> dreht nach unten (positive X-Achse)
            const rotateY = ((x / currentRect.width) * 2 - 1) * -maxRotation; // -1 bis 1, dann multipliziert
            const rotateX = ((y / currentRect.height) * 2 - 1) * maxRotation; // -1 bis 1, dann multipliziert

            mkLogoBox.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        mkLogoBox.addEventListener('mouseleave', () => {
            // Setze die Transformation auf den ursprünglichen Zustand zurück
            mkLogoBox.style.transform = `perspective(1200px) rotateX(15deg) rotateY(25deg)`; // Originalwerte aus CSS
        });
    }

    // 4. "Krasse" Puls-Animation für Download-Buttons beim Klick
    const downloadButtons = document.querySelectorAll('.download-button');
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // e.preventDefault(); // Normalerweise würdest du das nicht brauchen, wenn der Link direkt auf die Datei zeigt.
                               // Wenn du eine eigene Download-Logik hast, dann ja.

            // Füge die Animationsklasse hinzu
            button.classList.add('pulse-animation');

            // Entferne die Klasse nach der Animationsdauer, damit sie erneut ausgelöst werden kann
            setTimeout(() => {
                button.classList.remove('pulse-animation');
            }, 600); // Muss mit der Dauer der CSS-Animation (@keyframes pulse) übereinstimmen (hier 0.6s)
        });
    });
});
