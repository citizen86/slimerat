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

    // Generate the data URL from the canvas
    const dataURL = canvas.toDataURL('image/png');

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'custom-portrait.png'; // File name for the download

    // For mobile browsers: open in a new tab
    if (navigator.userAgent.match(/Mobi/)) {
        window.open(dataURL, '_blank'); // Open image in new tab for manual download
    } else {
        // For desktop browsers: automatically download the file
        link.click();
    }
}