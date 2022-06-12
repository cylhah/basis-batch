import { app } from "electron";
import path from "path";

export class StaticPathHandler {
    public static handleStaticPath(staticPath: string) {
        if (app.isPackaged) {
            return path.resolve(__dirname, `../../../${staticPath}`);
        } else {
            return path.resolve(__dirname, `../../src/electron-main/static/${staticPath}`);
        }
    }
}
