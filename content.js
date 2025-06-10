// Create and inject the sidebar
function createSidebar() {
    const sidebar = document.createElement('div');
    sidebar.id = 'asktube-sidebar';
    sidebar.className = 'asktube-sidebar';
    
    sidebar.innerHTML = `
        <div class="asktube-header">
            <h3>AskTube Assistant</h3>
            <button id="asktube-close" class="asktube-close-btn">×</button>
        </div>
        <div class="asktube-chat-container">
            <div id="asktube-messages" class="asktube-messages"></div>
            <div class="asktube-input-container">
                <textarea id="asktube-input" placeholder="Ask a question about this video..." rows="3"></textarea>
                <button id="asktube-send" class="asktube-send-btn">Send</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(sidebar);
    
    // Add event listeners
    document.getElementById('asktube-close').addEventListener('click', toggleSidebar);
    document.getElementById('asktube-send').addEventListener('click', handleQuestion);
    
    // Add floating button to open sidebar
    const floatingBtn = document.createElement('button');
    floatingBtn.id = 'asktube-floating-btn';
    floatingBtn.innerHTML = 'Ask';
    floatingBtn.className = 'asktube-floating-btn';
    document.body.appendChild(floatingBtn);
    
    floatingBtn.addEventListener('click', toggleSidebar);
}

// Toggle sidebar visibility
function toggleSidebar() {
    const sidebar = document.getElementById('asktube-sidebar');
    const floatingBtn = document.getElementById('asktube-floating-btn');
    
    if (sidebar.classList.contains('asktube-sidebar-open')) {
        sidebar.classList.remove('asktube-sidebar-open');
        floatingBtn.style.display = 'block';
    } else {
        sidebar.classList.add('asktube-sidebar-open');
        floatingBtn.style.display = 'none';
    }
}

// Handle user questions
async function handleQuestion() {
    const input = document.getElementById('asktube-input');
    const question = input.value.trim();
    
    if (!question) return;
    
    // Add user message to chat
    addMessage(question, 'user');
    input.value = '';
    
    try {
        // Get current video information
        const videoId = new URLSearchParams(window.location.search).get('v');
        const videoTitle = document.querySelector('h1.title').textContent;
        
        // TODO: Send to backend API
        const response = await fetch('YOUR_BACKEND_API/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question,
                videoId,
                videoTitle
            })
        });
        
        const data = await response.json();
        addMessage(data.answer, 'assistant');
        
    } catch (error) {
        console.error('Error:', error);
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

// Initialize when YouTube page is loaded
if (window.location.hostname === 'www.youtube.com') {
    createSidebar();
} 