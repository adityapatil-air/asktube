// Handle user questions
async function handleQuestion() {
    console.log('Send button clicked or Enter pressed!');
    const input = document.getElementById('asktube-input');
    const question = input.value.trim();
    
    if (!question) {
        console.log('Input is empty. Returning.');
        return;
    }
    
    // Add user message to chat
    addMessage(question, 'user');
    input.value = '';
    
    try {
        // Get current video information from content script (via message passing)
        chrome.runtime.sendMessage({ type: 'GET_VIDEO_INFO' }, async (response) => {
            if (response && response.success) {
                const videoId = response.videoId;
                const videoTitle = response.videoTitle;
                console.log('Received video info from content script:', { videoId, videoTitle });
                
                // TODO: Send to backend API
                // const apiResponse = await fetch('YOUR_BACKEND_API/ask', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify({
                //         question,
                //         videoId,
                //         videoTitle
                //     })
                // });
                
                // const data = await apiResponse.json();
                // addMessage(data.answer, 'assistant');
                addMessage('Simulated AI response for: ' + question, 'assistant'); // Temporary mock response
            }
        });
    } catch (error) {
        console.error('Error in handleQuestion:', error);
        addMessage('Sorry, I encountered an error. Please try again.', 'error');
    }
}

// Add message to chat
function addMessage(text, type) {
    const messagesContainer = document.getElementById('asktube-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `asktube-message asktube-message-${type}`;
    messageDiv.textContent = text;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('sidebar.js loaded and DOMContentLoaded fired!');
    const inputElement = document.getElementById('asktube-input');
    const sendButton = document.getElementById('asktube-send');
    const closeButton = document.getElementById('asktube-close');

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            console.log('Close button clicked.');
            window.parent.postMessage({ type: 'CLOSE_SIDEBAR' }, '*');
        });
    } else {
        console.error('Close button not found!');
    }

    if (sendButton) {
        sendButton.addEventListener('click', handleQuestion);
    } else {
        console.error('Send button not found!');
    }

    if (inputElement) {
        inputElement.addEventListener('input', (e) => {
            console.log('Input field typing...', e.target.value);
        });
        inputElement.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); // Prevent new line in textarea
                handleQuestion();
            }
        });
    } else {
        console.error('Input element not found!');
    }

    // Listen for messages from the content script (e.g., to set initial state)
    window.addEventListener('message', (event) => {
        if (event.data.type === 'SET_INITIAL_STATE') {
            // Handle any initial state setup if needed
            console.log('Sidebar received initial state:', event.data.payload);
        }
    });
}); 