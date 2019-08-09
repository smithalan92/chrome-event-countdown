# Chrome New Tab - Event Countdown

A simple chrome extension for add event countdowns which will appear in the chrome new tab screen.

| [![](./images/new_tab.png)](./images/new_tab.png) | [![](./images/add_event.png)](./images/add_event.png) |
|---|---|

# Installation
This isn't available on the Chrome store, so installation must be done manually.

You can either download a zip with the prebuild extension from the [releases page](https://github.com/smithalan92/chrome-event-countdown/releases)

Or else clone this repository and build it yourself ( steps towards the end of the readme ) and when it's build, follow the rest of the steps below.

1. Download or build the extension as mentioned above.
2. Move the exension directory in the zip, or your built one someplace you won't delete it. The extension directory will always need to be present on your computer for the extension to work.
3. Go to chrome://extensions in Google Chrome. Enable developer mode up the top right if it's not already enabled.
4. Click the "Load unpacked" button and select the extension directory you moved above.
5. Finto, when you open the new tab screen you should now see a blank slate with an option to add an event.

## Running/Building Locally.
You should have Node v8+ and NPM V6+

1. Install the project dependencies by running `npm i` in the project folder.
2. Start the local app server using `npm start`

To build, simply run `npm run build` in the project directory. An `extension` folder will be generated in the project root folder.

Note: When running locally, the browser localstorage API is used to store event data. When running as an extension in chrome, the chrome storage api is used.

This project uses a lot of great third party modules. It's worth taking a look at the [package.json](./package.json) file and checking them out!
