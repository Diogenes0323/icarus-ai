const icarusImage = document.getElementById('icarus');
const glow = document.getElementById('speech-glow');
const askButton = document.getElementById('ask-button');
const inputField = document.getElementById('input');

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

// Fetch response from OpenAI API
async function fetchAIResponse(userQuestion) {
  const apiKey = "YOUR_OPENAI_API_KEY"; // Replace with your OpenAI API key
  const endpoint = "https://api.openai.com/v1/chat/completions";

  const requestBody = {
    model: "gpt-3.5-turbo", // Use "gpt-4" if enabled
    messages: [
      { role: "system", content: "You are Icarus, an AI assistant. Respond helpfully and in character as Icarus." },
      { role: "user", content: userQuestion },
    ],
    max_tokens: 100, // Adjust response length
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const data = await response.json();
      return data.choices[0].message.content;
    } else {
      return "I'm having trouble connecting to my knowledge base right now. Please try again later.";
    }
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Something went wrong. Please try again later.";
  }
}

// Event listener for the "Ask" button
askButton.addEventListener("click", async () => {
  const userQuestion = inputField.value;

  if (!userQuestion) {
    speakResponse("Please type a question.");
    return;
  }

  // Fetch response from the AI and speak it
  const response = await fetchAIResponse(userQuestion);
  speakResponse(response);
});
