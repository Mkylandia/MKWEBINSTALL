document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.querySelector('.cta-button'); // Targeting the main download button

    if (downloadButton) {
        downloadButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior immediately

            const url = downloadButton.dataset.url;
            const fileName = downloadButton.dataset.file;
            const progressContainer = document.querySelector('.progress-container');
            const progressBar = document.querySelector('.progress-bar');
            const progressText = document.querySelector('.progress-text');

            // Initial state for download process
            downloadButton.style.display = 'none';
            progressContainer.style.display = 'block';
            progressBar.style.width = '0%';
            progressText.textContent = 'Initialisiere sicheren Download...';

            console.log(`Starte Download von: ${fileName} von ${url}`);

            // Simulate a more advanced download process
            let currentProgress = 0;
            const phases = [
                { text: 'Verbinde mit MKWEB Servern...', duration: 1000, increment: 5 },
                { text: 'Download optimieren für Ihre Hardware...', duration: 1500, increment: 10 },
                { text: 'Übertrage Datenpakete...', duration: 5000, increment: 20 },
                { text: 'Integrität der Daten prüfen...', duration: 2000, increment: 10 },
                { text: 'Finale Kompilierung...', duration: 1500, increment: 5 }
            ];
            let currentPhase = 0;
            let phaseStartTime = Date.now();

            const animateDownload = () => {
                if (currentPhase < phases.length) {
                    const phase = phases[currentPhase];
                    const elapsed = Date.now() - phaseStartTime;
                    const phaseProgress = Math.min(1, elapsed / phase.duration);
                    
                    // Ensure progress doesn't jump backward
                    const targetProgress = Math.min(100, currentProgress + phase.increment * phaseProgress);
                    progressBar.style.width = `${targetProgress}%`;
                    progressText.textContent = `${phase.text} ${Math.floor(targetProgress)}%`;

                    if (elapsed >= phase.duration) {
                        currentProgress += phase.increment;
                        currentPhase++;
                        phaseStartTime = Date.now();
                        if (currentPhase < phases.length) {
                             // Set text for next phase immediately
                             progressText.textContent = `${phases[currentPhase].text} ${Math.floor(targetProgress)}%`;
                        }
                    }
                    requestAnimationFrame(animateDownload);
                } else {
                    // Final steps once simulation reaches near 100%
                    progressBar.style.width = '100%';
                    progressBar.style.background = 'linear-gradient(90deg, #00FFB0, #00E0FF)'; // Green/Blue on complete
                    progressText.textContent = 'Download abgeschlossen! Installiere ...';

                    // Trigger actual file download
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);

                    // Revert UI after a short delay
                    setTimeout(() => {
                        progressContainer.style.display = 'none';
                        downloadButton.style.display = 'flex'; // Use flex for CTA button
                        progressBar.style.width = '0%'; // Reset for next download
                        progressBar.style.background = 'linear-gradient(90deg, var(--progress-gradient-start), var(--progress-gradient-end))';
                        progressText.textContent = 'Bereit';
                        alert('Ihr Download von MKWEB Quantum wurde gestartet. Bitte überprüfen Sie Ihren Download-Ordner.');
                    }, 3000); // Show "Download abgeschlossen" for 3 seconds
                }
            };

            animateDownload(); // Start the download animation
        });
    }
});
