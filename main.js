(function() { // Initial run of the program will execute all of the bracketed commands.
    console.log("Entry point.");
})();

const { app, BrowserWindow } = require('electron') // Impliment the electron library
const path = require('path')

function createWindow() { // Create a window object for electron
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
}

app.whenReady() // Whenever the app is ready, open the Window
    .then(() => {
        createWindow()

        app.on('activate', function() {
            if (BrowserWindow.getAllWindows().length === 0) createWindow()
        })
    })

app.on('window-all-closed', function() { // if all of the windows are closed and the operating system is not MacOS, close all windows.
    if (process.platform !== 'darwin') {
        console.log("Closing program.");
        app.quit();
    }
})

console.log("Finished window creation.");

