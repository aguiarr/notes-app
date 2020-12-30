const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 500,
    // icon: "src/img/icon.png"
    webPreferences: {
      nodeIntegration: true
    }
  });

//   win.setResizable(false);
//   win.removeMenu();
  win.loadFile('src/views/index.html');
}
app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})