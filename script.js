// Array of placeholder sentences for the search input
const placeholders = [
    "Search for Ubtan",
    "Search for Face Mask",
    "Search for Face Serum",
    "Search for Vitamin"
];

// Target the input field with class 'searchbar'
const searchInput = document.querySelector(".searchbar");

// Typing effect settings
let currentText = "";    // Current text being typed
let letterIndex = 0;     // Index of the current letter
let sentenceIndex = 0;   // Index of the current sentence
let isDeleting = false;  // If the text is being deleted
let typingSpeed = 50;   // Typing speed in milliseconds
let deleteSpeed = 80;    // Deleting speed in milliseconds
let delayBetweenSentences = 2000; // Delay before switching sentences
let cursorVisible = true; // Control cursor visibility
const cursorBlinkSpeed = 500; // Cursor blink speed in milliseconds

// Typing effect function
function typeEffect() {
    const currentSentence = placeholders[sentenceIndex];
    
    if (isDeleting) {
        currentText = currentSentence.substring(0, letterIndex - 1);
        letterIndex--;
    } else {
        currentText = currentSentence.substring(0, letterIndex + 1);
        letterIndex++;
    }

    // Set the placeholder to the current text
    searchInput.setAttribute("placeholder", currentText + (cursorVisible ? " |" : ""));

    // Decide whether to delete or type more letters
    if (!isDeleting && letterIndex === currentSentence.length) {
        isDeleting = true;
        setTimeout(typeEffect, delayBetweenSentences);
    } else if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        sentenceIndex = (sentenceIndex + 1) % placeholders.length; // Cycle through sentences
        setTimeout(typeEffect, 300); // Small pause before starting next sentence
    } else {
        const speed = isDeleting ? deleteSpeed : typingSpeed;
        setTimeout(typeEffect, speed);
    }
}

// Cursor blinking effect
function blinkCursor() {
    cursorVisible = !cursorVisible; // Toggle cursor visibility
    searchInput.setAttribute("placeholder", currentText + (cursorVisible ? " |" : ""));
    setTimeout(blinkCursor, cursorBlinkSpeed); // Repeat the blink effect
}

// Start the typing effect on page load
document.addEventListener("DOMContentLoaded", () => {
    typeEffect(); // Start with the first placeholder
    blinkCursor(); // Start blinking cursor
});
