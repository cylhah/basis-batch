import { ipcMain } from "electron";
import { batchBasis } from "./basis-handler";
import { MStore } from "./common/store";

export function initEventHandler() {
    ipcMain.on("runBasis", (event, arg) => {
        const { inputPath, outputPath } = arg;
        batchBasis(inputPath, outputPath);
    });
}

export function sendMessageToRender(event: string, argObj: any) {
    MStore.Instance.mainWin.webContents.send(event, argObj);
}

export function sendLog(log: any) {
    sendMessageToRender("myLog", log);
}
