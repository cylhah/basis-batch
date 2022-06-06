import { app, BrowserWindow, Menu } from "electron";
import path from "path";

function createWindow() {
    Menu.setApplicationMenu(null);

    const win = new BrowserWindow({
        webPreferences: {
            contextIsolation: false, // 是否开启隔离上下文
            nodeIntegration: true, // 渲染进程使用Node API
            preload: path.join(__dirname, "./preload.js"), // 需要引用js文件
        },
    });

    if (app.isPackaged) {
        win.loadFile(path.join(__dirname, "../index.html"));
    } else {
        let url = "http://localhost:3000"; // 本地启动的vue项目路径
        win.loadURL(url);
    }
}

app.whenReady().then(() => {
    createWindow(); // 创建窗口
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// 关闭窗口
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
