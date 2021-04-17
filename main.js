const { app, Menu, MenuItem, ipcMain, BrowserWindow, dialog } = require('electron');
const fs = require('fs');

app.on('ready', () => {
	mainWindow = new BrowserWindow({
		height: 1920,
		width: 1080,
		frame: false,
		fullscreen: true,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
		},
		icon: require('path').join(__dirname, '')
	});

	let url = require('url').format({
		protocol: 'file',
		slashes: true,
		pathname: require('path').join(__dirname, 'index.html')
	});

	mainWindow.setTitle("3d test with Electron, React, and Babylon.js");
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
