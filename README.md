# Sonar Async API Demo

<div align="center">
  <img src="public/logo.svg" alt="Perplexity Logo" height="60px" />
</div>

This is a demo application showcasing the Sonar Async API, which allows for handling research-intensive queries asynchronously. The application demonstrates how to submit research requests and check their status using a modern, user-friendly interface.

## Features

- Submit research-intensive queries asynchronously
- Real-time status updates
- Beautiful UI with Chakra UI
- Educational gamification elements
- Request ID tracking with 7-day validity
- Secure API key management

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Sonar API key

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd sonar-async-demo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Usage

1. Open the application in your browser (default: http://localhost:5173)
2. Enter your Perplexity API key in the secure input field
3. Select one of the pre-defined research topics or enter your own query
4. Wait for the request ID to be generated
5. You'll be automatically redirected to the status page
6. The status page will poll for updates every 5 seconds
7. Once the research is complete, you'll see the results

## Technologies Used

- Vite
- React
- TypeScript
- Chakra UI
- React Router
- Axios

## License

MIT 