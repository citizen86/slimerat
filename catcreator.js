// Define available options for each feature
const features = {
    base: ['catbase1', 'catbase2', 'catbase3'],
    eyes: ['cateyes1', 'cateyes2', 'cateyes3'],
    nose: ['catnose1', 'catnose2', 'catnose3']
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
    const imgSrc = `images/catbuilder/${feature}/${newValue}.png`;
    imgElement.src = imgSrc;

    imgElement.onerror = function() {
        console.error(`Image failed to load: ${imgSrc}`);
    };
}

// Function to download the image
/*
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

    // Create a download link
    const link = document.createElement('a');
    link.download = 'custom-portrait.png'; // File name
    link.href = canvas.toDataURL('image/png'); // Convert canvas to data URL
    link.click(); // Trigger the download
}

*/

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

    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw images onto the canvas once they are loaded
    Promise.all([
        loadImage(baseImage.src),
        loadImage(eyesImage.src),
        loadImage(noseImage.src)
    ]).then((images) => {
        ctx.drawImage(images[0], 0, 0); // Draw the base image
        ctx.drawImage(images[1], 0, 0); // Draw the eyes image
        ctx.drawImage(images[2], 0, 0); // Draw the nose image

        // Create a download link
        const link = document.createElement('a');
        link.download = 'custom-portrait.png'; // File name
        link.href = canvas.toDataURL('image/png'); // Convert canvas to data URL
        link.click(); // Trigger the download
    });
}

// Helper function to load an image and return a Promise
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image at ${src}`));
    });
}