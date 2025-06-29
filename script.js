document.addEventListener('DOMContentLoaded', () => {

    // --- 1. 3D PARTIKEL-HINTERGRUND ---
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null };

        const setupCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 0.5;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.color = 'rgba(0, 255, 255, 0.5)';
            }
            update() {
                if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
                if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
                this.x += this.speedX;
                this.y += this.speedY;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            let numberOfParticles = (canvas.width * canvas.height) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };

        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            // Zeichne Linien zwischen nahen Partikeln
            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 255, 255, ${1 - distance / 100})`;
                        ctx.lineWidth = 0.2;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        };
        
        setupCanvas();
        initParticles();
        animateParticles();
        window.addEventListener('resize', () => {
            setupCanvas();
            initParticles();
        });
    }


    // --- 2. INTERAKTIVES DOWNLOAD-TERMINAL ---
    const versionData = {
        p1: {
            title: 'MK WEB (P1)',
            badge: 'STABLE',
            description: 'Die erste stabile Version. Zuverlässig, schnell und die Grundlage für alles, was folgte.',
            link: 'https://www.mediafire.com/file/05phf5dd7zr92lt/MKWEB_X_%2528P1%2529.exe/file'
        },
        p2: {
            title: 'MK WEB (P2)',
            badge: 'ENHANCED',
            description: 'Verbesserte Performance, ein überarbeitetes Design und die ersten Schritte in Richtung einer intelligenteren Benutzeroberfläche.',
            link: 'https://www.mediafire.com/file/jbp6sbbyc99908x/MKWEB_X_%2528P2%2529.exe/file'
        },
        p3: {
            title: 'MK WEB (P3)',
            badge: 'LATEST & RECOMMENDED',
            description: 'Die ultimative Version mit Predictive AI, neuem Fluid Interface und maximaler Performance. Die Zukunft des Webs, heute.',
            link: 'https://www.mediafire.com/file/6wfnuqr7egr3xp7/MKWEB+X+(P3).exe/file'
        }
    };

    const versionButtons = document.querySelectorAll('.version-btn');
    const displayContent = document.getElementById('display-content');
    const versionTitle = document.getElementById('version-title');
    const versionBadge = document.getElementById('version-badge');
    const versionDescription = document.getElementById('version-description');
    const downloadLink = document.getElementById('download-link');

    versionButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Aktiven Status umschalten
            versionButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const version = button.dataset.version;
            const data = versionData[version];

            // Inhalte aktualisieren
            displayContent.style.animation = 'none'; // Animation zurücksetzen
            void displayContent.offsetWidth; // DOM-Reflow erzwingen
            displayContent.style.animation = 'text-fade-in 0.5s ease';

            versionTitle.textContent = data.title;
            versionBadge.textContent = data.badge;
            versionDescription.textContent = data.description;
            downloadLink.href = data.link;
        });
    });


    // --- 3. SCROLL-ANIMATIONEN (wie zuvor) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
});
