import { BrowserWindow } from "electron";

export class MStore {
    private static inst: MStore;
    public mainWin!: BrowserWindow;
    private constructor() {}

    public static get Instance() {
        if (!this.inst) {
            this.inst = new MStore();
        }
        return this.inst;
    }
}
