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

// Function to cycle through feature options
function cycleFeature(feature) {
    const totalOptions = features[feature].length;
    currentSelection[feature] = (currentSelection[feature] + 1) % totalOptions;
    const newValue = features[feature][currentSelection[feature]];
    const imgElement = document.getElementById(`${feature}Img`);
    const imgSrc = `images/catcreator/${feature}/${newValue}.png`;
    imgElement.src = imgSrc;

    // Update mask-image if the feature is 'mask'
    if (feature === 'mask') {
        const patternImg = document.getElementById('patternImg');
        patternImg.style.maskImage = `url(${imgSrc})`;
    }

    imgElement.onerror = function() {
        console.error(`Image failed to load: ${imgSrc}`);
    };
}

// Function to download the image
function downloadImage() {
    const canvas = document.getElementById('portraitCanvas');
    const ctx = canvas.getContext('2d');

    // Get the images
    const backgroundImage = document.getElementById('backgroundImg');
    const patternImage = document.getElementById('patternImg');
    const maskImage = document.getElementById('maskImg'); // This line may be problematic as you don't have #maskImg in HTML
    const outlineImage = document.getElementById('outlineImg');
    const eyesImage = document.getElementById('eyesImg');
    const noseImage = document.getElementById('noseImg');

    // Set canvas dimensions
    canvas.width = outlineImage.naturalWidth;
    canvas.height = outlineImage.naturalHeight;

    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw images onto the canvas once they are loaded
    Promise.all([
        loadImage(backgroundImage.src),
        loadImage(patternImage.src),
        loadImage(maskImage.src), // Ensure this loads correctly
        loadImage(outlineImage.src),
        loadImage(eyesImage.src),
        loadImage(noseImage.src)
    ]).then((images) => {
        ctx.drawImage(images[0], 0, 0); // Background
        ctx.drawImage(images[1], 0, 0); // Pattern
        ctx.globalCompositeOperation = 'destination-in';
        ctx.drawImage(images[2], 0, 0); // Mask
        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(images[3], 0, 0); // Outline
        ctx.drawImage(images[4], 0, 0); // Eyes
        ctx.drawImage(images[5], 0, 0); // Nose

        // Create a download link
        const link = document.createElement('a');
        const randomFileName = `goodkitty${Date.now()}.png`;
        link.download = randomFileName; // File name
        link.href = canvas.toDataURL('image/png'); // Convert canvas to data URL
        link.click(); // Trigger the download
    }).catch(error => {
        console.error('Error downloading image:', error);
    });
}

// Helper function to load an image
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        img.src = src;
    });
}