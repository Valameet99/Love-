const envelope = document.querySelector('.envelope');
const heartSeal = document.querySelector('.heart-seal');
const letterContent = document.querySelector('.letter-content'); // Make sure this is your content area in the letter
let timeoutId;
let heartGenerationInterval;
let audioPlayed = false; // To track if the audio has been played once

const button = document.getElementById('audioControl');
const audio = document.getElementById('bgm');

// Add a listener for the first user interaction to allow audio play
document.body.addEventListener('click', () => {
    // This will unmute the audio after user interaction
    audio.muted = false;
    console.log("Audio unmuted after user interaction");
});

// Play audio on hover, but only after user interaction (click)
envelope.addEventListener('mouseover', () => {
    if (!audioPlayed) {
        audio.play().then(() => {
            audioPlayed = true;
            console.log("Audio started playing on hover after user interaction");
        }).catch((error) => {
            console.error("Error playing audio:", error);
        });
    }

    clearTimeout(timeoutId);
    heartSeal.style.opacity = 0; // Make sure the heart seal is hidden when hovering

    // Start generating hearts on hover
    if (!heartGenerationInterval) {
        heartGenerationInterval = setInterval(createHeart, 200); // Start heart generation
    }

    // Show the content (text) of the letter
    if (letterContent) {
        letterContent.style.display = 'block'; // Show the content on hover
    }
});

envelope.addEventListener('mouseout', () => {
    timeoutId = setTimeout(() => {
        heartSeal.style.opacity = 1; // Fade back the heart seal after delay
    }, 1500);

    // Stop generating hearts when mouse leaves
    if (heartGenerationInterval) {
        clearInterval(heartGenerationInterval); // Stop the interval
        heartGenerationInterval = null; // Reset the flag
    }

    // Hide the content (text) of the letter after hover
    if (letterContent) {
        letterContent.style.display = 'none'; // Hide the content after mouse leaves
    }
});

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s"; // Adding animation duration to make it more random

    heart.innerText = "❤️";
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 3000); // Remove heart after 3 seconds
}

heartSeal.style.transition = 'opacity 0.3s ease';

// Function to play/pause the audio
function toggleAudio() {
    if (audio.paused) {
        audio.play().then(() => {
            button.innerHTML = '<svg fill="#000000" width="50px" height="50px" viewBox="0 0 24 24" id="pause-circle" xmlns="http://www.w3.org/2000/svg" class="icon flat-color"><circle cx="12" cy="12" r="10" style="fill: rgb(0, 0, 0);"></circle><path d="M14,17a1,1,0,0,1-1-1V8a1,1,0,0,1,2,0v8A1,1,0,0,1,14,17Zm-4,0a1,1,0,0,1-1-1V8a1,1,0,0,1,2,0v8A1,1,0,0,1,10,17Z" style="fill: rgb(44, 169, 188);"></path></svg>';
            button.classList.add('playing');
        }).catch((error) => {
            console.error('Audio play failed:', error);
        });
    } else {
        audio.pause();
        button.innerHTML = '<svg fill="#000000" width="50px" height="50px" viewBox="0 0 24 24" id="play" xmlns="http://www.w3.org/2000/svg" class="icon flat-color"><circle cx="12" cy="12" r="10" style="fill: rgb(0, 0, 0);"></circle><path d="M14.75,12.83,11.55,15A1,1,0,0,1,10,14.13V9.87A1,1,0,0,1,11.55,9l3.2,2.13A1,1,0,0,1,14.75,12.83Z" style="fill: rgb(44, 169, 188);"></path></svg>';
        button.classList.remove('playing');
    }
}