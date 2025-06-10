// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
    console.log('AskTube extension installed');
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'GET_VIDEO_INFO') {
        // TODO: Implement video info retrieval
        sendResponse({ success: true });
    }
    return true;
}); 