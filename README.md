#HelpMeOut Screen Recording Chrome Extension

## Introduction

This Chrome extension allows users to record their screen and upload the recorded video to a server. After recording, the user will be redirected to a webpage where they can view and download the recorded video.

## Table of Contents

1. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Development](#development)
    - [Build](#build)
2. [Usage](#usage)
3. [Configuration](#configuration)
4. [Contributing](#contributing)
5. [License](#license)

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.17.0 or higher)
- [npm](https://www.npmjs.com/) (v6.14.13 or higher)
- [Google Chrome Browser](https://www.google.com/chrome/)

### Installation

1. Clone the repository:

    ```bash
    git clone [https://github.com/AbubakarImam/chrome-extension.git]
    cd chrome-extension
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

### Development

To start the development server, run:

```bash
npm run dev
```

This will start a development server with hot-reloading enabled.

### Build

To build the extension, run:

```bash
npm run build
```

This will generate the extension files in the `dist` folder.

## Usage

1. Open Google Chrome.
2. Go to `chrome://extensions/`.
3. Enable `Developer mode` in the top right corner.
4. Click on `Load unpacked` and select the `dist` folder generated after building the extension.
5. The extension icon will now appear in your Chrome toolbar.

Click on the extension icon to start recording your screen. Once you stop recording, the video will be uploaded to the configured server, and you will be redirected to a webpage where you can view and download the video.

## Configuration

You can configure the extension by modifying the `config.js` file located in the `src` folder. This file contains the following options:

- `serverUrl`: The URL where the recorded videos will be uploaded.
- `redirectUrl`: The URL where users will be redirected after recording.

```javascript
// src/config.js

export const config = {
  serverUrl: 'https://example.com/upload',
  redirectUrl: 'https://example.com/view'
};
```

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and test thoroughly.
4. Create a pull request with a clear description of your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
