// Define available options for each feature
const features = {
    base: ['square', 'round', 'oval'],
    eyes: ['medium', 'large', 'small'],
    nose: ['medium', 'large', 'small']
};

// Track current selection index for each feature
const currentSelection = {
    base: 0,
    eyes: 0,
    nose: 0
};

// Function to cycle through feature options
function cycleFeature(feature) {
    const totalOptions = features[feature].length;
    currentSelection[feature] = (currentSelection[feature] + 1) % totalOptions;
    const newValue = features[feature][currentSelection[feature]];
    const imgElement = document.getElementById(`${feature}Img`);
    const imgSrc = `images/${feature}/${newValue}.png`;
    imgElement.src = imgSrc;

    imgElement.onerror = function() {
        console.error(`Image failed to load: ${imgSrc}`);
    };
}

// Function to download the image
function downloadImage() {
    const canvas = document.getElementById('portraitCanvas');
    const ctx = canvas.getContext('2d');

    // Get the images
    const baseImage = document.getElementById('baseImg');
    const eyesImage = document.getElementById('eyesImg');
    const noseImage = document.getElementById('noseImg');

    // Set canvas dimensions
    canvas.width = baseImage.naturalWidth;
    canvas.height = baseImage.naturalHeight;

    // Draw images onto the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings
    ctx.drawImage(baseImage, 0, 0); // Draw the base image
    ctx.drawImage(noseImage, 0, 0); // Draw the nose image
    ctx.drawImage(eyesImage, 0, 0); // Draw the eyes image

    // Convert the canvas content to a Blob
    canvas.toBlob(function(blob) {
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob); // Create a URL for the Blob

        // Set download attributes
        link.href = url;
        link.download = 'custom-portrait.png'; // File name

        // For mobile: check if automatic download is supported
        if (navigator.userAgent.match(/Mobi/)) {
            // On mobile devices, open the image in a new tab
            window.open(url, '_blank');
        } else {
            // For desktops or browsers that support it, auto-download the file
            link.click();
        }

        // Cleanup: revoke the Blob URL after the download
        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 100);
    }, 'image/png'); // MIME type
}