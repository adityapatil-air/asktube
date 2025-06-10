// Check if we're on a YouTube page
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const currentTab = tabs[0];
    const statusElement = document.getElementById('status');
    
    if (currentTab.url.includes('youtube.com')) {
        statusElement.textContent = 'Ready to answer questions!';
        statusElement.classList.add('active');
    } else {
        statusElement.textContent = 'Please navigate to YouTube to use AskTube.';
    }
}); 