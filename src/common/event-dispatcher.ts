import { ipcRenderer } from "electron";

export function sendEventSync(event: string, argObj: any) {
    console.log("sendEventSync", argObj);
    return ipcRenderer.sendSync(event, argObj);
}

export function sendEvent(event: string, argObj: any) {
    console.log("sendEvent", argObj);
    return ipcRenderer.send(event, argObj);
}

export function initRendererEventHandler() {
    console.log("initRendererEventHandler");
    ipcRenderer.on("myLog", (event, arg) => {
        console.log("from main message:", arg);
    });
}
