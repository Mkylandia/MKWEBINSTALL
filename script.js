// script.js

// Hier können interaktive Elemente oder kleinere Animationen gesteuert werden,
// die NICHT direkt mit dem 3D-Hintergrund zusammenhängen.

document.addEventListener('DOMContentLoaded', () => {
    console.log('Website geladen und bereit!');

    // Beispiel für einen einfachen Effekt beim Laden der Seite
    const header = document.querySelector('header');
    if (header) {
        header.style.opacity = '0';
        setTimeout(() => {
            header.style.transition = 'opacity 1s ease-in-out';
            header.style.opacity = '1';
        }, 100);
    }

    // Wenn du Three.js oder eine ähnliche Bibliothek verwendest,
    // würde hier der Initialisierungs- und Render-Code stehen.
    // Beispiel:
    // initThreeJSScene();
    // animateThreeJSScene();
});

// Funktion, die den 3D-Hintergrund initialisieren könnte (hypothetisch)
function initThreeJSScene() {
    // Hier würde der Code zum Erstellen einer Three.js Szene, Kamera, Renderer etc. stehen
    // Z.B. zur Erzeugung eines interaktiven Aurora-ähnlichen Partikelsystems
    console.log("Initialisiere Three.js Szene (Platzhalter)...");
    const container = document.getElementById('background-animation');
    // const scene = new THREE.Scene();
    // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    // ...und so weiter
}

// Funktion, die die 3D-Animation rendern und aktualisieren könnte (hypothetisch)
function animateThreeJSScene() {
    // requestAnimationFrame(animateThreeJSScene);
    // Hier würden die Updates für die Animationen pro Frame stehen
    // z.B. Partikel bewegen, Kamera drehen, Shader aktualisieren
    console.log("Animiere Three.js Szene (Platzhalter)...");
}

// Event-Listener für Responsive Design, falls der 3D-Hintergrund angepasst werden muss
window.addEventListener('resize', () => {
    // Wenn Three.js verwendet wird, hier die Kamera und den Renderer aktualisieren
    // if (camera && renderer) {
    //     camera.aspect = window.innerWidth / window.innerHeight;
    //     camera.updateProjectionMatrix();
    //     renderer.setSize(window.innerWidth, window.innerHeight);
    // }
    console.log("Fenstergröße geändert.");
});
