// Select elements
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');

// Variables to manage conversation flow
let userName = '';
let isFirstMessage = true; // Track if it's the first user message
let currentQuestion = ''; // Track the current state of the conversation
let userMood = ''; // Store the user's mood

// Function to send a message
function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText === '') return;

    // Display the user's message
    displayMessage(messageText, 'sent');

    // Handle the user input based on the current state
    handleUserInput(messageText);

    // Clear input field
    messageInput.value = '';
    scrollToBottom();
}

// Function to handle user input and bot responses
function handleUserInput(input) {
    input = input.toLowerCase(); // Normalize input for comparison

    if (isFirstMessage) {
        // The first response from the bot
        displayMessage("Hi, This is Mira!! And you?", "received");
        isFirstMessage = false; // Turn off first-message mode
        currentQuestion = 'name'; // Move to asking for the name
    } else if (currentQuestion === 'name') {
        // Save the user's name
        userName = input.charAt(0).toUpperCase() + input.slice(1); // Capitalize the first letter
        displayMessage(`Hi ${userName}, how is your day going? Good or Bad?`, "received");
        currentQuestion = 'day'; // Move to the next question
    } else if (currentQuestion === 'day') {
        // Determine user mood
        if (input.includes('good')) {
            userMood = 'good';
            displayMessage(`Wanna listen to a song? Yes or No?`, 'received');
        } else if (input.includes('bad')) {
            userMood = 'bad';
            displayMessage(`Wanna listen to a song? Yes or No?`, 'received');
        }
        currentQuestion = 'song'; // Set next question
    } else if (currentQuestion === 'song') {
        // Handle song suggestion
        if (input.includes('yes')) {
            if (userMood === 'good') {
                displayMessage(`Here's a song for you: [FRIENDS by Anne-Marie](https://www.youtube.com/watch?v=CY8E6N5Nzec)`, 'received');
                currentQuestion = 'next-song';
            } else if (userMood === 'bad') {
                displayMessage(`Here's a song for you: [One More Light by Linkin Park](https://www.youtube.com/watch?v=Tm8LGxTLtQk)`, 'received');
                currentQuestion = 'next-song';
            }
        } else if (input.includes('no')) {
            displayMessage(`Here are some books to read: The Secret Scroll, The Da Vinci Code, The Sunbird`, 'received');
            currentQuestion = 'movie';
        }
    } else if (currentQuestion === 'next-song') {
        // Handle next song suggestion
        if (input.includes('yes')) {
            if (userMood === 'good') {
                displayMessage(`How about: Shironamhin - Abar Hashimukh or Oniket Prantor by Artcell?`, 'received');
            } else if (userMood === 'bad') {
                displayMessage(`How about: Faded by Alan Walker or Uthsober Uthsahe by Artcell?`, 'received');
            }
        } else {
            displayMessage(`Alright!`, 'received');
            currentQuestion = 'movie';
        }
    } else if (currentQuestion === 'movie') {
        // Handle movie suggestion
        displayMessage(`Wanna watch a movie? Yes or No?`, 'received');
        currentQuestion = 'movie-choice';
    } else if (currentQuestion === 'movie-choice') {
        if (input.includes('yes')) {
            displayMessage(`What genre do you like? Horror, Comedy, or Sci-fi?`, 'received');
            currentQuestion = 'genre';
        } else if (input.includes('no')) {
            displayMessage(`Do you need an appointment with a psychiatrist? I can suggest one. Yes or No?`, 'received');
            currentQuestion = 'psychiatrist';
        }
    } else if (currentQuestion === 'genre') {
        if (input.includes('horror')) {
            displayMessage(`You might like: The Nun Movie Series`, 'received');
        } else if (input.includes('comedy')) {
            displayMessage(`You might like: Hera Pheri Movie Series`, 'received');
        } else if (input.includes('sci-fi')) {
            displayMessage(`You might like: The Avengers Movie Series`, 'received');
        }
        // Now, wait for the user to respond before continuing the conversation
        currentQuestion = 'waiting-for-response'; // Set a new state for the user to respond
    } else if (currentQuestion === 'waiting-for-response') {
        // Once the user responds, ask if they need a psychiatrist
        displayMessage(`Do you need an appointment with a psychiatrist? I can suggest one. Yes or No?`, 'received');
        currentQuestion = 'psychiatrist'; // Proceed to the psychiatrist question
    } else if (currentQuestion === 'psychiatrist') {
        if (input.includes('yes')) {
            displayMessage(
                `Dr. Raisul Likhon\nConsultant, Mind Ease.\nAssistant Consultant: Hasanur Miah, Mind Ease.`,
                'received'
            );
        } else {
            displayMessage(`Okay ${userName}, have a nice day!`, 'received');
        }
    }
}

// Function to display a message
function displayMessage(text, type) {
    const message = document.createElement('div');
    message.classList.add('message', type);
    message.innerText = text;
    chatBox.appendChild(message);
}

// Function to auto-scroll to the bottom of the chat
function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Allow Enter key to send message
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
