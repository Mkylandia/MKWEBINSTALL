document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for fade-in animations on scroll
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.1, // Element is 10% visible
        rootMargin: "0px 0px -50px 0px" // Adjust when element enters viewport
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Add .fade-in to sections you want to animate
    document.querySelector('.hero-section').classList.add('fade-in');
    document.querySelector('.features-section').classList.add('fade-in');
    document.querySelector('.call-to-action-section').classList.add('fade-in');

    // Simple hover effect for the MK logo (more complex 3D would require a library)
    const mkLogoBox = document.querySelector('.mk-logo-box');
    if (mkLogoBox) {
        mkLogoBox.addEventListener('mousemove', (e) => {
            const rect = mkLogoBox.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * 15; // Max 15 deg rotation
            const rotateX = ((centerY - y) / centerY) * 15; // Max 15 deg rotation

            mkLogoBox.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        mkLogoBox.addEventListener('mouseleave', () => {
            mkLogoBox.style.transform = `perspective(1000px) rotateX(10deg) rotateY(20deg)`; // Reset to initial
        });
    }

    // Example of a "krasser Übergang" (more noticeable) for the download buttons
    const downloadButtons = document.querySelectorAll('.download-button');
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Prevent default link behavior for demonstration purposes,
            // you'd typically want the link to work.
            // e.preventDefault();

            // Add a class for a short, intense animation
            button.classList.add('pulse-animation');

            // Remove the class after the animation finishes
            setTimeout(() => {
                button.classList.remove('pulse-animation');
                // In a real scenario, after the animation, you might trigger the actual download
                // window.location.href = button.href;
            }, 500); // Match this duration to your CSS animation
        });
    });
});

// CSS for the pulse-animation (add this to your style.css if you use the JS animation above)
/*
@keyframes pulse {
    0% { transform: scale(1); box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); }
    50% { transform: scale(1.05); box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4); }
    100% { transform: scale(1); box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); }
}

.pulse-animation {
    animation: pulse 0.5s ease-in-out;
}
*/
