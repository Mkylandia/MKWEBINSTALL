document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links (if you add a navigation later)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add class for fade-in effect on scroll
    const fadeInElements = document.querySelectorAll('section, .feature-item, .download-button');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInElements.forEach(element => {
        element.classList.add('fade-in-on-scroll'); // Add this class to elements that should fade in
        observer.observe(element);
    });

    // Basic interactive header background (simple parallax/mouse follow)
    const header = document.querySelector('header');
    if (header) {
        header.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20; // -10 to 10
            const y = (e.clientY / window.innerHeight - 0.5) * 10; // -5 to 5

            header.style.transform = `translate(${x}px, ${y}px)`;
            header.style.backgroundPosition = `${50 + x * 0.5}% ${50 + y * 0.5}%`;
        });

        header.addEventListener('mouseleave', () => {
            header.style.transform = `translate(0px, 0px)`;
            header.style.backgroundPosition = `50% 50%`;
        });
    }

    // Dynamic text effect (optional, for headers or specific elements)
    const headerTitle = document.querySelector('.header-content h1');
    if (headerTitle) {
        const originalText = headerTitle.textContent;
        headerTitle.textContent = ''; // Clear for typing effect
        let charIndex = 0;

        function typeWriter() {
            if (charIndex < originalText.length) {
                headerTitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100); // Typing speed
            }
        }
        setTimeout(typeWriter, 1000); // Start typing after 1 second
    }

    // Mockup rotation on scroll (subtle 3D effect)
    const browserMockup = document.querySelector('.browser-mockup img');
    if (browserMockup) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const rotationY = Math.min(scrollY / 50, 15); // Max 15 degrees
            const rotationX = Math.min(scrollY / 100, 5); // Max 5 degrees
            browserMockup.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg) scale(0.9)`;
        });
    }
});
