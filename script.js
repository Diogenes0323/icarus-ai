const icarusImage = document.getElementById('icarus');
const glow = document.getElementById('speech-glow');
const askButton = document.getElementById('ask-button');
const inputField = document.getElementById('input');

// Initialize speech synthesis
const synth = window.speechSynthesis;

// Function to make Icarus "speak"
function speakResponse(text) {
  const utterance = new SpeechSynthesisUtterance(text);

  // Mouth movement simulation
  utterance.onstart = () => {
    icarusImage.style.transform = "translateX(-50%) scale(1.05)";
    glow.style.opacity = "1";
  };

  utterance.onend = () => {
    icarusImage.style.transform = "translateX(-50%) scale(1)";
    glow.style.opacity = "0";
  };

  synth.speak(utterance);
}

// Event listener for the "Ask" button
askButton.addEventListener('click', () => {
  const userQuestion = inputField.value;

  if (!userQuestion) {
    speakResponse("Please type a question.");
    return;
  }

  // Simulate a response
  const response = `You asked: ${userQuestion}. I am still learning to assist you better!`;
  speakResponse(response);
});
