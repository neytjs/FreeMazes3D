const { app, Menu, MenuItem, ipcMain, BrowserWindow, dialog } = require('electron');
const fs = require('fs');
require('@electron/remote/main').initialize();

app.on('ready', () => {
	mainWindow = new BrowserWindow({
		height: 1920,
		width: 1080,
		frame: false,
		fullscreen: true,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true
		},
		icon: require('path').join(__dirname, '')
	});

	let url = require('url').format({
		protocol: 'file',
		slashes: true,
		pathname: require('path').join(__dirname, 'index.html')
	});

	mainWindow.setTitle("FreeMazes3D");
	mainWindow.loadURL(url);
	mainWindow.maximize();
//	mainWindow.webContents.openDevTools();
});

let darwin = process.platform === 'darwin';

app.on('window-all-closed', () => {
  if (!darwin) {
    app.quit();
  }
});
