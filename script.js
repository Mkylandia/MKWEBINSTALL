document.addEventListener('DOMContentLoaded', () => {
    const downloadButtons = document.querySelectorAll('.download-btn');

    downloadButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.download-card');
            const url = button.dataset.url;
            const fileName = card.dataset.file;
            const fileSize = card.dataset.size;
            const progressBarContainer = card.querySelector('.progress-container');
            const progressBar = card.querySelector('.progress-bar');
            const progressText = card.querySelector('.progress-text');

            // Hide the button and show the progress bar
            button.style.display = 'none';
            progressBarContainer.style.display = 'block';
            progressBar.style.width = '0%';
            progressText.textContent = 'Starte Download...';

            console.log(`Attempting to download: ${fileName} from ${url}`);

            // Important Note:
            // For external links like MediaFire, this JavaScript simulation
            // will NOT reflect the actual download progress.
            // The browser's native download manager (e.g., MKWEB's QWebEngineDownloadRequest)
            // will handle the actual download and its progress bar.
            // This simulation is purely for visual feedback on THIS website.

            // Simulate download progress
            let currentProgress = 0;
            const downloadInterval = setInterval(() => {
                currentProgress += Math.random() * 10; // Simulate variable download speed
                if (currentProgress >= 100) {
                    currentProgress = 100;
                    clearInterval(downloadInterval);
                    progressText.textContent = 'Download abgeschlossen!';
                    progressBar.style.width = '100%';
                    progressBar.style.background = 'linear-gradient(90deg, #28a745, #218838)'; // Green on complete
                    // Optional: Re-enable button or show a "Downloaded" message after a delay
                    setTimeout(() => {
                        progressBarContainer.style.display = 'none';
                        button.style.display = 'block';
                        progressText.textContent = 'Bereit';
                        // Reset gradient to initial if needed, or keep green for 'Download abgeschlossen'
                        progressBar.style.background = 'linear-gradient(90deg, var(--progress-gradient-start), var(--progress-gradient-end))';
                    }, 2000); // Display "Download abgeschlossen" for 2 seconds
                } else {
                    progressText.textContent = `Lade herunter: ${Math.floor(currentProgress)}%`;
                    progressBar.style.width = `${currentProgress}%`;
                }
            }, 300); // Update every 300ms

            // Initiate the actual download.
            // For a direct file download (or an external link like MediaFire),
            // simply setting window.location.href or creating a temporary link.
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName; // Suggests the filename to the browser
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

        });
    });
});

// Note: The React components (TiltedCard, Aurora) cannot be directly added
// to this vanilla JavaScript file. They require a React build environment.
// The placeholders in index.html (e.g., <div id="aurora-background">) are
// where a React application would mount these components.
