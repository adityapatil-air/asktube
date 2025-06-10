// Create and inject the sidebar iframe
function createSidebar() {
    const iframe = document.createElement('iframe');
    iframe.id = 'asktube-sidebar';
    iframe.className = 'asktube-sidebar';
    iframe.src = chrome.runtime.getURL('sidebar.html');
    document.body.appendChild(iframe);
    
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

// Listen for messages from sidebar (iframe)
window.addEventListener('message', (event) => {
    if (event.data.type === 'CLOSE_SIDEBAR') {
        toggleSidebar();
    }
});

// Listen for messages from background script (e.g., GET_VIDEO_INFO)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'GET_VIDEO_INFO') {
        const videoId = new URLSearchParams(window.location.search).get('v');
        const videoTitleElement = document.querySelector('h1.title');
        const videoTitle = videoTitleElement ? videoTitleElement.textContent : 'Unknown Video';

        sendResponse({ success: true, videoId, videoTitle });
        return true; // Indicates an asynchronous response
    }
});

// Initialize when YouTube page is loaded
if (window.location.hostname === 'www.youtube.com') {
    createSidebar();
} 