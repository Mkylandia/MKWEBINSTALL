document.addEventListener('DOMContentLoaded', function() {
    const downloadButton = document.getElementById('downloadButton');

    // Der MediaFire-Link, den Sie bereitgestellt haben
    const mediaFireLink = 'https://www.mediafire.com/file/ye86le93mnhvghg/MKWEB3.zip/file';

    // Event Listener für den Button-Klick
    if (downloadButton) {
        downloadButton.addEventListener('click', function() {
            // Leitet den Benutzer zum MediaFire-Link weiter
            window.location.href = mediaFireLink;
        });
    }
});
