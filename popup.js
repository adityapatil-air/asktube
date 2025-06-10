document.addEventListener('DOMContentLoaded', function () {
    const chat = document.getElementById('chat');
    const questionInput = document.getElementById('question');
    const sendBtn = document.getElementById('sendBtn');

    // Helper to append message to chat
    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'msg ' + sender;
        msgDiv.textContent = text;
        chat.appendChild(msgDiv);
        chat.scrollTop = chat.scrollHeight;
    }

    // Send question to backend and display response
    async function sendQuestion() {
        const question = questionInput.value.trim();
        if (!question) return;
        appendMessage(question, 'user');
        questionInput.value = '';
        sendBtn.disabled = true;
        appendMessage('Thinking...', 'ai');

        // Get current tab's YouTube URL
        chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
            const youtubeUrl = tabs[0].url;
            try {
                // Replace with your backend API URL
                const apiUrl = 'https://your-backend-domain.com/ask';
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        question: question,
                        video_url: youtubeUrl
                    })
                });
                const data = await response.json();
                // Remove the "Thinking..." message
                chat.removeChild(chat.lastChild);
                appendMessage(data.answer || 'No answer received.', 'ai');
            } catch (err) {
                chat.removeChild(chat.lastChild);
                appendMessage('Error: Could not get answer from AI.', 'ai');
            }
            sendBtn.disabled = false;
        });
    }

    // Send on button click or Enter key
    sendBtn.addEventListener('click', sendQuestion);
    questionInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') sendQuestion();
    });
});
