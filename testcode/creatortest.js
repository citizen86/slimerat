// Define available options for each feature
const features = {
    background: ['background1', 'background2', 'background3'],
    pattern: ['catpattern1', 'catpattern2', 'catpattern3'],
    mask: ['catmask1', 'catmask2', 'catmask3'],
    outline: ['catoutline1', 'catoutline2', 'catoutline3'],
    eyes: ['cateyes1', 'cateyes2', 'cateyes3'],
    nose: ['catnose1', 'catnose2', 'catnose3']
};

// Track current selection index for each feature
const currentSelection = {
    background: 0,
    pattern: 0,
    mask: 0,
    outline: 0,
    eyes: 0,
    nose: 0
};

// Function to apply mask to pattern
function applyMask() {
    const maskImgSrc = `images/catcreator/mask/${features.mask[currentSelection.mask]}.png`;
    const patternImg = document.getElementById('patternImg');
    patternImg.style.maskImage = `url(${maskImgSrc})`;
    patternImg.style.webkitMaskImage = `url(${maskImgSrc})`; // For Safari support

    // Hide the actual mask image
    const maskImg = document.getElementById('maskImg');
    maskImg.style.display = 'none';
}

// Function to cycle through feature options
function cycleFeature(feature) {
    const totalOptions = features[feature].length;
    currentSelection[feature] = (currentSelection[feature] + 1) % totalOptions;
    const newValue = features[feature][currentSelection[feature]];
    const imgElement = document.getElementById(`${feature}Img`);
    const imgSrc = `images/catcreator/${feature}/${newValue}.png`;
    imgElement.src = imgSrc;

    // If we're cycling the mask, update the mask on the pattern image
    if (feature === 'mask') {
        applyMask();
    }

    imgElement.onerror = function() {
        console.error(`Image failed to load: ${imgSrc}`);
    };
}

// Function to download the portrait image as a PNG
function downloadImage() {
    const canvas = document.getElementById('portraitCanvas'); // Main hidden canvas
    const ctx = canvas.getContext('2d');

    // Create a temporary canvas for handling the mask and pattern
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = canvas.width = 400;  // Ensure dimensions are the same
    tempCanvas.height = canvas.height = 600;

    // Get the images to render
    const backgroundImage = `images/catcreator/background/${features.background[currentSelection.background]}.png`;
    const patternImage = `images/catcreator/pattern/${features.pattern[currentSelection.pattern]}.png`;
    const maskImage = `images/catcreator/mask/${features.mask[currentSelection.mask]}.png`;
    const outlineImage = `images/catcreator/outline/${features.outline[currentSelection.outline]}.png`;
    const eyesImage = `images/catcreator/eyes/${features.eyes[currentSelection.eyes]}.png`;
    const noseImage = `images/catcreator/nose/${features.nose[currentSelection.nose]}.png`;

    // Clear the main canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw images to canvas (in the correct order)
    Promise.all([
        loadImage(backgroundImage),  // Background
        loadImage(patternImage),     // Pattern
        loadImage(maskImage),        // Mask
        loadImage(outlineImage),     // Outline
        loadImage(eyesImage),        // Eyes
        loadImage(noseImage)         // Nose
    ]).then((images) => {
        // Step 1: Draw the background first on the main canvas
        ctx.drawImage(images[0], 0, 0, canvas.width, canvas.height);

        // Step 2: Draw the pattern and mask on the temporary canvas
        tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        tempCtx.drawImage(images[1], 0, 0, tempCanvas.width, tempCanvas.height); // Draw pattern
        tempCtx.globalCompositeOperation = 'destination-in'; // Apply mask to pattern
        tempCtx.drawImage(images[2], 0, 0, tempCanvas.width, tempCanvas.height); // Draw mask
        tempCtx.globalCompositeOperation = 'source-over'; // Reset composite mode

        // Step 3: Draw the temporary canvas (pattern with mask) onto the main canvas
        ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);

        // Step 4: Draw the outline, eyes, and nose on the main canvas
        ctx.drawImage(images[3], 0, 0, canvas.width, canvas.height); // Outline
        ctx.drawImage(images[4], 0, 0, canvas.width, canvas.height); // Eyes
        ctx.drawImage(images[5], 0, 0, canvas.width, canvas.height); // Nose

        // Generate a filename with the current date and time
        const fileName = `goodkitty${Date.now()}.png`; // Example: custom-portrait_2024-10-18T14-30-00.png

        // Convert canvas to image and trigger download
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = fileName; // Use the randomized filename
        link.click();
    }).catch(err => {
        console.error('Error rendering images to canvas:', err);
    });
}

// Helper function to load images
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous'; // Ensure cross-origin works for canvas
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        img.src = src;
    });
}

// Apply the mask when the page loads
document.addEventListener('DOMContentLoaded', function() {
    applyMask(); // Apply the initial mask to the pattern on page load
});

// Event listener for the download button
document.getElementById('downloadButton').addEventListener('click', downloadImage);