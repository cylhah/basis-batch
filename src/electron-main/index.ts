import { app, BrowserWindow, Menu } from "electron";
import path from "path";
import { MStore } from "./common/store";
import { initEventHandler } from "./event-handler";

function createWindow() {
    Menu.setApplicationMenu(null);

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            devTools: true,
            contextIsolation: false, // 是否开启隔离上下文
            nodeIntegration: true, // 渲染进程使用Node API
            preload: path.join(__dirname, "../electron-preload/preload.js"), // 需要引用js文件
        },
    });

    MStore.Instance.mainWin = win;

    if (app.isPackaged) {
        win.loadFile(path.join(__dirname, "../index.html"));
        win.webContents.openDevTools();
    } else {
        let url = "http://localhost:3000"; // 本地启动的vue项目路径
        win.loadURL(url);
        win.webContents.openDevTools();
    }
}

initEventHandler();

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.whenReady().then(() => {
    createWindow(); // 创建窗口
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});
