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
    // Get the total number of options for this feature
    const totalOptions = features[feature].length;

    // Update the current selection index, wrapping back to 0 if needed
    currentSelection[feature] = (currentSelection[feature] + 1) % totalOptions;

    // Get the new value to display
    const newValue = features[feature][currentSelection[feature]];

    // Update the image source
    const imgElement = document.getElementById(`${feature}Img`);
    const imgSrc = `images/${feature}/${newValue}.png`;
    imgElement.src = imgSrc;

    // Log for debugging
    console.log(`Updated ${feature} to: ${imgSrc}`);

    // Check if the image fails to load
    imgElement.onerror = function() {
        console.error(`Image failed to load: ${imgSrc}`);
    };
}