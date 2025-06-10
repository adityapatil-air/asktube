# AskTube - YouTube Learning Assistant

A Chrome extension that helps you learn from YouTube videos by answering your questions based on the video content, maintaining the teaching style of the YouTuber.

## Features

- 🤖 AI-powered answers based on video content
- 🎯 Maintains YouTuber's teaching style
- 💬 Microsoft Copilot-style chat interface
- 📚 Works with both single videos and playlists
- ⚡ Real-time responses

## Installation

1. Clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

## Usage

1. Navigate to any YouTube video
2. Click the floating "Ask" button in the bottom right corner
3. Type your question in the chat interface
4. Get AI-powered answers based on the video content

## Development

### Project Structure

```
asktube/
├── manifest.json      # Extension configuration
├── content.js         # Content script for YouTube page
├── background.js      # Background service worker
├── popup.html         # Extension popup
├── popup.js           # Popup script
└── styles.css         # Styles for sidebar and UI
```

### Backend API

The extension requires a backend API to process questions and generate answers. The API should implement the following endpoints:

- `/transcript` - Fetches video transcript
- `/ask` - Processes questions and returns answers

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes. 